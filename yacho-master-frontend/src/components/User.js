import React from "react";
import userHandler from "../services/user";
import answerHandler from "../services/answer";

const User = ({
  user,
  setUser,
  answerHistory,
  setAnswerHistory,
  handleLogout,
}) => {
  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your answer history? You cannot undo this!11"
      )
    ) {
      answerHandler
        .clearAnswers(user)
        .then((result) => {
          setAnswerHistory([]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteUser = () => {
    if (
      window.confirm(
        "ARE YOU SURE YOU WANT TO DELETE YOURSELF??? You cannot undo this!11"
      )
    ) {
      console.log("user.token inside handledelete inside User!", user.token);
      userHandler
        .deleteUser(user)
        .then((result) => {
          handleLogout();
        })
        .catch((error) => console.log(error));
    }
  };
  if (!user || !answerHistory) {
    return null;
  }
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
      <button onClick={handleClearHistory}>
        I am the clear history button
      </button>
      <button onClick={handleDeleteUser}>
        I however am the delete user button
      </button>
    </>
  );
};

export default User;
