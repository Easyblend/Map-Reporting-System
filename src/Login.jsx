import React from "react";
import { Form } from "react-bootstrap";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authentication } from "./FirebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);

  const navigate = useNavigate();
  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        authentication,
        email.current.value,
        password.current.value
      );
      navigate("/home");
      toast.success("Login Successful");
    } catch (error) {
      const errorCode = error.code;
      toast.error(
        errorCode === "auth/invalid-email"
          ? "Invalid Email"
          : errorCode === "auth/user-not-found"
          ? "No Account with this Email"
          : errorCode === "auth/wrong-password"
          ? "Wrong Password"
          : "Somethings's not right"
      );
    }
  };

  const passwordReset = async () => {
    try {
      await sendPasswordResetEmail(authentication, email.current.value);
      toast.success("Password Reset Successfull. Please check your email");
    } catch (error) {
      toast.error(
        error.code === "auth/missing-email"
          ? "Please Enter your Email to reset your password"
          : error.code === "auth/user-not-found"
          ? "There is no account with this email"
          : "Something went wrong"
      );
    }
  };

  return (
    <div className="row mx-auto bg-light vh-100 text-dark">
      <div className="col-sm-6 my-auto col-12 mx-auto">
        <h2 className="text-center">Log In</h2>
        <Form
          className="w-75 mx-auto mt-5 d-flex flex-column gap-5"
          onSubmit={SubmitForm}
        >
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Email.."
              ref={email}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password.."
              ref={password}
              required
            />
          </Form.Group>
          <Button type="submit">Log In</Button>
        </Form>
        <div className="text-center mt-3">
          New Here?
          <Link
            to="/"
            className="text-decoration-none fw-bold mx-1 text-danger ms-2"
          >
            Create Account
          </Link>
        </div>
        <div className="text-center mt-4">
          Forgot Password?
          <span
            className="fw-bolder ms-2"
            role="button"
            onClick={passwordReset}
          >
            Click Here
          </span>
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1604077198996-4eb67c32f6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="Banner Image"
        className="col-6 banner d-none d-sm-block px-0 vh-100"
      />
    </div>
  );
};

export default Login;
