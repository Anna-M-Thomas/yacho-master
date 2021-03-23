import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Menu from "./Menu";
import Settings from "./Settings";
import Loginpage from "./Loginpage";
import Quiz from "./Quiz";

function App() {
  const [points, setPoints] = useState(0);
  const [choices, setChoices] = useState(8);
  const defaultKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
  const savedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const [user, setUser] = useState(savedUser | "");
  const [keys, setKeys] = useState(defaultKeys.slice(0, choices));
  const [nextKey, setNextkey] = useState("right");
  const [play, setPlay] = useState("space");

  return (
    <>
      <Menu user={user} />
      <Switch>
        <Route path="/quiz">
          <Quiz
            points={points}
            setPoints={setPoints}
            keys={keys}
            nextKey={nextKey}
            play={play}
            choices={choices}
          />
        </Route>
        <Route path="/settings">
          <Settings
            keys={keys}
            setKeys={setKeys}
            nextKey={nextKey}
            setNextkey={setNextkey}
            play={play}
            setPlay={setPlay}
            choices={choices}
            setChoices={setChoices}
          />
        </Route>
        <Route path="/thanks">
          <div>Lalala these are the thanks</div>
        </Route>
        <Route path="/login">
          <Loginpage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
