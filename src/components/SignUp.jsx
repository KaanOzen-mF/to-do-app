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

  console.log(signUpData);
  return (
    <>
      <div>
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
