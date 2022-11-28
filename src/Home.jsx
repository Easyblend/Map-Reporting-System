import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

const Home = () => {
  //Checking the current user logged in my databse
  const func = async () => {
    await onAuthStateChanged(authentication, (currentUser) => {
      setUserEmail(currentUser?.email);
      setUserName(currentUser?.displayName);
      console.log(authentication.currentUser);
    });
  };

  useEffect(() => {
    func();
  }, []);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(authentication);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  //   const { userEmail, setUserEmail } = useContext(userState);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <div className="text-center">
      <h2>Current user Logged in: {userName ? userName : "guest"}</h2>
      <Button onClick={logOut}>Log me Out</Button>
    </div>
  );
};

export default Home;
