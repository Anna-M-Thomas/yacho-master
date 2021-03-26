import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import answerHandler from "./services/answer";
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
  user,
  setUser,
}) => {
  useHotkeys(
    keys.join(", "),
    (event) => handlePress(event),
    [question, answers, hasAnswered],
    { keydown: true }
  );

  //first answer needs an object with bird: question.id and user: user.id
  const handleAnswer = async (correctOrNot) => {
    if (user.answers) {
      const found = user.answers.find((answer) => answer.bird === question.id);
      if (!found) {
        const returnedAnswer = await answerHandler.answerFirstTime({
          bird: question.id,
          user: user.id,
        });
        const newAnswers = user.answers.concat(returnedAnswer);
        console.log(newAnswers);
      }
    }
  };

  const handlePress = (event) => {
    if (!hasAnswered) {
      if (event.type === "keydown") {
        const index = keys.findIndex((key) => key === event.key);
        answers[index].id === question.id
          ? handleAnswer("correct")
          : handleAnswer("incorrect");
      } else {
        event.target.dataset.id === question.id
          ? handleAnswer("correct")
          : handleAnswer("incorrect");
      }
      setHasAnswered(true);
    }
  };

  return answers.map((bird, index) => (
    <button key={bird.id} data-id={bird.id} onClick={handlePress}>
      {bird.en} {bird.jp} ({keys[index]})
    </button>
  ));
};

const Quiz = ({ keys, nextKey, play, user, setUser }) => {
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
    user,
    setUser,
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
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
