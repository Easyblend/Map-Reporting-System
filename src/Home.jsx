import React, { useState } from "react";
// import { useContext } from "react";  ****This Context wasnt Needed onauthstateChange checks and updates the user logged in
// import { userState } from "./UserStateContext";
import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  //Checking the current user logged in my databse

  onAuthStateChanged(authentication, (currentUser) => {
    setUserEmail(currentUser.email);
  });

  //   const { userEmail, setUserEmail } = useContext(userState);
  const [userEmail, setUserEmail] = useState("");
  return <h2>Current user Logged in: {userEmail} </h2>;
};

export default Home;
