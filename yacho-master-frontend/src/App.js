import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import loginHandler from "./services/login";
import Container from "@material-ui/core/Container";
import Menu from "./components/Menu";
import Settings from "./components/Settings";
import Newuserform from "./components/Newuserform";
import Loginform from "./components/Loginform";
import Quiz from "./components/Quiz";
import User from "./components/User";
import About from "./components/About";

function App() {
  const savedChoices = JSON.parse(window.localStorage.getItem("choices"));
  const savedUser = JSON.parse(window.localStorage.getItem("loggedInUser"));
  const savedKeys = JSON.parse(window.localStorage.getItem("keys"));
  const savedNext = JSON.parse(window.localStorage.getItem("next"));
  const savedPlay = JSON.parse(window.localStorage.getItem("play"));
  const [choices, setChoices] = useState(parseInt(savedChoices) || 8);
  const [user, setUser] = useState(savedUser || "");
  const [answerHistory, setAnswerHistory] = useState([]);
  const [keys, setKeys] = useState(
    savedKeys || ["1", "2", "3", "4", "5", "6", "7", "8"].slice(0, choices)
  );
  const [nextKey, setNextkey] = useState(savedNext || "right");
  const [play, setPlay] = useState(savedPlay || "space");

  useEffect(() => {
    if (user)
      loginHandler
        .checkUser(user.token)
        .then((response) => setAnswerHistory(response.answers))
        .catch((error) => {
          console.log("error", error);
          handleLogout();
        });
  }, []);

  const handleLogin = async (login) => {
    try {
      const { token, user } = await loginHandler.loginUser(login);
      const loggedInUser = { token, username: user.username, id: user.id };
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setAnswerHistory(user.answers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser("");
    setAnswerHistory([]);
    window.localStorage.setItem("loggedInUser", JSON.stringify(null));
  };

  return (
    <>
      <Menu user={user} />
      <Container>
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
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            {!user ? (
              <>
                <Loginform setUser={setUser} handleLogin={handleLogin} />
                <Newuserform />
              </>
            ) : (
              <Redirect to="/about" />
            )}
          </Route>
          <Route path="/user">
            {user ? (
              <User
                user={user}
                setUser={setUser}
                answerHistory={answerHistory}
                setAnswerHistory={setAnswerHistory}
                handleLogout={handleLogout}
              />
            ) : (
              <Redirect to="/about" />
            )}
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;
