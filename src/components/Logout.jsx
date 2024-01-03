import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// LogoutButton is a functional component that renders a logout button
export default function LogoutButton() {
  const navigate = useNavigate(); // useNavigate hook for programmatically navigating

  // handleLogout is an asynchronous function to handle the logout process
  const handleLogout = async () => {
    try {
      await signOut(auth); // Attempt to sign out using Firebase authentication
      console.log("Logged out successfully!");
      navigate("/"); // Redirect to the homepage after successful logout
    } catch (error) {
      console.error("Logout failed: ", error); // Log error if logout fails
    }
  };

  return (
    // Render a button that, when clicked, triggers the handleLogout function
    <button onClick={handleLogout} className="logout_btn_container">
      Logout
    </button>
  );
}
