import React, { useState } from "react";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const Loginform = ({ handleLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserName("");
    setPassword("");
    if (userName.length > 0 && password.length > 0) {
      const loginInfo = { username: userName, password };
      handleLogin(loginInfo);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Textfield
          type="text"
          label="Username"
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <Textfield
          type="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </>
  );
};

export default Loginform;
