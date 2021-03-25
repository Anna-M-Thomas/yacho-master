import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import { useHotkeys } from "react-hotkeys-hook";

const Mysterybird = React.forwardRef((props, ref) => {
  const { question, hasAnswered } = props;

  return (
    <>
      {hasAnswered ? (
        <>
          <div>
            {question.en} {question.jp}
          </div>
          <div>
            <a href={`${question.lic}`}>CC</a> {question.rec}, XC{question.id}.
            Accessible at {question.url}.
          </div>
        </>
      ) : (
        <div>?</div>
      )}

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
    [question, answers, hasAnswered],
    {
      keydown: true,
    }
  );

  const handleCorrect = () => {
    setPoints(points + 1);
    console.log("Correct!");
  };

  const handleIncorrect = () => {
    console.log("incorrect!");
  };

  const handleAnswer = (event) => {
    if (!hasAnswered) {
      if (event.type === "keydown") {
        const index = keys.findIndex((key) => key === event.key);
        answers[index].id === question.id ? handleCorrect() : handleIncorrect();
      } else {
        event.target.dataset.id === question.id
          ? handleCorrect()
          : handleIncorrect();
      }
      setHasAnswered(true);
    }
  };

  return answers.map((bird, index) => (
    <button key={bird.id} data-id={bird.id} onClick={handleAnswer}>
      {bird.en} {bird.jp} ({keys[index]})
    </button>
  ));
};

const Quiz = ({ points, setPoints, keys, nextKey, play }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useHotkeys(nextKey, () => nextQuestion(), [hasAnswered], { keydown: true });
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
      ? audioRef.current.play().catch((error) => console.log(error))
      : audioRef.current.pause();
  };

  const nextQuestion = () => {
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
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
