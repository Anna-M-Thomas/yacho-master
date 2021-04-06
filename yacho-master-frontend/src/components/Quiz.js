import React, { useState, useEffect, useRef } from "react";
import questionHandler from "../services/nextquestion";
import answerHandler from "../services/answer";
import imageHandler from "../services/image";
import { useTranslation } from "react-i18next";
import { useHotkeys } from "react-hotkeys-hook";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
        <>
          <h1>{t("quiz.title")}</h1>
          <Grid container justify="space-around" spacing={4}>
            <Grid container item sm={7} direction="column" alignItems="stretch">
              <div className="imageDiv">
                <img
                  src={hasAnswered ? image : "./mysterybird.jpg"}
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
                  `right: ${displayHistory.right} wrong: ${displayHistory.wrong}`}
              </div>
              <audio
                ref={audioRef}
                src={`http://localhost:3001/${question.id}.mp3`}
                controls
                preload="auto"
              />

              {hasAnswered && (
                <aside id="audioLabel">
                  Audio <a href={`${question.lic}`}>CC</a> {question.rec}, XC
                  {question.id}. Accessible at www.xeno-canto.org/{question.id}.
                </aside>
              )}
              <div>
                {t("quiz.playstopaudio")}
                {play}
              </div>
            </Grid>
            <Grid
              container
              item
              sm={5}
              direction="column"
              spacing={3}
              alignItems="center"
            >
              {answers.map((bird, index) => (
                <Grid item key={bird.id}>
                  <Button
                    data-id={bird.id}
                    onClick={handlePress}
                    variant="contained"
                  >
                    {currentLang === "jp"
                      ? `${bird.jp} ${bird.en} (${keys[index]})`
                      : `${bird.en} ${bird.jp} (${keys[index]})`}
                  </Button>
                </Grid>
              ))}
              <Grid item>
                <Button onClick={nextQuestion} variant="contained">
                  {t("quiz.nextquestion")} ({nextKey})
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Quiz;
