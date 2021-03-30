import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import loginHandler from "./services/login";
import Menu from "./Menu";
import Settings from "./Settings";
import Newuserform from "./Newuserform";
import Loginform from "./Loginform";
import Quiz from "./Quiz";

function App() {
  const [choices, setChoices] = useState(8);
  const defaultKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
  const savedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const [user, setUser] = useState(savedUser || "");
  const [answerHistory, setAnswerHistory] = useState([]);
  const [keys, setKeys] = useState(defaultKeys.slice(0, choices));
  const [nextKey, setNextkey] = useState("right");
  const [play, setPlay] = useState("space");

  useEffect(() => {
    if (user)
      loginHandler
        .checkUser(user.token)
        .then((response) => console.log(response))
        .catch((error) => {
          console.log("error", error);
          setUser("");
          setAnswerHistory([]);
          window.localStorage.setItem("loggedInUser", JSON.stringify(null));
        });
  }, []);

  const handleLogin = async (login) => {
    try {
      const { token, username, id, answers } = await loginHandler.loginUser(
        login
      );
      const loggedInUser = { token, username, id };
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setAnswerHistory(answers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Menu user={user} setUser={setUser} />
      <Switch>
        <Route path="/quiz">
          <Quiz
            keys={keys}
            nextKey={nextKey}
            play={play}
            choices={choices}
            user={user}
            setUser={setUser}
            answerHistory={answerHistory}
            setAnswerHistory={setAnswerHistory}
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
          {!user && (
            <>
              <Loginform setUser={setUser} handleLogin={handleLogin} />
              <Newuserform />
            </>
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
