import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LogoImg } from "../../assets/image";
import ModalLogin from "../Modal/ModalLogin";
import ModalRegister from "../Modal/ModalRegister";

const MainNavbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const switchLogin = () => {
    handleShowLogin();
    handleCloseRegister();
  };

  const switchRegister = () => {
    handleShowRegister();
    handleCloseLogin();
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Link to="/">
            <img src={LogoImg} alt="logo-1"></img>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="d-flex gap-4 ms-auto ">
              <button
                onClick={() => {
                  handleShowLogin();
                }}
                className="btn btn-outline-primary px-5"
              >
                Login
              </button>
              <button
                onClick={() => {
                  handleShowRegister();
                }}
                className="btn btn-primary px-5"
              >
                Register
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalLogin
        showLogin={showLogin}
        handleCloseLogin={handleCloseLogin}
        switchRegister={switchRegister}
      />
      <ModalRegister
        showRegister={showRegister}
        handleCloseRegister={handleCloseRegister}
        switchLogin={switchLogin}
      />
    </div>
  );
};

export default MainNavbar;
