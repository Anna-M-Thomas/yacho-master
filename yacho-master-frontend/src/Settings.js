import React, { useState } from "react";
import useEventListener from "@use-it/event-listener";

const Settings = ({ keys, setKeys, nextKey, setNextkey }) => {
  const [afterButton, setafterButton] = useState(false);
  const [index, setIndex] = useState(null);

  const handler = (e) => {
    console.log(e.key);
    const newKeys = [...keys];
    //No this is wrong I need true/false
    const inKeysAlready = newKeys.find((item) => item === e.key);
    console.log("inKeysAlready", inKeysAlready);
    if (!inKeysAlready) {
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
