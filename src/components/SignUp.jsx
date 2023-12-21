import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ onSignUpSuccess }) {
  const [signUpData, setsignUpData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setsignUpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      alert("Sign up successful!");
      onSignUpSuccess(); // Call the callback function on successful sign-up
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use. Please use a different email.");
      } else {
        alert("An error occurred during sign up.");
      }
    }
  };

  return (
    <>
      <div>
        <h1>Sign Up</h1>
        <form>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={signUpData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={signUpData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            placeholder="confirm password"
            value={signUpData.confirmPassword}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </>
  );
}
