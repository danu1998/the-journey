import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserImg } from "../../assets/image";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import ContentCard from "../MainApp/ContentCard";
import { IoBookmarkOutline } from "react-icons/io5";
import parser from "html-react-parser";
import dateFormat, { masks } from "dateformat";

const ProfileAdmin = () => {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [journeys, setJourney] = useState([]);
  const [isBookmark, setBookmark] = useState(false);
  const handleBookmark = () => {
    setBookmark(!isBookmark);
  };

  const getProfile = async () => {
    try {
      const response = await API.get("/profiles");
      const getJourney = await API.get("/journeyuser");
      setProfile(response.data.data);
      setJourney(getJourney.data.data.journeys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <AdminNavbar />
      <Container>
        <h1 className="fs-1 fw-bold">Profile</h1>
        <div className="text-center" style={{ marginTop: "120px" }}>
          <img
            src={profile?.image}
            alt="user"
            className="rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
          <h4 className="mt-3">{state.user.fullName}</h4>
          <p>{state.user.email}</p>
          <p></p>
          <div className="btn btn-primary px-5">Edit Profile</div>
        </div>
        <div className="row mt-5">
          {journeys.map((listJourney) => {
            // const date = new Date(listJourney.createdAt);
            const date = new Date(listJourney.createdAt);

            return (
              <>
                <div className="col-md-4 col-sm-12 pt-5 pb-5">
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
      </Container>
    </div>
  );
};

export default ProfileAdmin;
