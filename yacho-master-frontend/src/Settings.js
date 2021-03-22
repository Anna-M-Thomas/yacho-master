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

  const inOtherKeys = (newKey, ...keys) => {
    const otherKeys = [...keys];
    console.log("Other keys", otherKeys);
    console.log("New key", newKey);
    return keys.some((item) => item === newKey);
  };

  const resetButtons = () => {
    setafterkeysButton(false);
    setafternextButton(false);
    setafterplayButton(false);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.remove("clicked"));
  };

  const keydownHandler = (e) => {
    const key = e.keyCode || e.which || e.charCode;

    if (!keysOK(key)) {
      resetButtons();
      return;
    }

    let keyName = keyMap[key] || e.key.toLowerCase();

    if (inOtherKeys(keyName, ...keys, nextKey, play)) {
      console.log(`${keyName} is already being used`);
      resetButtons();
      return;
    }

    //There's so much repetition here, how do I simplify this?
    //Feed everything else into an array
    //Feed iterated array and others into helper function which returns true/false
    if (afterkeysButton === true) {
      // const notinKeys = keys.every((item) => item !== keyName);
      // const notInOtherKeys = nextKey !== keyName && play !== keyName;
      // if (notinKeys && notInOtherKeys) {
      let newKeys = [...keys];
      newKeys[index] = keyName;
      setKeys(newKeys);
      setIndex(null);
      // } else console.log(`${keyName} is already being used`);
    }

    if (afternextButton === true) {
      // const notinKeys = keys.every((item) => item !== keyName);
      // const notInOtherKeys = play !== keyName;
      // if (notinKeys && notInOtherKeys) {
      setNextkey(keyName);
      //   } else console.log(`${keyName} is already being used`);
      // }
    }

    if (afterplayButton === true) {
      // const notinKeys = keys.every((item) => item !== keyName);
      // const notInOtherKeys = nextKey !== keyName;
      // if (notinKeys && notInOtherKeys) {
      setPlay(keyName);
      // } else console.log(`${keyName} is already being used`);
    }
  };

  useEventListener("keydown", keydownHandler);

  const handlekeysClick = (e) => {
    e.target.classList.add("clicked");
    //it has to be index, # of choices will change
    setIndex(e.target.dataset.index);
    setafterkeysButton(true);
  };

  const handleNextClick = (e) => {
    e.target.classList.add("clicked");
    setafternextButton(true);
  };

  const handlePlayClick = (e) => {
    e.target.classList.add("clicked");
    setafterplayButton(true);
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
        <button onClick={handleNextClick}>{nextKey}</button>
      </div>
      <div>
        Play button
        <button onClick={handlePlayClick}>{play}</button>
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
