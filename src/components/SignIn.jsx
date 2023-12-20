import React from "react";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const storedData = localStorage.getItem("signUpData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (
        parsedData.email === signInData.email &&
        parsedData.password === signInData.password
      ) {
        alert("Sign in successful");
        // Further logic for successful sign in
      } else {
        alert("Sign in failed: Incorrect email or password");
        // Logic for failed sign in
      }
    } else {
      alert("No stored data found");
      // Logic if no data is stored
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
