import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import { useHotkeys } from "react-hotkeys-hook";

const Mysterybird = React.forwardRef((props, ref) => {
  const { question, hasAnswered } = props;

  return (
    <>
      <div>
        {hasAnswered
          ? `${question.en} ${question.jp}, should be ${question.file}`
          : "?"}
      </div>
      <audio ref={ref} src={question.file} controls preload="auto" />
    </>
  );
});

const Answers = ({
  keys,
  question,
  answers,
  hasAnswered,
  setHasAnswered,
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
    setHasAnswered(true);
    console.log(
      "hasAnswered inside handleAnswer, Answers, should be true",
      hasAnswered
    );
    if (event.type === "keydown") {
      const index = keys.findIndex((key) => key === event.key);
      if (answers[index].id === question.id) {
        setPoints(points + 1);
      }
    }
    if (event.target.dataset.id === question.id) {
      setPoints(points + 1);
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
  const [hasAnswered, setHasAnswered] = useState(false);

  useHotkeys(nextKey, () => nextQuestion(), { keydown: true });

  useHotkeys(play, () => handlePlayButton(), { keydown: true });

  const audioRef = useRef();

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
    console.log("has answered inside nextQuestion inside Quiz", hasAnswered);
    if (hasAnswered) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      questionHandler.getQuestion().then((result) => {
        setQuestion(result.question);
        setAnswers(result.answers);
      });
      audioRef.current.load();
      setHasAnswered(false);
    }
  };

  const answerProps = {
    answers,
    question,
    hasAnswered,
    setHasAnswered,
    points,
    setPoints,
    keys,
    nextKey,
  };

  return (
    <>
      {question && (
        <Mysterybird
          question={question}
          hasAnswered={hasAnswered}
          ref={audioRef}
        />
      )}
      {answers && <Answers {...answerProps} />}
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Points: {points}</div>
      <div>Play audio: {play}</div>
    </>
  );
};

export default Quiz;
