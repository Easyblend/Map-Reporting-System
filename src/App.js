import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import Home from "./Home";

import { userState } from "./UserStateContext";
import { useState } from "react";
import Login from "./Login";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <userState.Provider value={{ userName, setUserName }}>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </userState.Provider>
  );
}

export default App;
