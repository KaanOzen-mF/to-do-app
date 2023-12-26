import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import "../Pages.css";
import "../Components.css";

export default function Login() {
  const [activeView, setActiveView] = useState("signIn");

  const handleSignUpSuccess = () => {
    setActiveView("signIn");
  };

  return (
    <div className="login_page">
      {activeView === "signIn" ? (
        <SignIn setActiveView={setActiveView} />
      ) : (
        <SignUp
          setActiveView={setActiveView}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}
    </div>
  );
}
