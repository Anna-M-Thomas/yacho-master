import React, { useState, useEffect, useRef } from "react";
import questionHandler from "../services/nextquestion";
import answerHandler from "../services/answer";
import imageHandler from "../services/image";
import { useHotkeys } from "react-hotkeys-hook";
import Button from "@material-ui/core/Button";

const Question = React.forwardRef((props, ref) => {
  const {
    keys,
    answers,
    handlePress,
    question,
    hasAnswered,
    displayHistory,
    image,
  } = props;

  return (
    <>
      <h1>Quiz!</h1>
      <div>
        <img src={hasAnswered ? image : "./mysterybird.jpg"} />
        {hasAnswered && question.en}
        {displayHistory &&
          `right: ${displayHistory.right} wrong: ${displayHistory.wrong}`}
      </div>
      <audio
        ref={ref}
        src={`http://localhost:3001/${question.id}.mp3`}
        controls
        preload="auto"
      />
      {hasAnswered && (
        <div>
          <a href={`${question.lic}`}>CC</a> {question.rec}, XC{question.id}.
          Accessible at {question.url}.
        </div>
      )}

      {answers.map((bird, index) => (
        <Button key={bird.id} data-id={bird.id} onClick={handlePress}>
          {bird.en} {bird.jp} ({keys[index]})
        </Button>
      ))}
    </>
  );
});

const Quiz = ({
  keys,
  nextKey,
  play,
  user,
  choices,
  answerHistory,
  setAnswerHistory,
}) => {
  const [question, setQuestion] = useState(null);
  const [image, setImage] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [displayHistory, setdisplayHistory] = useState(null);

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
  }, []);

  useEffect(() => {
    if (question) {
      imageHandler
        .getImage(question.en)
        .then((result) => {
          console.log("result from get Image!!", result);
          const { farm, server, id, secret } = result.photos.photo[0];
          setImage(
            `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_w.jpg`
          );
        })
        .catch((error) => {
          console.log(error);
          setImage("./notmysterybird.jpg");
        });
    }
  }, [question]);

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
    if (user) {
      try {
        const returnedAnswer = await answerHandler.answer(
          user,
          question,
          wasCorrect
        );
        setdisplayHistory(returnedAnswer);
        const found = answerHistory.find(
          (answer) => answer.id === returnedAnswer.id
        );
        if (!found) {
          const newHistory = answerHistory.concat(returnedAnswer);
          setAnswerHistory(newHistory);
        } else {
          const newAnswerHistory = answerHistory.map((answer) =>
            answer.id === returnedAnswer.id ? returnedAnswer : answer
          );
          setAnswerHistory(newAnswerHistory);
        }
      } catch (error) {
        console.log(error);
      }
    }
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
      setdisplayHistory(null);
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
          answerHistory={answerHistory}
          setAnswerHistory={setAnswerHistory}
          handlePress={handlePress}
          displayHistory={displayHistory}
          image={image}
        />
      )}
      <Button onClick={nextQuestion}>Next question {nextKey}</Button>
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
