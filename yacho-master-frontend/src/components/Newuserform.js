import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import userHandler from "../services/user";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const Newuserform = () => {
  const { t } = useTranslation();
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
      setNewUserName("");
      setNewPassword("");
    }
  };

  return (
    <>
      <h1>{t("login.newuser")}</h1>
      <form onSubmit={handleNewUser} autoComplete="off">
        <Textfield
          label={t("login.username")}
          type="text"
          value={newUserName}
          onChange={({ target }) => setNewUserName(target.value)}
        />
        <Textfield
          type="password"
          label={t("login.password")}
          value={newPassword}
          autoComplete="new-password"
          onChange={({ target }) => setNewPassword(target.value)}
        />
        <Button type="submit">{t("login.submit")}</Button>
      </form>
    </>
  );
};

export default Newuserform;
