import React, { useState } from "react";
import userHandler from "../services/user";

const Newuserform = () => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNewUser = (event) => {
    event.preventDefault();
    if (newUserName.length > 0 && newPassword.length > 0) {
      const newUser = { username: newUserName, password: newPassword };
      userHandler
        .makeUser(newUser)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
      setNewUserName("Lalala");
      setNewPassword("Lalala");
    }
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

export default Newuserform;
