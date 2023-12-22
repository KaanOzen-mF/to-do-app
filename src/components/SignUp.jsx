import React from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Modal from "./Modal";

export default function SignUp({ onSignUpSuccess, setActiveView }) {
  const [signUpData, setsignUpData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

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
        setModalContent("Email already in use. Please use a different email.");
      } else {
        setModalContent("Please write email and/or password");
      }
      setShowModal(true);
    }
  };

  const handleGoToSignIn = () => {
    setActiveView("signIn");
  };
  return (
    <>
      <div className="form_container">
        <form className="form_element_container">
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
          <button onClick={handleSubmit} className="sign_btn">
            Sign Up
          </button>

          <p>
            Already have an account?
            <span onClick={handleGoToSignIn}>Sign In now</span>
          </p>
        </form>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}
