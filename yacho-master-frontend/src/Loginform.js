import React, { useState } from "react";

const Loginform = ({ handleLogin }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName.length > 0 && password.length > 0) {
      const loginInfo = { username: userName, password };
      handleLogin(loginInfo);
      setUserName("");
      setPassword("");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input
            type="text"
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          {" "}
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </>
  );
};

export default Loginform;
