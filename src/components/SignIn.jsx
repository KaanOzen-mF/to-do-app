import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import Modal from "./Modal";

// SignIn component is used for user authentication
export default function SignIn({ setActiveView }) {
  // State to manage the sign-in form data
  const [signInData, setsignInData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // State to manage modal visibility and content
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // useEffect hook to monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is signed in, navigate to the main todo page
        navigate("/todo");
      }
    });
    // Cleanup function to unsubscribe from auth state changes
    return unsubscribe;
  }, [navigate]);

  // Function to handle input changes in the form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setsignInData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission for sign-in
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      navigate("/todo"); // Navigate to the main todo page on successful sign-in
    } catch (error) {
      // Display errors as modal content based on the type of error
      if (error.code === "auth/invalid-credential") {
        setModalContent("Email or password not correct");
      } else {
        setModalContent("Please write email and/or password");
      }
      setShowModal(true);
    }
  };

  // Function to handle password reset request
  const resetPasswordHandler = async () => {
    if (signInData.email === "") {
      setModalContent("Please enter your email address.");
      setShowModal(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, signInData.email);
      setModalContent("Password reset email sent!");
      setShowModal(true);
    } catch (error) {
      setModalContent("Failed to send password reset email.");
      setShowModal(true);
    }
  };

  // Function to switch to the Sign Up view
  const handleGoToSignUp = () => {
    setActiveView("signUp");
  };

  // Render the sign-in form and modal
  return (
    <>
      <div className="form_container">
        <form className="form_element_container">
          {/* Email input */}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={signInData.email}
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
            value={signInData.password}
            onChange={handleChange}
            className="input_container"
            required
          />
          {/* Password reset link */}
          <p className="reset_password" onClick={resetPasswordHandler}>
            Forget Password
          </p>
          {/* Sign in button */}
          <button className="sign_btn" onClick={handleSubmit}>
            Sign In
          </button>
          {/* Link to switch to sign up */}
          <p>
            Don’t have an account?
            <span onClick={handleGoToSignUp}>Sign Up now</span>
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
