import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./i18n";

ReactDOM.render(
  <Router>
    <Container>
      <App />
    </Container>
  </Router>,
  document.getElementById("root")
);
