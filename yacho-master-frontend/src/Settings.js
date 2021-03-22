import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import keyMap from "./hotkeys-keymap.js";

const Settings = ({
  keys,
  setKeys,
  nextKey,
  setNextkey,
  play,
  setPlay,
  choices,
  setChoices,
}) => {
  const [afterkeysButton, setafterkeysButton] = useState(false);
  const [afternextButton, setafternextButton] = useState(false);
  const [afterplayButton, setafterplayButton] = useState(false);
  const [index, setIndex] = useState(null);

  //both inclusive
  const inRange = (min, max, number) => {
    return number >= min && number <= max;
  };

  //Exclude all other keys besides alphabet, #s, in hotkeys keymap
  const keysOK = (key) => {
    const alphabetOrNumber =
      inRange(65, 90, key) || inRange(97, 122, key) || inRange(48, 57, key);

    const inHotKeysSpecial = keyMap.hasOwnProperty(key);
    return alphabetOrNumber || inHotKeysSpecial;
  };

  const keydownHandler = (e) => {
    console.log("event!");

    const key = e.keyCode || e.which || e.charCode;

    if (!keysOK(key)) {
      console.log("NOPE FAILLLL");
      return;
    }

    let keyName = keyMap[key] || e.key.toLowerCase();

    if (afterkeysButton === true) {
      const notinKeys = keys.every((item) => item !== keyName);
      const notInOtherKeys = nextKey !== keyName && play !== keyName;
      if (notinKeys && notInOtherKeys) {
        let newKeys = [...keys];
        newKeys[index] = keyName;
        setKeys(newKeys);
        setIndex(null);
      } else console.log(`${keyName}is already being used`);
    }
    if (afternextButton === true) {
      console.log("inside after next button");
      const notinKeys = keys.every((item) => item !== keyName);
      const notInOtherKeys = play !== keyName;
      if (notinKeys && notInOtherKeys) {
        setNextkey(keyName);
      } else console.log(`${keyName}is already being used`);
    }

    if (afterplayButton === true) {
      console.log("inside after play button");
      const notinKeys = keys.every((item) => item !== keyName);
      const notInOtherKeys = nextKey !== keyName;
      if (notinKeys && notInOtherKeys) {
        setPlay(keyName);
      } else console.log(`${keyName}is already being used`);
    }
    setafterkeysButton(false);
    setafternextButton(false);
    setafterplayButton(false);
  };

  useEventListener("keydown", keydownHandler);

  const handlekeysClick = (e) => {
    //it has to be index, # of choices will change
    console.log("The index", e.target.dataset.index);
    setIndex(e.target.dataset.index);
    setafterkeysButton(true);
  };

  const handleChoicesChange = (event) => {
    setChoices(event.target.value);
    const defaultKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
    const newKeys = defaultKeys.slice(0, event.target.value);
    setKeys(newKeys);
  };

  return (
    <div>
      <h1>Options</h1>
      {keys.map((item, index) => (
        <div key={item.charAt(0)}>
          Answer {index + 1}{" "}
          <button data-index={index} onClick={handlekeysClick}>
            {item}
          </button>
        </div>
      ))}
      <div>
        Next button
        <button onClick={() => setafternextButton(true)}>{nextKey}</button>
      </div>
      <div>
        Play button
        <button onClick={() => setafterplayButton(true)}>{play}</button>
      </div>
      <div>
        {" "}
        Number of choices {choices}
        <input
          type="range"
          value={choices}
          onChange={handleChoicesChange}
          id="choices"
          name="answerChoices"
          min="2"
          max="8"
        />
      </div>
    </div>
  );
};

export default Settings;
