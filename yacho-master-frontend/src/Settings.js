import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import keyMap from "./hotkeys-keymap.js";

const Settings = ({ keys, setKeys, nextKey, setNextkey }) => {
  const [afterButton, setafterButton] = useState(false);
  const [index, setIndex] = useState(null);

  //both inclusive
  const inRange = (min, max, number) => {
    return number >= min && number <= max;
  };

  //hotkeys "right" is not the same as its name, ArrowRight, and it's not the same as charcode agggh
  const handler = (e) => {
    if (!afterButton) {
      return;
    }

    const key = e.keyCode || e.which || e.charCode;

    const alphabetOrNumber =
      inRange(65, 90, key) || inRange(97, 122, key) || inRange(48, 57, key);

    const inHotKeysSpecial = keyMap.hasOwnProperty(key);

    if (!alphabetOrNumber && !inHotKeysSpecial) {
      return;
    }

    const keyName = keyMap[key] || e.key;
    const notinKeys = keys.every((item) => item !== keyName);
    const notInOtherKeys = nextKey !== keyName;
    if (notinKeys && notInOtherKeys) {
      let newKeys = [...keys];
      newKeys[index] = keyName;
      setKeys(newKeys);
      setIndex(null);
      setafterButton(false);
    }
  };

  useEventListener("keydown", handler);

  const handlekeysClick = (e) => {
    //it has to be index, # of choices will change
    console.log("The innnnndex", e.target.dataset.index);
    setIndex(e.target.dataset.index);
    setafterButton(true);
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
    </div>
  );
};

export default Settings;
