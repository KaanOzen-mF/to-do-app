import React from "react";

export default function SignUp() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const existingData = localStorage.getItem("signUpData");
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      if (parsedData.email === signUpData.email) {
        alert("Email already exists. Please use a different email.");
        return; // Stop the function if email already exists
      }
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("signUpData", JSON.stringify(signUpData));
    alert("Sign up successful!");
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
