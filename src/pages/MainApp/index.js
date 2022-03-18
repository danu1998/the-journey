import React, { useContext, useEffect, useState } from "react";
import MainNavbar from "../../components/Navbar/MainNavbar";
import { JumbotronImg } from "../../assets/image";
import { Button, Card, Container, Jumbotron } from "react-bootstrap";
import ContentCard from "./ContentCard";
import { DummyData } from "./DummyData";
import Fuse from "fuse.js";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";

const MainApp = () => {
  const [state] = useContext(UserContext);
  const [journeys, setJourney] = useState([]);
  const [isBookmark, setBookmark] = useState([]);
  const [newJourney, setNewJourney] = useState(false);
  const [newBookmark, setNewBookmark] = useState(false);
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
  }, [newBookmark]);
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
  }, [newJourney]);

  let bookmarkId = isBookmark.map((group) => group.idJourney);
  let bookmarkJourney = journeys.map((group) => ({
    ...group,
    bookmark: bookmarkId.includes(group.id),
  }));

  console.log(bookmarkJourney, "tes");

  const fuse =
    bookmarkJourney &&
    new Fuse(bookmarkJourney, {
      keys: ["title"],
    });

  const result = fuse.search(query);
  const finalResult = query ? result.map((item) => item.item) : bookmarkJourney;
  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <div
        className="p-5 bg-dark text-white"
        style={{
          backgroundImage: `url(${JumbotronImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <MainNavbar />
        <Container>
          <h1 className="mt-5" style={{ fontSize: "48px" }}>
            The Journey
            <br />
            you ever dreamed of.
          </h1>
          <p className="mt-5" style={{ fontSize: "21px" }}>
            We made a tool so you can easily keep & share your travel memories.
            <br />
            But there is a lot more
          </p>
        </Container>
      </div>
      <Container>
        <h1 className="mt-5 fw-bold">Journey</h1>
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

        <div className="row mt-5 pb-5">
          {!state.isLogin === true && <ContentCard data={finalResult} />}
        </div>
      </Container>
    </div>
  );
};

export default MainApp;
