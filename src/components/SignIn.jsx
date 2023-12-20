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

  console.log(signInData);

  return (
    <>
      <div>
        <h1>Login Screen</h1>

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
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}
