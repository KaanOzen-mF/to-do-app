import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust this path as necessary
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}
