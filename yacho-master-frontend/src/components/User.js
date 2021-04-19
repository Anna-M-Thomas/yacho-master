import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  root: {
    margin: "2%",
  },
});

const User = ({ user, answerHistory, setAnswerHistory, handleLogout }) => {
  const [clearHistoryOpen, setClearHistoryOpen] = useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const { t, i18n, ready } = useTranslation();
  const classes = useStyles();
  const currentLang = i18n.language;

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

  if (!user || !answerHistory || !ready) {
    return null;
  }

  return (
    <main>
      <div>
        {t("user.answerhistory")} {user.username}
      </div>{" "}
      <Button
        variant="contained"
        onClick={() => handleLogout()}
        className={classes.root}
      >
        {t("user.logout")}
      </Button>
      <Confirmdialog
        open={clearHistoryOpen}
        setOpen={setClearHistoryOpen}
        title={t("user.deleteanswer?")}
        onConfirm={handleClearHistory}
      />
      <Confirmdialog
        open={deleteUserOpen}
        setOpen={setDeleteUserOpen}
        title={t("user.deleteuser?")}
        onConfirm={handleDeleteUser}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("user.birdname")}</TableCell>
              <TableCell>{t("user.answeredright")}</TableCell>
              <TableCell>{t("user.answeredwrong")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answerHistory.map((answer) => (
              <TableRow key={answer.id}>
                <TableCell>
                  {currentLang === "en" ? answer.nameEn : answer.nameJp}
                </TableCell>
                <TableCell>{answer.right}</TableCell>
                <TableCell>{answer.wrong}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => setClearHistoryOpen(true)}
        variant="contained"
        className={classes.root}
      >
        {t("user.clearhistory")}
      </Button>
      <Button
        onClick={() => setDeleteUserOpen(true)}
        variant="contained"
        className={classes.root}
      >
        {t("user.deleteuser")}
      </Button>
    </main>
  );
};

export default User;
