import React from "react";
import { useTranslation } from "react-i18next";

const Mysterybird = ({ mysterybird }) => {
  return <div>?</div>;
};

const Answers = ({ answers }) => {
  return answers.forEach((bird) => <div>{bird.name}</div>);
};

const Quiz = () => {
  <>
    <Mysterybird />
    <Answers />
  </>;
};

export default Quiz;
