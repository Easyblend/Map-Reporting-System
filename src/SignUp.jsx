import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { authentication } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const SubmitForm = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      authentication,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        // Sign
        const user = userCredential.user;
        updateProfile(user, { displayName: name.current.value });
        navigate("/home");
        toast.success(`Welcome ${name.current.value}`);
      })
      .catch((error) => {
        const errorCode = error.code;

        toast.error(
          errorCode === "auth/invalid-email"
            ? "Invalid Email"
            : errorCode === "auth/email-already-in-use"
            ? "Email Already Exist"
            : "Somethings's not right"
        );
      });
  };

  return (
    <div className="row mx-auto bg-light vh-100 text-dark">
      <div className="col-sm-5 my-auto col-12 mx-auto">
        <Form
          className="w-75 mx-auto mt-5 d-flex flex-column gap-4"
          onSubmit={SubmitForm}
        >
          <div>
            <h2 className="text-center py-4">Welcome Back Citizen!</h2>
            <h4 className="text-center text-decoration-underline">
              Create Account
            </h4>
          </div>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Full name.."
              ref={name}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email.."
              ref={email}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password.."
              ref={password}
              required
              className="py-3"
            />
            <p className="mt-3">
              An Emergency Report?{" "}
              <Link to="/home" className="fw-bold">
                Click here
              </Link>
            </p>
          </Form.Group>
          <Button type="submit" className="mt-3 py-3 rounded-sm">
            Sign Up
          </Button>
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
        </Form>

        <div className="text-center">
          Already Have an account?
          <Link
            to="/login"
            className="text-decoration-none text-danger ms-2 fw-bold"
          >
            Log In
          </Link>
        </div>
      </div>
      <div
        className="col-6 shadow-sm d-none d-sm-flex px-0 vh-100 justify-content-center align-items-center py-5 text-light"
        style={{
          backgroundImage: `url(
            "https://images.unsplash.com/photo-1583355518370-47ec8dac3fc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
          backgroundBlendMode: "saturation",
        }}
      >
        <div className="px-5">
          <h1 className="text-light text-center">
            Reducing Crimes and Saving Lives
          </h1>
          <p className="text-center px-5 text-secondary ">
            Report any <span className="text-danger">Crime</span> you see to the
            police. Do not hesitate to do so. A crime reported is a life saved
          </p>{" "}
          <Button
            className="text-center mx-auto d-flex bg-danger border-0 mt-5"
            onClick={() => navigate("/home")}
          >
            Report an Emergency
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
