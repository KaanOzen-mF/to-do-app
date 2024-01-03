import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import "../Pages.css";
import "../Components.css";

// Login component manages the authentication views for SignIn and SignUp
export default function Login() {
  // State to toggle between SignIn and SignUp views
  const [activeView, setActiveView] = useState("signIn");
  // Function to handle successful sign-up and switch back to sign-in view
  const handleSignUpSuccess = () => {
    setActiveView("signIn");
  };
  // Rendering the component
  return (
    <div className="login_page">
      {/* Conditional rendering based on the activeView state */}
      {activeView === "signIn" ? (
        // Renders the SignIn component if activeView is 'signIn'
        <SignIn setActiveView={setActiveView} />
      ) : (
        // Renders the SignUp component if activeView is not 'signIn'
        <SignUp
          setActiveView={setActiveView}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}
    </div>
  );
}
