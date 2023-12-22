import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import Modal from "./Modal";

export default function SignIn({ setActiveView }) {
  const [signInData, setsignInData] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");

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
        setModalContent("Email or password not correct");
      } else {
        setModalContent("Please write email and/or password");
      }
      setShowModal(true);
    }
  };

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

  const handleGoToSignUp = () => {
    setActiveView("signUp");
  };

  return (
    <>
      <div className="form_container">
        <form className="form_element_container">
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

          <p className="reset_password" onClick={resetPasswordHandler}>
            Forget Password
          </p>

          <button className="sign_btn" onClick={handleSubmit}>
            Sign In
          </button>
          <p>
            Don’t have an account?
            <span onClick={handleGoToSignUp}>Sign Up now</span>
          </p>
        </form>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>{modalContent}</p>
      </Modal>
    </>
  );
}
