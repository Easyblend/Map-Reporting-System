import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import Home from "./Home";
import { userState } from "./UserStateContext";
import { useState } from "react";
import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [userName, setUserName] = useState("");

  return (
    <userState.Provider value={{ userName, setUserName }}>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </userState.Provider>
  );
}

export default App;
