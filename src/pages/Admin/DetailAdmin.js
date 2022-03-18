import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { API } from "../../config/api";
import parser from "html-react-parser";
import dateFormat, { masks } from "dateformat";

const DetailAdmin = () => {
  let { id } = useParams();
  const [journey, setJourney] = useState({});
  const [user, setUser] = useState([]);
  const getJourney = async () => {
    try {
      const responseJourney = await API.get(`/journey/${id}`);
      setJourney(responseJourney.data.data);
      setUser(responseJourney.data.data.user);
      console.log(responseJourney);
    } catch (error) {
      console.log(error);
    }
  };
  var dates = new Date(journey?.createdAt).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  console.log(dates);

  useEffect(() => {
    getJourney();
  }, []);
  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <AdminNavbar />
      <Container>
        <div>
          <div className="row justify-content-between align-items-center">
            <div className="col-md-10" key={id}>
              <h2>{journey.title}</h2>
            </div>
            <div className="col-md-2">
              <h5>{journey?.user?.fullName}</h5>
            </div>
          </div>
          <h5 className="mt-3 text-primary">{dates}</h5>
          <div class="card pb-5 bg-transparent border-0 mt-5">
            <img src={journey.image} class="card-img-top" alt="..." />
            <div class="card-body mt-5">
              <h3 class="card-title">{journey.title}</h3>
              <p class="card-text mt-5">{parser(`${journey.description}`)}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailAdmin;
