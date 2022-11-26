import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { authentication } from "./FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { userState } from "./UserStateContext";

function SignUp() {
  const { setUserEmail } = useContext(userState);

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
        setUserEmail(user.email);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <div className="row mx-auto bg-secondary vh-100 text-light">
      <div className="col-sm-6 my-auto col-12 mx-auto">
        <h2 className="text-center">Sign-Up</h2>
        <Form
          className="w-75 mx-auto mt-5 d-flex flex-column gap-5"
          onSubmit={SubmitForm}
        >
          <Form.Group>
            <Form.Control type="text" placeholder="Full name.." ref={name} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="email" placeholder="Email.." ref={email} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password.."
              ref={password}
            />
          </Form.Group>

          <Button type="submit">Sign Me Up</Button>
        </Form>
      </div>

      <img
        src="https://images.unsplash.com/photo-1604077198996-4eb67c32f6a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="Banner Image"
        className="col-6 banner d-none d-sm-block px-0"
      />
    </div>
  );
}

export default SignUp;