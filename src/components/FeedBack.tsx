import React, {useCallback, useState} from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import {makeStyles} from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import sendMail from "../hooks/sendMail";
import {Paper, Typography, TextField, Button, Box} from "@material-ui/core";

const useStyles = makeStyles({
  modalPaper: {
    width: 900,
    height: 410,
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '4px',
    margin: '20vh auto',
    overFlow: 'scroll',
    zIndex: 1
  },
  modalBox: {
    overFlow: 'scroll'
  },
  githubStyle: {
    float: 'right',
    zoom: 1.3,
    color: 'white',
    margin: 5,
    marginLeft: 1
  },
  modalHeader: {
    margin: 15
  },
  textFieldStyle: {
    width: '95%',
    margin: 10
  },
  buttonStyle: {
    float: 'right',
    marginRight: 10
  }
});

export default function FeedBack() {
  const classes = useStyles();
  const [modalFlag, setModalFlag] = useState<boolean>(false);
  const [modalFrom, setModalFrom] = useState<string>('');
  const [modalText, setModalText] = useState<string>('');

  const onModalOpen = () => {
    setModalFlag(true);
  };

  const onFromChange = (e:any) => {
    setModalFrom(e.target.value);
  };

  const onTextFieldChange = (e:any) => {
    setModalText(e.target.value);
  };

  const onModalOKButton = () => {
    sendMail(modalFrom, modalText);
    setModalFlag(false);
  };

  const onModalCancelButton = () => {
    setModalFlag(false);
  };


  const modalBody = (
    <>
      <Paper className={classes.modalPaper}>
        <Box className={classes.modalBox}>
          <Typography className={classes.modalHeader} variant={"h6"}>
            tt_scheduler 이용중에 불편사항이나 개선사항, 또는 아이디어가 있으시면 자유롭게 말씀해 주세요.
          </Typography>
        </Box>
        <br />
        <Box className={classes.modalBox}>
          <TextField
            className={classes.textFieldStyle} multiline onChange={onFromChange}
            variant="outlined" value={modalFrom} placeholder={'Title'}
          />
          <TextField
            className={classes.textFieldStyle} multiline onChange={onTextFieldChange}
            variant="outlined" value={modalText} placeholder={'Contents'} rows={8}
          />
        </Box>
        <Box className={classes.modalBox}>
          <Button className={classes.buttonStyle} color="primary" onClick={onModalCancelButton}>취소</Button>
          <Button className={classes.buttonStyle} color="primary" onClick={onModalOKButton}>보내기</Button>
        </Box>
        <br />

      </Paper>
    </>
  );

  return(
    <>
      <Modal
        open={modalFlag}
        onClose={()=>setModalFlag(false)}
      >
        {modalBody}
      </Modal>
      <a className={classes.githubStyle} href={'https://github.com/rhkdtjr90/tt_scheduler/graphs/commit-activity'}><GitHubIcon/></a>
      <a onClick={onModalOpen} className={classes.githubStyle}><MailIcon/></a>
    </>
  );
};