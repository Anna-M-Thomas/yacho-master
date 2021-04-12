import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/Appbar";
import Button from "@material-ui/core/Button";

const Languageselect = () => {
  const { i18n } = useTranslation();
  return (
    <>
      <Button size="small" onClick={() => i18n.changeLanguage("jp")}>
        jp
      </Button>
      <Button size="small" onClick={() => i18n.changeLanguage("en")}>
        en
      </Button>
    </>
  );
};

const Menu = ({ user }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Button color="inherit" component={Link} to="/quiz" id="quiz">
          {t("menu.quiz")}
        </Button>
        <Button color="inherit" component={Link} to="/settings" id="settings">
          {t("menu.settings")}
        </Button>
        <Button color="inherit" component={Link} to="/about" id="about">
          {t("menu.about")}
        </Button>
        {!user && (
          <Button
            variant="contained"
            size="small"
            component={Link}
            to="/login"
            id="login"
          >
            {t("menu.login")}
          </Button>
        )}
        {user ? (
          <span>
            <Button color="inherit" component={Link} to="/user">
              {user.username}
            </Button>{" "}
            logged in
          </span>
        ) : (
          ""
        )}
        <Languageselect />
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
