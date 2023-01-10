import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useMapEvent } from "react-leaflet";
import { useContext } from "react";
import { userState } from "./UserStateContext";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

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
          <h6 className="offcanvas-title" id="offcanvasRightLabel">
            {userName}
          </h6>
          <button
            type="button"
            className="btn-close ms-5"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="text-center">
          <div className="my-3 py-2">
            <i class="fa-solid fa-house"></i>{" "}
            <Link
              to="/home"
              className="text-center text-decoration-none text-secondary mx-4"
            >
              Home
            </Link>
          </div>
          <div className="my-3 py-2">
            <i class="fa-solid fa-circle-info"></i>
            <Link
              to="/home"
              className="text-center text-decoration-none text-secondary mx-4"
            >
              About
            </Link>
          </div>
          <div className="my-3 py-2">
            <i class="fa-solid fa-user"></i>
            <Link
              to="/home"
              className="text-center text-decoration-none text-secondary mx-4"
            >
              Profile
            </Link>
          </div>

          <div className="my-3 py-2">
            <Button className="text-center bg-danger border border-0 shadow-sm">
              Log Out <i class="fa-solid fa-right-from-bracket"></i>
            </Button>
          </div>
        </div>
        <div className="text-center mt-4">
          {" "}
          <p className="fs-5">Actions</p>
          <div className="my-1 ">
            <i class="fa-solid fa-person-circle-exclamation"></i>
            <Link
              to="/home"
              className="text-center text-decoration-none text-secondary mx-4"
            >
              Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
