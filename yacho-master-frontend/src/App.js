import React from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";

function App() {
  return (
    <>
      <Switch>
        <Route path="/quiz">
          <Menu />
          <div>Lalala I am the quiz</div>
        </Route>
        <Route path="/settings">
          <Menu />
          <div>Lalala here are the settings</div>
        </Route>
        <Route path="/thanks">
          <Menu />
          <div>Lalala these are the thanks</div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
