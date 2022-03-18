import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdminNavbar from "../../components/Navbar/AdminNavbar";
import { API } from "../../config/api";
import BookmarkCardAdmin from "./BookmarkCardAdmin";
const BookmarkAdmin = () => {
  const [bookMarks, setBookmarks] = useState([]);
  const [isBookmark, setBookmark] = useState(false);
  const getBookmark = async () => {
    try {
      const response = await API.get("/bookmark");
      setBookmarks(response.data.data.bookmarks);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBookmark();
  }, [isBookmark]);
  return (
    <div>
      <div style={{ backgroundColor: "#f1f1f1" }}>
        <AdminNavbar />
        <Container>
          <div>
            <h1 className="fs-1 fw-bold mt-5">Bookmark</h1>

            <div className="row mt-5 pb-5">
              <>
                <BookmarkCardAdmin data={bookMarks} />
              </>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default BookmarkAdmin;
