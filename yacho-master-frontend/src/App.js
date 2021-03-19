import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Settings from "./Settings";
import Quiz from "./Quiz";

function App() {
  const [points, setPoints] = useState(0);
  const [keys, setKeys] = useState(["a", "d", "g", "j"]);
  const [nextKey, setNextkey] = useState("right");

  return (
    <>
      <Menu />
      <Switch>
        <Route path="/quiz">
          <Quiz
            points={points}
            setPoints={setPoints}
            keys={keys}
            nextKey={nextKey}
          />
        </Route>
        <Route path="/settings">
          <Settings
            keys={keys}
            setKeys={setKeys}
            nextKey={nextKey}
            setNextkey={setNextkey}
          />
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
