import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getQuestion, getAnswers } from "./helperfunctions.js";

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

const Mysterybird = ({ question }) => {
  return <div>{question.en}</div>;
};

const Answers = ({ answers }) => {
  return answers.forEach((bird) => <div>Howdy</div>);
};

const Quiz = () => {
  const [question, setQuestion] = useState(getQuestion(testBirds));
  const [answers, setAnswers] = useState(null);

  //   const getAnswers = (length, question, array) => {
  //     let returnArray = [question];
  //     while (returnArray.length < length) {
  //       const randomIndex = Math.floor(Math.random() * array.length);
  //       const candidate = array[randomIndex];
  //       const success = returnArray.every((item) => item.id !== candidate.id);
  //       if (success) {
  //         returnArray.push(candidate);
  //       }
  //     }
  //     return shuffle(returnArray);
  //   };

  useEffect(() => {
    //why is this returning as null from getAnswers? something's wrong with shuffle
    const result = getAnswers((4, question, testBirds));
    console.log("result in useEffect", result);
    setAnswers(getAnswers(4, question, testBirds));
  }, []);

  return (
    <>
      <Mysterybird question={question} />
    </>
  );
};

export default Quiz;
