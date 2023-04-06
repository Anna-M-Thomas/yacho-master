import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Button } from "@material-ui/core";

const Loginform = ({ handleLogin }) => {
  const { t, ready } = useTranslation();
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

  if (!ready) {
    return null;
  }

  return (
    <>
      <h1>{t("login.login")}</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          type="text"
          label={t("login.username")}
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <TextField
          type="password"
          label={t("login.password")}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit" variant="contained">
          {t("login.login")}
        </Button>
      </form>
    </>
  );
};

export default Loginform;
