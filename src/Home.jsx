import React, { useState } from "react";
// import { useContext } from "react";  ****This Context wasnt Needed onauthstateChange checks and updates the user logged in
// import { userState } from "./UserStateContext";
import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

const Home = () => {
  //Checking the current user logged in my databse
  const navigate = useNavigate();
  onAuthStateChanged(authentication, (currentUser) => {
    setUserEmail(currentUser?.email);
  });

  const logOut = async () => {
    await signOut(authentication);
    navigate("/");
  };

  //   const { userEmail, setUserEmail } = useContext(userState);
  const [userEmail, setUserEmail] = useState("");
  return (
    <div className="text-center">
      <h2>Current user Logged in: {userEmail ? userEmail : "guest"}</h2>
      <Button onClick={logOut}>Log me Out</Button>
    </div>
  );
};

export default Home;
