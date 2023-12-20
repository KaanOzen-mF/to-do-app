import React from "react";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const [signInData, setsignInData] = React.useState({
    email: "",
    password: "",
  });

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
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
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
        </form>
      </div>
    </>
  );
}
