import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default function Login() {
  const [activeView, setActiveView] = useState("signIn");

  const handleSignUpSuccess = () => {
    setActiveView("signIn");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => setActiveView("signIn")}>Sign In</button>
      <button onClick={() => setActiveView("signUp")}>Sign Up</button>

      {activeView === "signIn" ? (
        <SignIn />
      ) : (
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      )}
    </div>
  );
}
