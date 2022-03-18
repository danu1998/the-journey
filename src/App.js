import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddJourney from "./pages/Admin/AddJourney";
import BookmarkAdmin from "./pages/Admin/BookmarkAdmin";
import DetailAdmin from "./pages/Admin/DetailAdmin";
import MainAdmin from "./pages/Admin/MainAdmin";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import MainApp from "./pages/MainApp";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import MyProfile from "./pages/Admin/MyProfile";
import UpdateProfile from "./pages/Admin/UpdateProfile";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (state.isLogin == false) {
      navigate("/");
    } else {
      navigate("/mainadmin");
    }
  }, [state]);

  const chechkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chechkUser();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<MainApp />} />
      <Route exact path="/mainadmin" element={<MainAdmin />} />
      <Route exact path="/bookmark" element={<BookmarkAdmin />} />
      <Route exact path="/detail/:id" element={<DetailAdmin />} />
      <Route exact path="/profile" element={<MyProfile />} />
      <Route exact path="/updateprofile/:id" element={<UpdateProfile />} />
      <Route exact path="/add" element={<AddJourney />} />
    </Routes>
  );
}

export default App;
