import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import Home from "./Home";

import { userState } from "./UserStateContext";
import { useState } from "react";

function App() {
  const [userEmail, setUserEmail] = useState("");

  return (
    <userState.Provider value={{ userEmail, setUserEmail }}>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </userState.Provider>
  );
}

export default App;
