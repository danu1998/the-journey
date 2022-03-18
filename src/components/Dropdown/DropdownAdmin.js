import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { BsJournalPlus, BsBookmarkCheck } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const DropdownAdmin = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="card">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-start d-flex gap-3">
            <FaRegUserCircle className="text-primary" />
            <Link to="/profile" className="text-decoration-none text-secondary">
              Profile
            </Link>
          </li>
          <li className="list-group-item text-start d-flex gap-3">
            <BsJournalPlus className="text-primary" />
            <Link to="/add" className="text-decoration-none text-secondary">
              New Journey
            </Link>
          </li>

          <li className="list-group-item text-start d-flex gap-3">
            <BsBookmarkCheck className="text-primary" />
            <Link
              to="/bookmark"
              className="text-decoration-none text-secondary"
            >
              Bookmark
            </Link>
          </li>
          <li className="list-group-item text-start d-flex gap-3">
            <FiLogOut className="text-primary" />
            <div
              className="text-decoration-none text-secondary"
              onClick={logout}
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DropdownAdmin;
