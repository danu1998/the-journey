import React, { useContext, useState } from "react";
import { Alert, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Ornament1, Ornament2 } from "../../assets/image";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const ModalLogin = ({ showLogin, handleCloseLogin, switchRegister }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        navigate("/mainadmin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showLogin} onHide={handleCloseLogin}>
      <div className="position-absolute top-0 start-0">
        <img src={Ornament1} alt="ornament" />
      </div>
      <div className="position-absolute top-0 end-0">
        <img src={Ornament2} alt="ornament" />
      </div>

      <Modal.Header className="d-flex justify-content-center align-items-center">
        <Modal.Title className="fs-4 fw-bold mt-5"> Login Form </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mt-5">
        <Form onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-4">
            <Form.Label className="fs-5 fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              className="p-3"
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
              className="p-3"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" type="submit">
                Login
              </button>
            </div>
          </Form.Group>
        </Form>
        <p className="text-center">
          Already have an account ? Klik
          <span onClick={switchRegister} className="fw-bold">
            Here
          </span>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
