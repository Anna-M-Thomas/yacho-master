import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Quiz from "./Quiz";

function App() {
  const [points, setPoints] = useState(0);

  return (
    <>
      <Menu />
      <Switch>
        <Route path="/quiz">
          <Quiz points={points} setPoints={setPoints} />
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
