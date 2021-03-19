import React from "react";

const Settings = ({ keys, setKeys, nextKey, setNextkey }) => {
  return (
    <div>
      <h1>Options</h1>
      {keys.map((item, index) => (
        <div key={item.charAt(0)}>
          Answer {index + 1} <button>{item}</button>
        </div>
      ))}
    </div>
  );
};

export default Settings;
