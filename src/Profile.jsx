import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { onAuthStateChanged, updateEmail, updateProfile } from "firebase/auth";
import { authentication } from "./FirebaseConfig";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

const Profile = () => {
  const func = async () => {
    onAuthStateChanged(authentication, (currentUser) => {
      setUserEmail(currentUser?.email);
      setUserName(currentUser?.displayName);
    });
  };

  const [formState, setFormState] = useState(true);

  useEffect(() => {
    func();
  }, []);

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const editProfile = (e) => {
    e.preventDefault();
    setFormState(!formState);

    if (authentication.currentUser.displayName !== userName) {
      updateProfile(authentication.currentUser, { displayName: userName })
        .then(() => {
          toast.success("Name Updated Successfully");
          setUserName(authentication.currentUser.displayName);
        })
        .catch((error) => {
          toast.error(error.code);
          setUserName(authentication.currentUser.displayName);
        });
    }

    if (authentication.currentUser.email !== userEmail) {
      updateEmail(authentication.currentUser, userEmail)
        .then(() => {
          toast.success("Email Updated Successfully");
          setUserName(authentication.currentUser.email);
        })
        .catch((error) => {
          toast.error(
            error.code === "auth/invalid-email"
              ? "Invalid Email"
              : error.code === "auth/email-already-in-use"
              ? "This Email has already been Taken"
              : error.code === "auth/requires-recent-login"
              ? "User needs to re-login to do this"
              : "Somethings's not right"
          );
          setUserName(authentication.currentUser.email);
        });
    }
  };

  return (
    <div className="container-fluid my-auto py-auto d-flex align-items-center justify-content-center my-auto mx-auto">
      <Card
        style={{ width: "25rem" }}
        className="px-5 rounded-4 bg-dark text-light"
      >
        <Card.Img
          variant="top"
          className="rounded-circle "
          src="https://i.pinimg.com/474x/4a/90/19/4a9019fbeb9799a1a0c1c3c103353ded.jpg"
        />

        <hr />
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Profile Information
          </Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={formState}
              />
              <Form.Text className="text-muted">
                This is the display name, All users can see this
              </Form.Text>
            </Form.Group>
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                disabled={formState}
              />
              <Form.Text className="text-muted">
                This is your email, only you can see it
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="d-flex w-100  px-auto justify-content-center"
              onClick={editProfile}
            >
              {formState ? "Edit Details" : "Save changes"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
