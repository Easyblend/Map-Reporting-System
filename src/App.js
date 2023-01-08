import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import SignUp from "./SignUp";
import Home from "./Home";
import { userState } from "./UserStateContext";
import { useEffect, useState } from "react";
import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./Profile";
import NavbarComponent from "./NavbarComponent";

function App() {
  const [userName, setUserName] = useState("");

  const [checkUrl, setCheckUrl] = useState(false);

  const [center, setcenter] = useState();
  const url = useLocation();

  useEffect(() => {
    if (url.pathname === "/home" || url.pathname === "/profile")
      setCheckUrl(true);
    else setCheckUrl(false);
  });

  return (
    <userState.Provider value={{ userName, setUserName, center, setcenter }}>
      {/* {checkUrl && <NavbarComponent />} */}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer
        position="top-center"
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
