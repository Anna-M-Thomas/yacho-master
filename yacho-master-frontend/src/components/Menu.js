import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppBar, Button, Toolbar } from "@material-ui/core";

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
  const { t, ready } = useTranslation();
  if (!ready) {
    return null;
  }

  return (
    <AppBar position="sticky" color="primary" id="menu">
      <Toolbar>
        <Button color="inherit" component={Link} to="/quiz" id="quiz">
          <img src="bird_ooruri.png" alt="Blue-and-white flycatcher" />
          {t("menu.quiz")}
        </Button>

        <Button color="inherit" component={Link} to="/settings" id="settings">
          <img src="bird_yatsugashira.png" alt="Eurasian Hoopoe" />
          {t("menu.settings")}
        </Button>
        <Button color="inherit" component={Link} to="/about" id="about">
          <img src="bird_tashigi.png" alt="Common Snipe" />
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
            <Button color="inherit" component={Link} to="/user" id="user">
              <img src="bird_mejiro.png" alt="Japanese Whiteeye" />
              {user.username}
            </Button>{" "}
            {t("menu.loggedin")}
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
