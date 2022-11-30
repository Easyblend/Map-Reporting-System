import React, { useEffect, useState } from "react";

import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

const Home = () => {
  //Checking the current user logged in my databse
  const func = async () => {
    await onAuthStateChanged(authentication, (currentUser) => {
      setUserEmail(currentUser?.email);
      setUserName(currentUser?.displayName);
      console.log(authentication.currentUser);
    });
  };

  useEffect(() => {
    func();
  }, []);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(authentication);

      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  //   const { userEmail, setUserEmail } = useContext(userState);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        className="mx-auto w-100 text-center"
      >
        <Container className="container-fluid">
          <Navbar.Brand href="">{userName ? userName : "GUEST"}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* <Nav className="ms-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav> */}
            <Nav className="ms-auto">
              <Nav.Link>
                <Button onClick={logOut}>Log me Out</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Home;
