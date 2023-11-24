import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar">
      <Link to="/" className="nav-item">
        Home
      </Link>
      {user ? (
        <>
          {/* Wrap the welcome message with a Link to the user profile */}
          <Link to="/user-profile" className="nav-item">
            Welcome, {user.username}
          </Link>
          <button onClick={logout} className="nav-item logout-btn">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-item">
            Login
          </Link>
          <Link to="/signup" className="nav-item nav-signup-btn">
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
