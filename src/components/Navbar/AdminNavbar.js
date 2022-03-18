import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LogoImg2, UserImg } from "../../assets/image";
import { API } from "../../config/api";
import DropdownAdmin from "../Dropdown/DropdownAdmin";

const myStyle = {
  position: "absolute",
  top: "85%",
  right: "4%",
};

const AdminNavbar = () => {
  const [profile, setProfile] = useState({});
  const [isDropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!isDropdown);
  };

  const getProfile = async () => {
    try {
      const responseProfile = await API.get("/profiles");
      setProfile(responseProfile.data.data);
      console.log(responseProfile);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="shadow p-3 mb-5 bg-white rounded"
      >
        <Container>
          <Link to="/mainadmin">
            <img src={LogoImg2} alt="logo" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ">
              <div onClick={handleDropdown}>
                <img
                  src={profile?.image}
                  alt="user"
                  className="rounded-circle"
                  style={{ width: "65px", height: "65px" }}
                />
              </div>
              <div style={myStyle}>{isDropdown && <DropdownAdmin />}</div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
