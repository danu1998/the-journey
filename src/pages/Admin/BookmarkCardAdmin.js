import React from "react";
import parser from "html-react-parser";
import { IoBookmarkOutline } from "react-icons/io5";
import dateFormat, { masks } from "dateformat";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const BookmarkCardAdmin = ({ data }) => {
  let navigate = useNavigate();
  const handleDeleteBookmark = async (idJourney) => {
    try {
      const response = await API.delete(`/bookmark/${idJourney}`);
      console.log(response);
      navigate("/mainadmin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {data.map((item, index) => {
        const date = new Date(item.journey.createdAt);
        return (
          <>
            <div className="col-md-3 col-sm-12">
              <Card id="styleCard" className="grow">
                <label className="block-check">
                  <Card.Img
                    variant="top"
                    src={item.journey.image}
                    style={{
                      objectFit: "cover",
                      height: "180px",
                      borderRadius: "8px",
                    }}
                  />
                </label>
                <Card.Body>
                  <div
                    className="position-absolute top-0 end-0"
                    style={{ margin: 10 }}
                  >
                    <div
                      className=""
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: "blue",
                        textAlign: "center",
                        justifyContent: "center",
                        borderRadius: 100,
                      }}
                      onClick={() => handleDeleteBookmark(item.journey.id)}
                    >
                      <IoBookmarkOutline
                        className="text-white"
                        style={{ fontSize: 18 }}
                      />
                    </div>
                  </div>

                  <Card.Title>
                    <h5 className="">{item.journey.title}</h5>
                  </Card.Title>
                  <p className="text-muted" style={{ fonstSize: "14px" }}>
                    {dateFormat(date, "dd mmmm yyyy")} - {item.user.fullName}
                  </p>
                  <p className="card-text">
                    {parser(item.journey.description)}
                  </p>
                </Card.Body>
              </Card>
            </div>
          </>
        );
      })}
    </>
  );
};

export default BookmarkCardAdmin;
