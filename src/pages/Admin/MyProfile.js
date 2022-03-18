import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { UserContext } from "../../context/userContext";
import parser from "html-react-parser";
import dateFormat, { masks } from "dateformat";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [journeys, setJourney] = useState([]);
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    try {
      const response = await API.get("/profiles");
      const getJourney = await API.get("/journeyuser");
      setProfile(response.data.data);
      setJourney(getJourney.data.data.journeys);
      console.log(state);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    navigate("/updateprofile/" + profile.id);
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <AdminNavbar />
      <Container>
        <div className="row">
          <div className="col-md-4">
            <img
              className="img-thumbnail"
              alt="profile-img"
              src={profile?.image}
              style={{ width: "150px", height: "150px" }}
            />
            <h3 className="fw-bold mt-5 text-primary">My Profile</h3>
            <div className="row mt-5">
              <div className="col-md-4">
                <p className="fw-bold">Full Name</p>
                <p className="fw-bold">Email</p>
                <p className="fw-bold">Gender</p>
                <p className="fw-bold">Address</p>
              </div>
              <div className="col-md-8">
                <p>: {state.user.fullName}</p>
                <p>: {state.user.email}</p>
                <p>: {profile?.gender}</p>
                <p>: {profile?.address}</p>
              </div>
            </div>
            <div className="d-grid mt-3">
              <span
                className="btn btn-primary"
                onClick={() => handleUpdate(state.user.id)}
              >
                Edit My Profile
              </span>
            </div>
          </div>
          <div className="col-md-8">
            <h3 className="fw-bold text-primary">My Journey</h3>
            <div className="row mt-3">
              {journeys.map((listJourney) => {
                // const date = new Date(listJourney.createdAt);
                const date = new Date(listJourney.createdAt);

                return (
                  <>
                    <div className="col-md-5 col-sm-12 pt-5 pb-5">
                      <div>
                        <div className="card" key={listJourney.id}>
                          <div className="position-relative">
                            <img
                              src={listJourney.image}
                              className="card-img-top"
                              alt="img"
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{listJourney.title}</h5>
                            <p className="card-text text-muted">
                              {dateFormat(date, "dd mmmm yyyy")}-{" "}
                              {state.user.fullName}
                            </p>
                            <p className="card-text">
                              {parser(`${listJourney.description}`)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
