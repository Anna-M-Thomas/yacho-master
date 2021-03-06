import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import { useTranslation } from "react-i18next";
import keyMap from "../hotkeys-keymap.js";
import Button from "@material-ui/core/Button";

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
  const { t, ready } = useTranslation();
  const [settingNow, setSettingNow] = useState(null);
  const [index, setIndex] = useState(null);

  const defaultKeys = ["1", "2", "3", "4", "5", "6", "7", "8"];

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

  const resetValues = () => {
    setChoices(8);
    setKeys(defaultKeys);
    setNextkey("right");
    setPlay("space");
    window.localStorage.removeItem("keys");
    window.localStorage.removeItem("choices");
    window.localStorage.removeItem("next");
    window.localStorage.removeItem("play");
  };

  const keydownHandler = (e) => {
    if (settingNow) {
      const key = e.keyCode || e.which || e.charCode;

      if (!keysOK(key)) {
        return;
      }

      const keyName = keyMap[key] || e.key.toLowerCase();

      if (inOtherKeys(keyName, ...keys, nextKey, play)) {
        console.log(`Sorry, ${keyName} is already being used`);
        return;
      }

      switch (settingNow) {
        case "keys":
          let newKeys = [...keys];
          newKeys[index] = keyName;
          setKeys(newKeys);
          window.localStorage.setItem("keys", JSON.stringify(newKeys));
          setIndex(null);
          break;
        case "next":
          setNextkey(keyName);
          window.localStorage.setItem("next", JSON.stringify(keyName));
          break;
        case "play":
          setPlay(keyName);
          window.localStorage.setItem("play", JSON.stringify(keyName));
          break;
        default:
          break;
      }
    }
  };

  useEventListener("keydown", keydownHandler);

  const handleClick = (e) => {
    if (e.currentTarget.dataset.index) {
      setIndex(e.currentTarget.dataset.index);
    }
    setSettingNow(e.currentTarget.dataset.category);
  };

  const handleChoicesChange = (event) => {
    setChoices(event.target.value);
    let keysToAdd = defaultKeys.filter((key) => {
      return keys.every((item) => item !== key);
    });
    let newKeys = [...keys, ...keysToAdd];
    newKeys.length = event.target.value;
    setKeys(newKeys);
    window.localStorage.setItem("choices", JSON.stringify(event.target.value));
    window.localStorage.setItem("keys", JSON.stringify(newKeys));
  };

  if (!ready) {
    return null;
  }

  return (
    <main>
      <div id="keysDiv">
        {keys.map((item, index) => (
          <div key={item.charAt(0)}>
            {t("settings.answer")} {index + 1}{" "}
            <Button
              variant="outlined"
              data-index={index}
              data-category="keys"
              onClick={handleClick}
            >
              {item}
            </Button>
          </div>
        ))}
      </div>
      <div>
        {t("settings.nextbutton")}
        <Button data-category="next" variant="outlined" onClick={handleClick}>
          {nextKey}
        </Button>
      </div>
      <div>
        {t("settings.playbutton")}
        <Button data-category="play" variant="outlined" onClick={handleClick}>
          {play}
        </Button>
      </div>
      <div>
        {t("settings.numberofchoices")} {choices}
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
      <Button variant="contained" color="secondary" onClick={resetValues}>
        {t("settings.resetallvalues")}
      </Button>
    </main>
  );
};

export default Settings;
