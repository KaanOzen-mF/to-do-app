import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "./Modal";

// SignUp component is used for new user registration
export default function SignUp({ onSignUpSuccess, setActiveView }) {
  // State to manage the sign-up form data
  const [signUpData, setsignUpData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to manage modal visibility and content
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

  // Function to handle input changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setsignUpData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission for sign-up
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the entered passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      setShowModal(true); // Alert if passwords do not match
      setModalContent("Passwords do not match");
      return;
    }

    setShowModal(false);

    // Attempt to create a new user with email and password
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      alert("Sign up successful!");
      onSignUpSuccess(); // Invoke callback function on successful sign-up
    } catch (error) {
      // Display errors as modal content based on the type of error
      if (error.code === "auth/email-already-in-use") {
        setModalContent("Email already in use. Please use a different email.");
      } else {
        setModalContent("Please write email and/or password");
      }
      setShowModal(true);
    }
  };

  // Function to switch to the Sign In view
  const handleGoToSignIn = () => {
    setActiveView("signIn");
  };
  // Render the sign-up form and modal
  return (
    <>
      <div className="form_container">
        <form className="form_element_container">
          {/* Email input */}
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={signUpData.email}
            onChange={handleChange}
            className="input_container"
            required
          />
          {/* Password input */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={signUpData.password}
            onChange={handleChange}
            className="input_container"
            required
          />
          {/* Confirm password input */}
          <input
            type="password"
            name="confirmPassword"
            id="confirm-password"
            placeholder="confirm password"
            value={signUpData.confirmPassword}
            onChange={handleChange}
            className="input_container"
            required
          />
          {/* Sign up button */}
          <button onClick={handleSubmit} className="sign_btn">
            Sign Up
          </button>
          {/* Link to switch to sign in */}
          <p>
            Already have an account?
            <span onClick={handleGoToSignIn}>Sign In now</span>
          </p>
        </form>
      </div>
      {/* Modal for displaying messages */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}
