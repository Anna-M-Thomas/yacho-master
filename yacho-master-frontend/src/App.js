import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import { useTranslation } from "react-i18next";

const Testcomponent = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <h1>{t("title")}</h1>
      <div>{t("description.part1")}</div>
      <div>{t("description.part1")}</div>
    </>
  );
};

function App() {
  return (
    <>
      <Menu />
      <Switch>
        <Route path="/quiz">
          <div>Lalala I am the quiz</div>
        </Route>
        <Route path="/settings">
          <div>Lalala here are the settings</div>
        </Route>
        <Route path="/thanks">
          <div>Lalala these are the thanks</div>
        </Route>
        <Route path="/thanks">
          <div>Lalala these are the thanks</div>
        </Route>
        <Route path="/login">
          <div>Lalala login here</div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
