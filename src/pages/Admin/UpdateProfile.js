import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const UpdateProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    gender: "",
    address: "",
    image: "",
  });

  const getProfile = async (id) => {
    try {
      const response = await API.get("/profile/" + id);
      setProfile(response.data.data.image);
      setForm({
        ...form,
        gender: response.data.data.gender,
        address: response.data.data.address,
      });
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile(id);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    console.log(handleChange);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("gender", form.gender);
      formData.set("address", form.address);

      const response = await API.patch(
        "/profile/" + profile.id,
        formData,
        config
      );
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
    console.log(handleSubmit);
  };

  return (
    <div>
      <AdminNavbar />
      <Container>
        <div className="card mx-auto" style={{ width: "30rem" }}>
          <div className="card-body">
            <h4 className="fw-bold text-primary text-center">Update Profile</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={state.user.fullName}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={state.user.email}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="gender"
                  value={form.gender}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  onChange={handleChange}
                  value={form.address}
                />
              </div>
              <div className="mb-3">
                <div className="card bg-primary mt-3">
                  <label className="text-center" for="file-input">
                    <input
                      style={{ display: "none" }}
                      id="file-input"
                      type="file"
                      name="image"
                      onChange={handleChange}
                    />
                    <p className="text-white mt-2">upload photo</p>
                  </label>
                </div>
              </div>
              <div className="text-center mt-3 mb-3">
                <img
                  src={preview}
                  alt="img-profile"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProfile;
