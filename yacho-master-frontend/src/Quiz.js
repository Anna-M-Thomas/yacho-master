import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import answerHandler from "./services/answer";
import { useHotkeys } from "react-hotkeys-hook";

const Question = React.forwardRef((props, ref) => {
  const { keys, answers, handlePress, question, hasAnswered } = props;

  return (
    <>
      <div>
        {hasAnswered ? (
          <>
            <div>
              {question.en} {question.jp}
            </div>
            <div>
              {" "}
              <a href={`${question.lic}`}>CC</a> {question.rec}, XC{question.id}
              . Accessible at {question.url}.
            </div>
          </>
        ) : (
          "?"
        )}
      </div>
      <audio ref={ref} src={question.file} controls preload="auto" />
      {answers.map((bird, index) => (
        <button key={bird.id} data-id={bird.id} onClick={handlePress}>
          {bird.en} {bird.jp} ({keys[index]})
        </button>
      ))}
    </>
  );
});

const Quiz = ({ keys, nextKey, play, user, setUser, choices }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useHotkeys(nextKey, () => nextQuestion(), [hasAnswered], { keydown: true });
  useHotkeys(play, () => handlePlayButton(), { keydown: true });
  useHotkeys(
    keys.join(", "),
    (event) => handlePress(event),
    [question, answers, hasAnswered],
    { keydown: true }
  );

  const audioRef = useRef();

  useEffect(() => {
    questionHandler.getQuestion(choices).then((result) => {
      setQuestion(result.question);
      setAnswers(result.answers);
    });
  }, [choices]);

  const handlePlayButton = () => {
    audioRef.current.paused
      ? audioRef.current.play().catch((error) => console.log(error))
      : audioRef.current.pause();
  };

  //handles button click/keydown press for answer
  const handlePress = (event) => {
    if (!hasAnswered) {
      if (event.type === "keydown") {
        const index = keys.findIndex((key) => key === event.key);
        handleAnswer(answers[index].id === question.id);
      } else {
        handleAnswer(event.target.dataset.id === question.id);
      }
      setHasAnswered(true);
    }
  };

  //After click or keydown (handlePress above), but this is all saved user logic
  const handleAnswer = async (wasCorrect) => {
    if (user.answers) {
      const found = user.answers.find((answer) => answer.bird === question.id);
      if (!found) {
        const returnedAnswer = await answerHandler.answerFirstTime(
          user,
          question,
          wasCorrect
        );
        setUser({ ...user, answers: user.answers.concat(returnedAnswer) });
      } else {
        const { id, right, wrong } = found;
        const returnedAnswer = await answerHandler.answerAgain(
          id,
          right,
          wrong,
          wasCorrect
        );
        const newAnswers = user.answers.map((answer) =>
          answer.id === id ? returnedAnswer : answer
        );
        setUser({ ...user, answers: newAnswers });
      }
    }
  };

  //handles next question click or keyright
  const nextQuestion = () => {
    if (hasAnswered) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      questionHandler.getQuestion(choices).then((result) => {
        console.log("result", result);
        setQuestion(result.question);
        setAnswers(result.answers);
      });
      audioRef.current.load();
      setHasAnswered(false);
    }
  };

  return (
    <>
      {question && answers && (
        <Question
          question={question}
          hasAnswered={hasAnswered}
          ref={audioRef}
          keys={keys}
          answers={answers}
          handlePress={handlePress}
        />
      )}
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
