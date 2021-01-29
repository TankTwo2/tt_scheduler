import React, { useEffect, useState } from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailIcon from "@material-ui/icons/Mail";
import ViewListIcon from "@material-ui/icons/ViewList";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
// import sendMail from "../hooks/sendMail";
import { Paper, Typography, TextField, Button, Box } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import XLSX from "xlsx";

type FeedBackType = {
  loginEmail: string;
  darkMode: boolean;
};

const useStyles = makeStyles({
  modalPaper: {
    width: 900,
    height: 410,
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: "4px",
    margin: "20vh auto",
    overFlow: "scroll",
    zIndex: 1,
  },
  modalBox: {
    overFlow: "scroll",
  },
  githubStyle: {
    float: "right",
    zoom: 1.3,
    color: "black",
    margin: 5,
    marginLeft: 1,
    cursor: "pointer",
  },
  modalHeader: {
    margin: 15,
  },
  textFieldStyle: {
    width: "95%",
    margin: 10,
  },
  buttonStyle: {
    float: "right",
    marginRight: 10,
  },
  table: {
    minWidth: 650,
  },
});

export default function FeedBack({ loginEmail, darkMode }: FeedBackType) {
  const classes = useStyles();
  const [feedbackModalFlag, setFeedBackModalFlag] = useState<boolean>(false);
  const [feedbackModalFrom, setFeedBackModalFrom] = useState<string>("Local");
  const [feedbackModalText, setFeedBackModalText] = useState<string>("");

  const [devListModalFlag, setDevListModalFlag] = useState<boolean>(false);

  useEffect(() => {
    setFeedBackModalFrom(loginEmail);
  }, [loginEmail]);

  const onModalOpen = async () => {
    chrome.storage.sync.get(null, function (items) {
      let ws = XLSX.utils.json_to_sheet([items]);

      /* add to workbook */
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "tt_scheduler");

      /* generate an XLSX file */
      XLSX.writeFile(wb, `tt_scheduler_${new Date().toISOString()}.xlsx`);
    });
  };

  const onFromChange = (e: any) => {
    setFeedBackModalFrom(e.target.value);
  };

  const onTextFieldChange = (e: any) => {
    setFeedBackModalText(e.target.value);
  };

  const onModalOKButton = () => {
    // sendMail(feedbackModalFrom, feedbackModalText);
    setFeedBackModalFlag(false);
  };

  const onModalCancelButton = () => {
    setFeedBackModalFlag(false);
  };

  const feedbackBodalBody = (
    <>
      <Paper className={classes.modalPaper}>
        <Box className={classes.modalBox}>
          <Typography className={classes.modalHeader} variant={"h6"}>
            tt_scheduler 이용중에 불편사항이나 개선사항, 또는 아이디어가
            있으시면 자유롭게 말씀해 주세요.
          </Typography>
        </Box>
        <br />
        <Box className={classes.modalBox}>
          <TextField
            className={classes.textFieldStyle}
            multiline
            onChange={onFromChange}
            variant="outlined"
            value={feedbackModalFrom}
            placeholder={"Title"}
          />
          <TextField
            className={classes.textFieldStyle}
            multiline
            onChange={onTextFieldChange}
            variant="outlined"
            value={feedbackModalText}
            placeholder={"Contents"}
            rows={8}
          />
        </Box>
        <Box className={classes.modalBox}>
          <Button
            className={classes.buttonStyle}
            color="primary"
            onClick={onModalCancelButton}
          >
            취소
          </Button>
          <Button
            className={classes.buttonStyle}
            color="primary"
            onClick={onModalOKButton}
          >
            보내기
          </Button>
        </Box>
        <br />
      </Paper>
    </>
  );

  const onDevListModalOpen = () => {
    setDevListModalFlag(true);
  };

  const devListData = [
    {
      name: "test name",
      date: "2020. 07. 09",
    },
  ];

  const devListModalBody = (
    <Paper className={classes.modalPaper}>
      <Box className={classes.modalBox}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>개발예정 리스트</TableCell>
              <TableCell>개발 완료 날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devListData.map((row) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );

  return (
    <>
      <Modal
        open={feedbackModalFlag}
        onClose={() => setFeedBackModalFlag(false)}
      >
        {feedbackBodalBody}
      </Modal>
      <Modal open={devListModalFlag} onClose={() => setDevListModalFlag(false)}>
        {devListModalBody}
      </Modal>
      <a
        style={{ color: darkMode ? "white" : "black" }}
        className={classes.githubStyle}
        href={
          "https://github.com/rhkdtjr90/tt_scheduler/graphs/commit-activity"
        }
      >
        <GitHubIcon />
      </a>
      <a
        style={{ color: darkMode ? "white" : "black" }}
        onClick={onModalOpen}
        className={classes.githubStyle}
      >
        <MailIcon />
      </a>
      <a
        style={{ color: darkMode ? "white" : "black" }}
        onClick={onDevListModalOpen}
        className={classes.githubStyle}
      >
        <ViewListIcon />
      </a>
    </>
  );
}
