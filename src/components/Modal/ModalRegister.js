import React, { useContext, useEffect, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Ornament1, Ornament2 } from "../../assets/image";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const ModalRegister = ({ showRegister, handleCloseRegister, switchLogin }) => {
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const { fullName, email, password, phone } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/register", body, config);
      if (response?.status == 200) {
        dispatch({
          type: "USER_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={showRegister} onHide={handleCloseRegister}>
      <div className="position-absolute top-0 start-0">
        <img src={Ornament1} alt="ornament" />
      </div>
      <div className="position-absolute top-0 end-0">
        <img src={Ornament2} alt="ornament" />
      </div>
      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title className="fs-4 fw-bold mt-5"> Register Form </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fs-5 fw-bold">Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              className="p-2"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fs-5 fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              className="p-2"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fs-5 fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              className="p-2"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fs-5 fw-bold">Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              className="p-2 "
              name="phone"
              value={phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" type="submit">
                Register
              </button>
            </div>
          </Form.Group>
        </Form>
        <p className="text-center">
          Already have an account ? Klik
          <span onClick={switchLogin} className="fw-bold">
            Here
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalRegister;
