import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/LeftNavStyles.css";
import useAdminCheck from "../hooks/useAdminCheck";

const LeftNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, loading } = useAdminCheck();

  const drawerStyle = {
    width: isOpen ? "250px" : "50px",
    transition: "width 0.3s",
    overflowX: "hidden",
    position: "fixed",
    zIndex: 1000,
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const navContainerStyle = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px 16px",
  };

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    transition: "justify-content 0.3s",
    padding: "8px 0",
    gap: "8px",
  };

  const helpLinkStyle = {
    ...navLinkStyle,
    marginTop: "auto", // Push the "Need Help?" link to the bottom
    color: "black",
  };

  return (
    <div
      style={drawerStyle}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div style={navContainerStyle}>
        <Link to="/" className="nav-link" style={navLinkStyle}>
          <span className="material-icons">home</span> {isOpen && "Home"}
        </Link>

        <Link to="/Profile" className="nav-link" style={navLinkStyle}>
          <span className="material-icons">person</span> {isOpen && "Profile"}
        </Link>

        <Link to="/Tournaments" className="nav-link" style={navLinkStyle}>
          <span className="material-icons">emoji_events</span>{" "}
          {isOpen && "Tournaments"}
        </Link>

        <Link to="/Settings" className="nav-link" style={navLinkStyle}>
          <span className="material-icons">settings</span>{" "}
          {isOpen && "Settings"}
        </Link>

        {isAdmin && !loading && (
          <Link to="/MemberList" className="nav-link" style={navLinkStyle}>
            <span className="material-icons">people</span>{" "}
            {isOpen && "MemberList"}
          </Link>
        )}

        {isAdmin && !loading && (
          <Link to="/DevTools" className="nav-link" style={navLinkStyle}>
            <span className="material-icons">warning</span>{" "}
            {isOpen && "DevTools"}
          </Link>
        )}

        <a href="#help" className="nav-link" style={helpLinkStyle}>
          <span className="material-icons">help_outline</span>{" "}
          {isOpen && "Need Help?"}
        </a>
      </div>
    </div>
  );
};

export default LeftNav;
