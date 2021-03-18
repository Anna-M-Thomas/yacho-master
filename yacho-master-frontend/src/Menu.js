import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const style = {
    padding: 20,
  };

  return (
    <nav>
      <Link to="/quiz" style={style}>
        Quiz
      </Link>
      <Link to="/settings" style={style}>
        Settings
      </Link>
      <Link to="/thanks" style={style}>
        Thanks
      </Link>
    </nav>
  );
};

export default Menu;
