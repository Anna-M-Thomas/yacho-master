import React, { useState, useEffect, useRef } from "react";
import { getQuestion, getAnswers } from "./helperfunctions.js";
import songHandler from "./services/songs";
import { useHotkeys } from "react-hotkeys-hook";

const testBirds = [
  {
    id: "463834",
    en: "White-browed Laughingthrush",
    rec: "Greg Irving",
    cnt: "Thailand",
    url: "//www.xeno-canto.org/463834",
    file: "//www.xeno-canto.org/463834/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:38",
    filename:
      "XC463834-195 Laughingthrush - White-browed (Garrulax sannio comis) Call FEB 1633h 1700m DoiLangWest_GI_1309.mp3",
  },
  {
    id: "541310",
    en: "Northern Shoveler",
    rec: "Grégory Bruneau",
    cnt: "France",
    url: "//www.xeno-canto.org/541310",
    file: "//www.xeno-canto.org/541310/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:20",
    filename: "XC541310-200403 - 23h32 - Canard souchet.mp3",
  },
  {
    id: "572071",
    en: "Siberian Blue Robin",
    rec: "Byoungsoon Jang",
    cnt: "South Korea",
    url: "//www.xeno-canto.org/572071",
    file: "//www.xeno-canto.org/572071/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "1:23",
    filename: "XC572071-2020.06.27.8.56(siberian blue robin).mp3",
  },
  {
    id: "618175",
    en: "Grey Wagtail",
    rec: "Irish Wildlife Sounds",
    cnt: "Ireland",
    url: "//www.xeno-canto.org/618175",
    file: "//www.xeno-canto.org/618175/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:11",
    filename: "XC618175-Grey Wagtail_Flight Call_The Camber, Cobh_301220.mp3",
  },
  {
    id: "625505",
    en: "Common Kingfisher",
    rec: "Nikolay Sariev",
    cnt: "United Kingdom",
    url: "//www.xeno-canto.org/625505",
    file: "//www.xeno-canto.org/625505/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:24",
    filename: "XC625505- рибарче (Alcedo atthis), 2020-10-15, 16.02.mp3",
  },
  {
    id: "578823",
    en: "Japanese Green Woodpecker",
    rec: "Okamoto Keita Sin",
    cnt: "Japan",
    url: "//www.xeno-canto.org/578823",
    file: "//www.xeno-canto.org/578823/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:06",
    filename:
      "XC578823-Woodpecker, Japanese Green_2019-12-13_0811_Japan_Miyazaki.mp3",
  },
  {
    id: "481370",
    en: "Black-necked Grebe",
    rec: "Hans Groot",
    cnt: "Netherlands",
    url: "//www.xeno-canto.org/481370",
    file: "//www.xeno-canto.org/481370/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:18",
    filename: "XC481370-Geoorde Fuut roep NHD 130517.mp3",
  },
  {
    id: "628793",
    en: "Eurasian Bittern",
    rec: "Albert Subirà",
    cnt: "Spain",
    url: "//www.xeno-canto.org/628793",
    file: "//www.xeno-canto.org/628793/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:04",
    filename: "XC628793-Bitó 210310_h23.05.1.mp3",
  },
  {
    id: "557998",
    en: "Oriental Pratincole",
    rec: "Bram Piot",
    cnt: "Laos",
    url: "//www.xeno-canto.org/557998",
    file: "//www.xeno-canto.org/557998/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:56",
    filename:
      "XC557998-OrientalPratincole_VientianeThatLuang_200506_0794_edited.mp3",
  },
  {
    id: "629278",
    en: "Mallard",
    rec: "Paul Marvin",
    cnt: "United States",
    url: "//www.xeno-canto.org/629278",
    file: "//www.xeno-canto.org/629278/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:07",
    filename:
      "XC629278-Mallard m,f flt -CA, Upper Otay Lk, Mar 14, 2021, 0800 AM.mp3",
  },
];

const Mysterybird = React.forwardRef((props, ref) => {
  const { question, hidden } = props;

  return (
    <>
      <div>{hidden ? "?" : question.en}</div>
      <audio controls ref={ref}>
        <source
          src={`http://localhost:3001/${question.id}.mp3`}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </>
  );
});

const Answers = ({
  keys,
  question,
  answers,
  hidden,
  setHidden,
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
    if (hidden) {
      setHidden(false);
      if (event.type === "keydown") {
        const index = keys.findIndex((key) => key === event.key);
        console.log("index", index);
        console.log("answers", answers);
        console.log("question", question);
        if (answers[index].id === question.id) {
          setPoints(points + 1);
        }
      }
      if (event.target.dataset.id === question.id) {
        console.log("answers", answers);
        console.log("question", question);
        setPoints(points + 1);
      }
    }
  };

  return answers.map((bird) => (
    <button key={bird.id} data-id={bird.id} onClick={handleAnswer}>
      {bird.en}
    </button>
  ));
};

const Quiz = ({ points, setPoints, keys, nextKey }) => {
  const [question, setQuestion] = useState(getQuestion(testBirds));
  const [answers, setAnswers] = useState(null);
  const [hidden, setHidden] = useState(true);

  useHotkeys(nextKey, () => nextQuestion(), {
    keydown: true,
  });

  const audioRef = useRef();

  useEffect(() => {
    if (question) {
      const result = getAnswers(4, question, testBirds);
      setAnswers(result);
    }
  }, [question]);

  const nextQuestion = () => {
    setHidden(true);
    audioRef.current.pause();
    audioRef.current.load();
    const newBird = getQuestion(testBirds);
    setQuestion(newBird);
  };

  const answerProps = {
    answers,
    question,
    hidden,
    setHidden,
    points,
    setPoints,
    keys,
    nextKey,
  };

  return (
    <>
      {question && (
        <Mysterybird question={question} hidden={hidden} ref={audioRef} />
      )}
      {answers && <Answers {...answerProps} />}
      <button onClick={nextQuestion}>Next question</button>
      <div>Points: {points}</div>
    </>
  );
};

export default Quiz;
