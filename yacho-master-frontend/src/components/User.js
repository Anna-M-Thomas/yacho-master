import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
import Confirmdialog from "./Confirmdialog";

const User = ({ user, answerHistory, setAnswerHistory, handleLogout }) => {
  const [clearHistoryOpen, setClearHistoryOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);

  const handleClearHistory = () => {
    setClearHistoryOpen(false);
    answerHandler
      .clearAnswers(user)
      .then((result) => {
        setAnswerHistory([]);
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteUser = () => {
    setDeleteUserOpen(false);
    console.log("user.token inside handledelete inside User!", user.token);
    userHandler
      .deleteUser(user)
      .then((result) => {
        handleLogout();
      })
      .catch((error) => console.log(error));
  };

  if (!user || !answerHistory) {
    return null;
  }
  return (
    <>
      <h1>User!</h1>
      <div>I am user page here is user {user.username}</div>{" "}
      <Button variant="contained" onClick={() => handleLogout()}>
        logout
      </Button>
      <Confirmdialog
        open={clearHistoryOpen}
        setOpen={setClearHistoryOpen}
        title="Delete answer history?"
        onConfirm={handleClearHistory}
      />
      <Confirmdialog
        open={deleteUserOpen}
        setOpen={setDeleteUserOpen}
        title="Delete user?"
        onConfirm={handleDeleteUser}
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
      <Button onClick={() => setClearHistoryOpen(true)}>
        I am the clear history button
      </Button>
      <Button onClick={() => setDeleteUserOpen(true)}>
        I however am the delete user button
      </Button>
    </>
  );
};

export default User;
