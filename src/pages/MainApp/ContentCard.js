import React, { useContext, useState } from "react";
import { IoBookmarkOutline } from "react-icons//io5";
import parser from "html-react-parser";
import dateFormat, { masks } from "dateformat";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import ModalLogin from "../../components/Modal/ModalLogin";
import ModalRegister from "../../components/Modal/ModalRegister";

const ContentCard = (props) => {
  const { data } = props;
  const [state] = useContext(UserContext);
  let navigate = useNavigate();
  const handleBookmark = async (idJourney) => {
    console.log(idJourney);
    try {
      const response = await API.post(`/bookmark/${idJourney}`);
      navigate("/bookmark");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteBookmark = async (idJourney) => {
    try {
      const response = await API.delete(`/bookmark/${idJourney}`);
      navigate("/mainadmin");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const [showRegister, setShowRegister] = useState(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const switchLogin = () => {
    handleShowLogin();
    handleCloseRegister();
  };

  const switchRegister = () => {
    handleShowRegister();
    handleCloseLogin();
  };

  return (
    <>
      {data.map((item, index) => {
        const date = new Date(item.createdAt);
        return (
          <div className="col-md-3 col-sm-12">
            <div className="card" key={item.id}>
              <div className="position-relative">
                <div onClick={handleShowLogin}>
                  <img src={item.image} className="card-img-top" alt="img" />
                </div>
                {!state.isLogin === true && (
                  <>
                    {item.bookmark === true ? (
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
                          onClick={() => handleDeleteBookmark(item.id)}
                        >
                          <IoBookmarkOutline
                            className="text-white"
                            style={{ fontSize: 18 }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="position-absolute top-0 end-0"
                        style={{ margin: 10 }}
                      >
                        <div
                          className=""
                          style={{
                            width: 32,
                            height: 32,
                            backgroundColor: "white",
                            textAlign: "center",
                            justifyContent: "center",
                            borderRadius: 100,
                          }}
                          onClick={() => handleBookmark(item.id)}
                        >
                          <IoBookmarkOutline
                            className="text-primary"
                            style={{ fontSize: 18 }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">
                  {dateFormat(date, "dd mmmm yyyy")} - {item.user.fullName}
                </p>
                <p className="card-text">{parser(item.description)}</p>
              </div>
            </div>
          </div>
        );
      })}

      <ModalLogin
        showLogin={showLogin}
        handleCloseLogin={handleCloseLogin}
        switchRegister={switchRegister}
      />
      <ModalRegister
        showRegister={showRegister}
        handleCloseRegister={handleCloseRegister}
        switchLogin={switchLogin}
      />
    </>
  );
};

export default ContentCard;
