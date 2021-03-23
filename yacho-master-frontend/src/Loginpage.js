import React, { useState } from "react";
import userHandler from "./services/newuser";
import loginHandler from "./services/login";

const NewUserForm = () => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNewUser = (event) => {
    event.preventDefault();
    const newUser = { username: newUserName, password: newPassword };
    userHandler
      .makeUser(newUser)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Make a new user</h1>
      <form onSubmit={handleNewUser}>
        <div>
          New username
          <input
            type="text"
            value={newUserName}
            onChange={({ target }) => setNewUserName(target.value)}
          />
        </div>
        <div>
          {" "}
          Password
          <input
            type="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

const Loginform = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const login = { username: userName, password };
    try {
      const loggedInUser = loginHandler.loginUser(login);
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          New username
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

const Loginpage = () => {
  return (
    <>
      <NewUserForm />
      <Loginform />
    </>
  );
};

export default Loginpage;
