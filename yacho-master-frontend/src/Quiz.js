import React, { useState, useEffect, useRef } from "react";
import { getQuestion, getAnswers } from "./helperfunctions.js";
import songHandler from "./services/songs";
import { useHotkeys } from "react-hotkeys-hook";

const testBirds = [
  {
    id: "527210",
    en: "Japanese Quail",
    jp: "ウズラ",
    rec: "James Lidster",
    cnt: "Mongolia",
    url: "//www.xeno-canto.org/527210",
    file: "//www.xeno-canto.org/527210/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:43",
    filename: "XC527210-Japanese Quail Orog Nuur 170526 0340.mp3",
  },
  {
    id: "545719",
    en: "Eurasian Wigeon",
    jp: "ヒドリガモ",
    rec: "Joachim Pintens",
    cnt: "Belgium",
    url: "//www.xeno-canto.org/545719",
    file: "//www.xeno-canto.org/545719/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:08",
    filename: "XC545719-Smient-05u33.mp3",
  },
  {
    id: "625125",
    en: "Great Crested Grebe",
    jp: "カンムリカイツブリ",
    rec: "Albert Noorlander",
    cnt: "Netherlands",
    url: "//www.xeno-canto.org/625125",
    file: "//www.xeno-canto.org/625125/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:13",
    filename: "XC625125-Fuut 20210228-02a.mp3",
  },
  {
    id: "488083",
    en: "Harlequin Duck",
    jp: "シノリガモ",
    rec: "Stanislas Wroza",
    cnt: "Iceland",
    url: "//www.xeno-canto.org/488083",
    file: "//www.xeno-canto.org/488083/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:43",
    filename:
      "XC488083-2018-07-28 Myvatn - Laxa river 180728 Arlequin plongeur cris sociaux (8).mp3",
  },
  {
    id: "354607",
    en: "Red-necked Grebe",
    jp: "アカエリカイツブリ",
    rec: "Thomas Magarian",
    cnt: "United States",
    url: "//www.xeno-canto.org/354607",
    file: "//www.xeno-canto.org/354607/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:03",
    filename: "XC354607-RNGR_04-10-2016_Dog_Gun_Lake_MT_1724.mp3",
  },
  {
    id: "628833",
    en: "Eastern Spot-billed Duck",
    jp: "カルガモ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/628833",
    file: "//www.xeno-canto.org/628833/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:11",
    filename: "XC628833-karugamo_c_wingbeat_210309_sub.mp3",
  },
  {
    id: "611565",
    en: "Taiga Bean Goose",
    jp: "ヒシクイ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/611565",
    file: "//www.xeno-canto.org/611565/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:19",
    filename: "XC611565-oohishikui_201229_sub.mp3",
  },
  {
    id: "528783",
    en: "Steller's Sea Eagle",
    jp: "オオワシ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/528783",
    file: "//www.xeno-canto.org/528783/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:13",
    filename: "XC528783-oowashi_200220_sub.mp3",
  },
  {
    id: "492050",
    en: "Red-necked Stint",
    jp: "トウネン",
    rec: "Philippe J. DUBOIS",
    cnt: "Mongolia",
    url: "//www.xeno-canto.org/492050",
    file: "//www.xeno-canto.org/492050/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:05",
    filename:
      "XC492050-BEC à cou roux (cris plus roulés) - Dawst Nuur, Mongolie - 2019.07.07.18.mp3",
  },
  {
    id: "623530",
    en: "Ural Owl",
    jp: "フクロウ",
    rec: "András Schmidt",
    cnt: "Hungary",
    url: "//www.xeno-canto.org/623530",
    file: "//www.xeno-canto.org/623530/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:33",
    filename: "XC623530-STRURA190323a (online-audio-converter.com).mp3",
  },
  {
    id: "571300",
    en: "Red-breasted Merganser",
    jp: "ウミアイサ",
    rec: "Hans Norelius",
    cnt: "Sweden",
    url: "//www.xeno-canto.org/571300",
    file: "//www.xeno-canto.org/571300/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:40",
    filename: "XC571300-SmåskrakeL_Luspebryggan_Juni2020_200613-080719.mp3",
  },
  {
    id: "305900",
    en: "Copper Pheasant",
    jp: "ヤマドリ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/305900",
    file: "//www.xeno-canto.org/305900/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:16",
    filename: "XC305900-yamadori_flight_160305_sub.mp3",
  },
  {
    id: "629238",
    en: "Common Pheasant",
    jp: "キジ",
    rec: "Albert Noorlander",
    cnt: "Netherlands",
    url: "//www.xeno-canto.org/629238",
    file: "//www.xeno-canto.org/629238/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:56",
    filename: "XC629238-Fazant 20210315-01a.mp3",
  },
  {
    id: "486622",
    en: "Black Scoter",
    jp: "クロガモ",
    rec: "Jens Kirkeby",
    cnt: "Russian Federation",
    url: "//www.xeno-canto.org/486622",
    file: "//www.xeno-canto.org/486622/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "1:09",
    filename: "XC486622-190618-691 Black Scoter americana.mp3",
  },
  {
    id: "627619",
    en: "Whooper Swan",
    jp: "オオハクチョウ",
    rec: "Karol Kustusch",
    cnt: "Poland",
    url: "//www.xeno-canto.org/627619",
    file: "//www.xeno-canto.org/627619/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:24",
    filename: "XC627619-Cygnus cygnus1.mp3",
  },
  {
    id: "466620",
    en: "Grey-streaked Flycatcher",
    jp: "エゾビタキ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/466620",
    file: "//www.xeno-canto.org/466620/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "4:57",
    filename: "XC466620-ezobitaki_beg_190413b_sub.mp3",
  },
  {
    id: "611841",
    en: "White-cheeked Starling",
    jp: "ムクドリ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/611841",
    file: "//www.xeno-canto.org/611841/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:04",
    filename: "XC611841-muku_201227a_sub.mp3",
  },
  {
    id: "506989",
    en: "Japanese Robin",
    jp: "コマドリ",
    rec: "Markus Jacobs",
    cnt: "Japan",
    url: "//www.xeno-canto.org/506989",
    file: "//www.xeno-canto.org/506989/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:51",
    filename: "XC506989-190523_0708.mp3",
  },
  {
    id: "622920",
    en: "Pacific Golden Plover",
    jp: "ムナグロ",
    rec: "Jens Kirkeby",
    cnt: "Russian Federation",
    url: "//www.xeno-canto.org/622920",
    file: "//www.xeno-canto.org/622920/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:21",
    filename: "XC622920-170614_0111 Tundrahjejle red.mp3",
  },
  {
    id: "468191",
    en: "Oriental Scops Owl",
    jp: "コノハズク",
    rec: "jelly bean",
    cnt: "China",
    url: "//www.xeno-canto.org/468191",
    file: "//www.xeno-canto.org/468191/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:12",
    filename: "XC468191-0.mp3",
  },
  {
    id: "612331",
    en: "Glaucous-winged Gull",
    jp: "ワシカモメ",
    rec: "Peter Ward and Ken Hall",
    cnt: "United States",
    url: "//www.xeno-canto.org/612331",
    file: "//www.xeno-canto.org/612331/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:27",
    filename: "XC612331-Glaucous winged Gull.mp3",
  },
  {
    id: "622675",
    en: "Tundra Swan",
    jp: "コハクチョウ",
    rec: "Arjun Dutta",
    cnt: "United Kingdom",
    url: "//www.xeno-canto.org/622675",
    file: "//www.xeno-canto.org/622675/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:21",
    filename: "XC622675-Bewick Swan.mp3",
  },
  {
    id: "581448",
    en: "Streaked Shearwater",
    jp: "オオミズナギドリ",
    rec: "xuky",
    cnt: "China",
    url: "//www.xeno-canto.org/581448",
    file: "//www.xeno-canto.org/581448/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:10",
    filename: "XC581448-Streaked Shearwater-two-fight-sound.mp3",
  },
  {
    id: "488222",
    en: "Latham's Snipe",
    jp: "オオジシギ",
    rec: "Amar-Singh HSS",
    cnt: "Japan",
    url: "//www.xeno-canto.org/488222",
    file: "//www.xeno-canto.org/488222/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:12",
    filename:
      "XC488222-Latham's Snipe-calls-1-3-Xeno-ground-East Hokkaido, Japan-11th June 2019.mp3",
  },
  {
    id: "569658",
    en: "Ruddy-breasted Crake",
    jp: "ヒクイナ",
    rec: "PT xiao",
    cnt: "China",
    url: "//www.xeno-canto.org/569658",
    file: "//www.xeno-canto.org/569658/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "3:04",
    filename: "XC569658- - 20200611 - OFP.mp3",
  },
  {
    id: "206311",
    en: "Greater Painted-snipe",
    jp: "タマシギ",
    rec: "Sung Ming Chen",
    cnt: "Taiwan",
    url: "//www.xeno-canto.org/206311",
    file: "//www.xeno-canto.org/206311/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:18",
    filename: "XC206311-131012_04_Greater Painted-snipe雛鳥.mp3",
  },
  {
    id: "531106",
    en: "Common Goldeneye",
    jp: "ホオジロガモ",
    rec: "Jarek Matusiak",
    cnt: "Germany",
    url: "//www.xeno-canto.org/531106",
    file: "//www.xeno-canto.org/531106/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:17",
    filename: "XC531106-MixPre-135 (2) gągoł skrzydła.mp3",
  },
  {
    id: "624604",
    en: "Peregrine Falcon",
    jp: "ハヤブサ",
    rec: "Sławomir Karpicki-Ignatowski",
    cnt: "Poland",
    url: "//www.xeno-canto.org/624604",
    file: "//www.xeno-canto.org/624604/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:55",
    filename: "XC624604-20210226_0632 peregrinus samica.mp3",
  },
  {
    id: "622701",
    en: "Great Cormorant",
    jp: "カワウ",
    rec: "Jarek Matusiak",
    cnt: "Poland",
    url: "//www.xeno-canto.org/622701",
    file: "//www.xeno-canto.org/622701/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:03",
    filename: "XC622701-JAREK-MATUSIAK-A-1151ed (2) kormoran (2).mp3",
  },
  {
    id: "560515",
    en: "Japanese Paradise Flycatcher",
    jp: "サンコウチョウ",
    rec: "Anon Torimi",
    cnt: "Japan",
    url: "//www.xeno-canto.org/560515",
    file: "//www.xeno-canto.org/560515/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "1:25",
    filename: "XC560515-sankouchou_s_200522_sub.mp3",
  },
  {
    id: "572077",
    en: "Lesser Cuckoo",
    jp: "ホトトギス",
    rec: "Byoungsoon Jang",
    cnt: "South Korea",
    url: "//www.xeno-canto.org/572077",
    file: "//www.xeno-canto.org/572077/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:02",
    filename: "XC572077-200627_6.47(lesser cuckoo).mp3",
  },
  {
    id: "624545",
    en: "Crested Serpent Eagle",
    jp: "カンムリワシ",
    rec: "Jerome Chie-Jen Ko",
    cnt: "Taiwan",
    url: "//www.xeno-canto.org/624545",
    file: "//www.xeno-canto.org/624545/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "1:04",
    filename: "XC624545-036-068_08-adjust.mp3",
  },
  {
    id: "486606",
    en: "Pacific Loon",
    jp: "シロエリオオハム",
    rec: "Jens Kirkeby",
    cnt: "Russian Federation",
    url: "//www.xeno-canto.org/486606",
    file: "//www.xeno-canto.org/486606/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "2:28",
    filename: "XC486606-MIXPRE-683 Pacific Diver.mp3",
  },
  {
    id: "308323",
    en: "Common Emerald Dove",
    jp: "キンバト",
    rec: "Greg Irving",
    cnt: "Thailand",
    url: "//www.xeno-canto.org/308323",
    file: "//www.xeno-canto.org/308323/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:49",
    filename:
      "XC308323-066 Dove - Emerald (Chalcophaps indica indica) Song MAR 0930 110m KhlongSaengTH_GI_0745.mp3",
  },
  {
    id: "628971",
    en: "Eurasian Oystercatcher",
    jp: "ミヤコドリ",
    rec: "Lennart Haak",
    cnt: "Germany",
    url: "//www.xeno-canto.org/628971",
    file: "//www.xeno-canto.org/628971/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:19",
    filename: "XC628971-Austernfischer_flightcall.mp3",
  },
  {
    id: "574122",
    en: "Terek Sandpiper",
    jp: "ソリハシシギ",
    rec: "Benoit Paepegaey",
    cnt: "France",
    url: "//www.xeno-canto.org/574122",
    file: "//www.xeno-canto.org/574122/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:03",
    filename: "XC574122-2020-07-02-4h44-bargette.mp3",
  },
  {
    id: "622864",
    en: "Western Yellow Wagtail",
    jp: "ツメナガセキレイ",
    rec: "Grzegorz Lorek",
    cnt: "Poland",
    url: "//www.xeno-canto.org/622864",
    file: "//www.xeno-canto.org/622864/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:17",
    filename: "XC622864-rydzyna4.bez nazwy.mp3",
  },
  {
    id: "578819",
    en: "Ryukyu Robin",
    jp: "アカヒゲ",
    rec: "Okamoto Keita Sin",
    cnt: "Japan",
    url: "//www.xeno-canto.org/578819",
    file: "//www.xeno-canto.org/578819/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "1:48",
    filename: "XC578819-Robin, Ryukyu_2019-12-17_0827_Japan_Okinawa.mp3",
  },
  {
    id: "423260",
    en: "Sunda Scops Owl",
    jp: "オオコノハズク",
    rec: "Hans Groot",
    cnt: "Malaysia",
    url: "//www.xeno-canto.org/423260",
    file: "//www.xeno-canto.org/423260/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:47",
    filename: "XC423260-Sunda en Reddish Scops Owl 170218 Sepilok.mp3",
  },
  {
    id: "463834",
    en: "White-browed Laughingthrush",
    jp: "カオジロガビチョウ",
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
    jp: "ハシビロガモ",
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
    jp: "コルリ",
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
    jp: "キセキレイ",
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
    jp: "カワセミ",
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
    jp: "アオゲラ",
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
    jp: "ハジロカイツブリ",
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
    jp: "サンカノゴイ",
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
    jp: "ツバメチドリ",
    rec: "Bram Piot",
    cnt: "Laos",
    url: "//www.xeno-canto.org/557998",
    file: "//www.xeno-canto.org/557998/download",
    lic: "//creativecommons.org/licenses/by-nc-sa/4.0/",
    length: "0:56",
    filename:
      "XC557998-OrientalPratincole_VientianeThatLuang_200506_0794_edited.mp3",
  },
];

