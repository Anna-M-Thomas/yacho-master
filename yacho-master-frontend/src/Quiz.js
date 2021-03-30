import React, { useState, useEffect, useRef } from "react";
import questionHandler from "./services/nextquestion";
import answerHandler from "./services/answer";
import { useHotkeys } from "react-hotkeys-hook";

const Mysterybird = React.forwardRef((props, ref) => {
  const { question, hasAnswered } = props;

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
    </>
  );
});

const Answers = ({ keys, answers, handlePress }) => {
  return answers.map((bird, index) => (
    <button key={bird.id} data-id={bird.id} onClick={handlePress}>
      {bird.en} {bird.jp} ({keys[index]})
    </button>
  ));
};

const Quiz = ({ keys, nextKey, play, user, setUser, choices }) => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
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

  const handlePlayButton = () => {
    audioRef.current.paused
      ? audioRef.current.play().catch((error) => console.log(error))
      : audioRef.current.pause();
  };

  //handles next question click or keyright
  const nextQuestion = () => {
    if (hasAnswered) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      questionHandler.getQuestion(choices).then((result) => {
        setQuestion(result.question);
        setAnswers(result.answers);
      });
      audioRef.current.load();
      setHasAnswered(false);
    }
  };

  //After click or keydown (handlePress above)
  const handleAnswer = async (wasCorrect) => {
    if (user.answers) {
      const found = user.answers.find((answer) => answer.bird === question.id);
      if (!found) {
        const returnedAnswer = await answerHandler.answerFirstTime({
          bird: question.id,
          user: user.id,
          right: wasCorrect ? 1 : 0,
          wrong: wasCorrect ? 0 : 1,
        });
        const newAnswers = user.answers.concat(returnedAnswer);
        setUser({ ...user, answers: newAnswers });
      } else {
        const { id, right, wrong } = found;
        const returnedAnswer = await answerHandler.answerAgain(id, {
          right: wasCorrect ? right + 1 : right,
          wrong: wasCorrect ? wrong : wrong + 1,
        });
        const newAnswers = user.answers.map((answer) =>
          answer.id === id ? returnedAnswer : answer
        );
        setUser({ ...user, answers: newAnswers });
      }
    }
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
      {answers && (
        <Answers keys={keys} answers={answers} handlePress={handlePress} />
      )}
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
