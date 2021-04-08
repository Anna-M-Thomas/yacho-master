import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Textfield from "@material-ui/core/Textfield";
import Button from "@material-ui/core/Button";

const Loginform = ({ handleLogin }) => {
  const { t } = useTranslation();
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
      <h1>{t("login.login")}</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Textfield
          type="text"
          label={t("login.username")}
          value={userName}
          onChange={({ target }) => setUserName(target.value)}
        />
        <Textfield
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
