import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import { useHotkeys } from "react-hotkeys-hook";

//<div>{hidden ? "?" : `${question.en} ${question.jp}`}</div>

const Mysterybird = React.forwardRef((props, ref) => {
  const { question } = props;

  return (
    <>
      <div>{`${question.en} ${question.jp}, should be ${question.file}`}</div>
      <audio ref={ref} src={question.file} controls />
    </>
  );
});

const Answers = ({
  keys,
  question,
  answers,
  hidden,
  setHidden,
  points,
  setPoints,
}) => {
  useHotkeys(
    keys.join(", "),
    (event) => handleAnswer(event),
    [question, answers],
    {
      keydown: true,
    }
  );

  const handleAnswer = (event) => {
    if (hidden) {
      setHidden(false);
      if (event.type === "keydown") {
        const index = keys.findIndex((key) => key === event.key);
        if (answers[index].id === question.id) {
          setPoints(points + 1);
        }
      }
      if (event.target.dataset.id === question.id) {
        setPoints(points + 1);
      }
    }
  };

  return answers.map((bird, index) => (
    <button key={bird.id} data-id={bird.id} onClick={handleAnswer}>
      {bird.en} {bird.jp} ({keys[index]})
    </button>
  ));
};

const Quiz = ({ points, setPoints, keys, nextKey, play, choices }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [hidden, setHidden] = useState(true);

  useHotkeys(nextKey, () => nextQuestion(), { keydown: true });

  useHotkeys(play, () => handlePlayButton(), { keydown: true });

  const audioRef = useRef();

  //This will disappear, we'll be getting both from backend!
  useEffect(() => {
    questionHandler.getQuestion().then((result) => {
      setQuestion(result.question);
      setAnswers(result.answers);
    });
  }, []);

  const handlePlayButton = () => {
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

  const nextQuestion = () => {
    setHidden(true);
    console.log(
      "Inside next question, here is audioRef.current before reload",
      audioRef.current
    );
    audioRef.current.pause();
    questionHandler.getQuestion().then((result) => {
      setQuestion(result.question);
      setAnswers(result.answers);
    });
    audioRef.current.load();
    console.log(
      "Inside next question, here is audioRef.current after load",
      audioRef.current
    );
  };

  const answerProps = {
    answers,
    question,
    hidden,
    setHidden,
    points,
    setPoints,
    keys,
    nextKey,
  };

  return (
    <>
      {question && (
        <Mysterybird question={question} hidden={hidden} ref={audioRef} />
      )}
      {answers && <Answers {...answerProps} />}
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Points: {points}</div>
      <div>Play audio: {play}</div>
    </>
  );
};

export default Quiz;
