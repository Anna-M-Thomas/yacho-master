import React, { useState, useEffect, useRef } from "react";
import questionHandler from "../services/nextquestion";
import answerHandler from "../services/answer";
import imageHandler from "../services/image";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import Button from "@material-ui/core/Button";

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

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

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

  useEffect(() => {
    if (question) {
      imageHandler
        .getImage(question.en)
        .then((result) => {
          const {
            farm,
            server,
            id,
            secret,
            ownername,
            title,
            owner,
          } = result.photos.photo[0];
          setImage({
            url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_w.jpg`,
            ownername,
            title,
            owner,
          });
        })
        .catch((error) => {
          console.log(error);
          setImage({ url: "./missingbird.png" });
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
        handleAnswer(event.currentTarget.dataset.id === question.id);
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
    <main>
      {question && answers && (
        <>
          <div id="quizContainer">
            <div id="quizLeft">
              <div className="imageDiv">
                <img
                  id="birdImg"
                  src={hasAnswered ? image.url : "./mysterybird.png"}
                  alt={
                    hasAnswered
                      ? question.en
                      : "A picture of a bird with a question mark"
                  }
                />
              </div>
              <div id="imageLabel">
                {hasAnswered && question.en}
                {hasAnswered &&
                  displayHistory &&
                  ` Right: ${displayHistory.right} Wrong: ${displayHistory.wrong}`}
              </div>
              <audio
                ref={audioRef}
                src={`http://localhost:3001/${question.id}.mp3`}
                controls
                preload="auto"
              />
              {t("quiz.playstopaudio")} {play}
            </div>
            <div id="quizRight">
              {answers.map((bird, index) => (
                <Button key={bird.id} data-id={bird.id} onClick={handlePress}>
                  {currentLang === "jp"
                    ? `${bird.jp} ${bird.en} (${keys[index]})`
                    : `${bird.en} ${bird.jp} (${keys[index]})`}
                </Button>
              ))}
              <Button
                onClick={nextQuestion}
                variant="contained"
                color="secondary"
              >
                {t("quiz.nextquestion")} ({nextKey})
              </Button>
            </div>
          </div>
          <div id="creditsDiv">
            <aside id="audioCredits">
              Audio <a href={`${question.lic}`}>CC</a> {question.rec}, XC
              {question.id}. Accessible at www.xeno-canto.org/
              {question.id}.
            </aside>
            {image && (
              <aside id="imageCredits">
                Image by{" "}
                <a href={`https://www.flickr.com/people/${image.owner}/`}>
                  {image.ownername}
                </a>
                . "This product uses the Flickr API but is not endorsed or
                certified by SmugMug, Inc."
              </aside>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default Quiz;
