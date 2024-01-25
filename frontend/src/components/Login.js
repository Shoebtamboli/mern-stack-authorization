import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        formData
      );
      login(response.data);
      // Redirect based on user's role
      if (response.data.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user-profile");
      }

      setMessage("Login successful");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="form-label">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="form-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
