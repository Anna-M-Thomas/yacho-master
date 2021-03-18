import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Languageselect = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      <button onClick={() => i18n.changeLanguage("jp")}>jp</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
    </div>
  );
};

const Menu = () => {
  const { t } = useTranslation();

  const style = {
    padding: 20,
  };

  return (
    <>
      <nav>
        <Link to="/quiz" style={style}>
          {t("menu.quiz")}
        </Link>
        <Link to="/settings" style={style}>
          {t("menu.settings")}
        </Link>
        <Link to="/thanks" style={style}>
          {t("menu.thanks")}
        </Link>
        <Link to="/login" style={style}>
          {t("menu.login")}
        </Link>
      </nav>
      <Languageselect />
    </>
  );
};

export default Menu;
