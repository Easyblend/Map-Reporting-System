import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useMapEvent } from "react-leaflet";
import { useContext } from "react";
import { userState } from "./UserStateContext";
import { toast } from "react-toastify";

const NavbarComponent = ({ getUser }) => {
  //Checking the current user logged in my databse
  const func = () => {
    onAuthStateChanged(authentication, (currentUser) => {
      setUserEmail(currentUser?.email);
      setUserName(currentUser?.displayName);
    });
  };

  useEffect(() => {
    func();
  }, []);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(authentication);

      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div className="ms-auto">
      <button
        className="btn btn-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            {userName}
          </h5>
          <button
            type="button"
            className="btn-close ms-5"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body"></div>
      </div>
    </div>
  );
};

export default NavbarComponent;
