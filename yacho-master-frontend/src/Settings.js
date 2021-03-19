import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";
import keyMap from "./hotkeys-keymap.js";

const Settings = ({ keys, setKeys, nextKey, setNextkey }) => {
  const [afterButton, setafterButton] = useState(false);
  const [index, setIndex] = useState(null);

  console.log("nextKey", nextKey);
  console.log("typeof nextkey", typeof nextKey);

  //hotkeys "right" is not the same as its name, ArrowRight, and it's not the same as charcode agggh
  const handler = (e) => {
    console.log(e.key);
    console.log("nextKey", nextKey);
    const newKeys = [...keys];
    const notinKeys = newKeys.every(
      (item) => item !== e.key && item !== nextKey
    );
    if (notinKeys) {
      newKeys[index] = e.key;
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
