import React, { useState, useEffect, useRef } from "react";
import questionHandler from "../services/nextquestion";
import answerHandler from "../services/answer";
import imageHandler from "../services/image";
import { useHotkeys } from "react-hotkeys-hook";

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
        {hasAnswered ? (
          <>
            <div>
              {question.en} {question.jp}{" "}
              <img
                src={image}
                alt="a silhouette of a bird with a question mark on it"
              />
              {displayHistory &&
                `right: ${displayHistory.right} wrong: ${displayHistory.wrong}`}
            </div>
            <div>
              {" "}
              <a href={`${question.lic}`}>CC</a> {question.rec}, XC{question.id}
              . Accessible at {question.url}.
            </div>
          </>
        ) : (
          <img
            src="./mysterybird.jpg"
            alt="a silhouette of a bird with a question mark on it"
          />
        )}
      </div>
      <audio
        ref={ref}
        src={`http://localhost:3001/${question.id}.mp3`}
        controls
        preload="auto"
      />

      {answers.map((bird, index) => (
        <button key={bird.id} data-id={bird.id} onClick={handlePress}>
          {bird.en} {bird.jp} ({keys[index]})
        </button>
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
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Play/stop audio: {play}</div>
    </>
  );
};

export default Quiz;
