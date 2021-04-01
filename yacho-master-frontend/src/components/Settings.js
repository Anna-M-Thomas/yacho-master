import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import keyMap from "../hotkeys-keymap.js";

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
  const [settingNow, setSettingNow] = useState(null);
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

  const inOtherKeys = (newKey, ...keys) => keys.some((item) => item === newKey);

  const resetButtons = () => {
    setSettingNow(null);
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => button.classList.remove("clicked"));
  };

  const keydownHandler = (e) => {
    if (settingNow) {
      const key = e.keyCode || e.which || e.charCode;

      if (!keysOK(key)) {
        resetButtons();
        return;
      }

      const keyName = keyMap[key] || e.key.toLowerCase();

      if (inOtherKeys(keyName, ...keys, nextKey, play)) {
        console.log(`Sorry, ${keyName} is already being used`);
        resetButtons();
        return;
      }

      switch (settingNow) {
        case "keys":
          let newKeys = [...keys];
          newKeys[index] = keyName;
          setKeys(newKeys);
          setIndex(null);
          break;
        case "next":
          setNextkey(keyName);
          break;
        case "play":
          setPlay(keyName);
          break;
        default:
          break;
      }
      resetButtons();
    }
  };

  useEventListener("keydown", keydownHandler);

  const handleClick = (e) => {
    e.target.classList.add("clicked");
    if (e.target.dataset.index) {
      setIndex(e.target.dataset.index);
    }
    setSettingNow(e.target.dataset.category);
  };

  const handleChoicesChange = (event) => {
    setChoices(event.target.value);
    const defaultKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
    const newKeys = defaultKeys.slice(0, event.target.value);
    setKeys(newKeys);
  };

  return (
    <div>
      <h1>Settings</h1>
      {keys.map((item, index) => (
        <div key={item.charAt(0)}>
          Answer {index + 1}{" "}
          <button data-index={index} data-category="keys" onClick={handleClick}>
            {item}
          </button>
        </div>
      ))}
      <div>
        Next button
        <button data-category="next" onClick={handleClick}>
          {nextKey}
        </button>
      </div>
      <div>
        Play button
        <button data-category="play" onClick={handleClick}>
          {play}
        </button>
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
