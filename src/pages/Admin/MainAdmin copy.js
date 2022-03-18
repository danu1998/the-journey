import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import ContentCardAdmin from "./ContentCardAdmin";

const MainAdmin = () => {
  const [state] = useContext(UserContext);
  const [journeys, setJourney] = useState([]);
  const [isBookmark, setBookmark] = useState([]);
  const [query, setQuery] = useState("");

  const getBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      setBookmark(response.data.data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookmark();
  }, []);
  const getJourneys = async () => {
    try {
      const response = await API.get("/journeys");
      setJourney(response.data.data.journeys);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJourneys();
  }, []);
  console.log(journeys);
  console.log(isBookmark);

  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <AdminNavbar />

      <Container>
        <h1 className="fs-1 fw-bold">Journey</h1>
        <div className="row g-0 mt-5">
          <div className="col-md-11">
            <input
              type="text"
              placeholder="Search Your Journey"
              className="form-control border-0 p-3"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <div className="btn p-3 btn-primary">Search</div>
          </div>
        </div>
        <div className="row">
          {journeys
            .filter((data) => data.title.toLowerCase().includes(query))
            .map((item, index) => (
              <ContentCardAdmin item={item} key={index} />
            ))}
        </div>
      </Container>
    </div>
  );
};

export default MainAdmin;
