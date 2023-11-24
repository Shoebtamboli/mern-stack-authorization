import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute roles={["admin"]} />}
          >
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="/user-profile"
            element={<ProtectedRoute roles={["user", "admin"]} />}
          >
            <Route index element={<UserProfile />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
