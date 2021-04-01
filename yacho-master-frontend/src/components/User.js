import React from "react";

const User = ({ user, answerHistory, setAnswerHistory }) => {
  const handleClick = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your answer history? You cannot undo this!11"
      )
    ) {
      setAnswerHistory([]);
    }
  };
  return (
    <>
      <h1>User!</h1>
      <div>
        I am user page here is user {user.username} Uhh here is your answer
        history
        {answerHistory.map((answer) => (
          <div key={answer.id}>
            {answer.nameEn} {answer.nameJp}, right: {answer.right} wrong:{" "}
            {answer.wrong}
          </div>
        ))}
      </div>
      <button onClick={handleClick}>I am the clear history button</button>
    </>
  );
};

export default User;
