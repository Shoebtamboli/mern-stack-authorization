import React from "react";
import { useAuth } from "../context/AuthContext";
import "./UserProfile.css";

function UserProfile() {
  const { user } = useAuth();

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  console.log(user);
  return (
    <div className="user-profile-container">
      <h1 className="user-profile-header">User Profile</h1>
      <div className="user-detail">
        <strong>Username:</strong> {user.username}
      </div>
      <div className="user-detail">
        <strong>Role:</strong> {user.role}
      </div>
    </div>
  );
}

export default UserProfile;
