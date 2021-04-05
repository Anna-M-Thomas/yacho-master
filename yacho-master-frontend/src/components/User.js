import React, { useState } from "react";
import userHandler from "../services/user";
import answerHandler from "../services/answer";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Alertmessage from "./Alertmessage";

const User = ({ user, answerHistory, setAnswerHistory, handleLogout }) => {
  const [open, setOpen] = useState(false);

  const handleClearHistory = () => {
    answerHandler
      .clearAnswers(user)
      .then((result) => {
        setAnswerHistory([]);
      })
      .catch((error) => console.log(error));
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
      <div>I am user page here is user {user.username}</div>
      <Alertmessage
        open={open}
        setOpen={setOpen}
        title="Delete the thing?"
        onConfirm={handleClearHistory}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bird name</TableCell>
              <TableCell>Answered right</TableCell>
              <TableCell>Answered wrong</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answerHistory.map((answer) => (
              <TableRow key={answer.id}>
                <TableCell>{answer.nameEn}</TableCell>
                <TableCell>{answer.right}</TableCell>
                <TableCell>{answer.wrong}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button onClick={() => setOpen(true)}>
        I am the clear history button
      </Button>
      <Button onClick={handleDeleteUser}>
        I however am the delete user button
      </Button>
    </>
  );
};

export default User;
