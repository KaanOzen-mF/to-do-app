import React from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

export default function SignIn() {
  const [signInData, setsignInData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the main todo page
        navigate("/todo");
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setsignInData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      alert("Sign in successful!");
      navigate("/todo"); // Navigate to the main todo page on successful sign-in
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        alert("Email or password not correct");
      } else {
        alert("An error occurred during sign up.");
      }
    }
  };

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    if (signInData.email === "") {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, signInData.email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email.");
    }
  };

  return (
    <>
      <div>
        <h1>Sign In</h1>

        <form>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={signInData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={signInData.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Sign in
          </button>
          <button onClick={resetPasswordHandler}>forget password</button>
        </form>
      </div>
    </>
  );
}
