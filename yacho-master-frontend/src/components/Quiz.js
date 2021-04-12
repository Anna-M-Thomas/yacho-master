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
          console.log("result from get Image!!", result);
          const {
            farm,
            server,
            id,
            secret,
            ownername,
            title,
          } = result.photos.photo[0];
          setImage({
            url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_w.jpg`,
            ownername,
            title,
          });
        })
        .catch((error) => {
          console.log(error);
          setImage({ url: "./notmysterybird.jpg" });
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
    <>
      {question && answers && (
        <>
          <div id="quizContainer">
            <div id="quizLeft">
              <div className="imageDiv">
                <img
                  id="birdImg"
                  src={hasAnswered ? image.url : "./mysterybird.jpg"}
                  alt={
                    hasAnswered
                      ? question.en
                      : "A picture of a bird with a question mark"
                  }
                />
              </div>
              <div id="imageLabel">
                {hasAnswered && question.en}
                {displayHistory &&
                  ` right: ${displayHistory.right} wrong: ${displayHistory.wrong}`}
              </div>
              <audio
                ref={audioRef}
                src={`http://localhost:3001/${question.id}.mp3`}
                controls
                preload="auto"
              />
            </div>
            <div id="quizRight">
              {answers.map((bird) => (
                <Button key={bird.id} data-id={bird.id} onClick={handlePress}>
                  {currentLang === "jp"
                    ? `${bird.jp} ${bird.en}`
                    : `${bird.en} ${bird.jp}`}
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
            {t("quiz.playstopaudio")} {play}{" "}
            {keys.map(
              (item, index) =>
                `${t("settings.answer")} ${index + 1}: ${item}${
                  index === keys.length - 1 ? "" : ","
                } `
            )}
            <aside id="audioCredits">
              Audio <a href={`${question.lic}`}>CC</a> {question.rec}, XC
              {question.id}. Accessible at www.xeno-canto.org/
              {question.id}.
            </aside>
            {image && (
              <aside id="imageCredits">
                <a href={image.url}>Image</a> by {image.ownername}. "This
                product uses the Flickr API but is not endorsed or certified by
                SmugMug, Inc."
              </aside>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