const Mysterybird = React.forwardRef((props, ref) => {
  const { question, hidden } = props;

  // src={`http://localhost:3001/${question.id}.mp3`}

  return (
    <>
      <div>{hidden ? "?" : `${question.en} ${question.jp}`}</div>
      <audio controls ref={ref}>
        <source src={question.file} type="audio/mpeg" />
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
        if (answers[index].id === question.id) {
          setPoints(points + 1);
        }
      }
      if (event.target.dataset.id === question.id) {
        setPoints(points + 1);
      }
    }
  };

  return answers.map((bird, index) => (
    <button key={bird.id} data-id={bird.id} onClick={handleAnswer}>
      {bird.en} {bird.jp} ({keys[index]})
    </button>
  ));
};

const Quiz = ({ points, setPoints, keys, nextKey, play, choices }) => {
  const [question, setQuestion] = useState(getQuestion(testBirds));
  const [answers, setAnswers] = useState(null);
  const [hidden, setHidden] = useState(true);

  useHotkeys(nextKey, () => nextQuestion(), {
    keydown: true,
  });

  useHotkeys(play, () => handlePlayButton(), {
    keydown: true,
  });

  const audioRef = useRef();

  useEffect(() => {
    if (question) {
      const result = getAnswers(choices, question, testBirds);
      setAnswers(result);
    }
  }, [question]);

  const handlePlayButton = () => {
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();
  };

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
      <button onClick={nextQuestion}>Next question {nextKey}</button>
      <div>Points: {points}</div>
      <div>Play audio: {play}</div>
    </>
  );
};

export default Quiz;
