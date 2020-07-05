import React, {useCallback, useEffect, useState} from 'react';
import {Typography, Box} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Clock from "../components/Clock";
import FeedBack from "../components/FeedBack";


type NameContainerPropsType = {
  isName: boolean,
}

const useStyles = makeStyles({
  tobBox: {
    width: 400,
    display: 'inline'
  },
  mainBox: {
    textAlign: 'center'
  },
  nameStyle: {
    fontSize: 15,
    marginRight: 5,
  },
  brDiv: {
    height: 5
  }
});

export default function NameContainer({
  isName
                                      }:NameContainerPropsType) {
  const [loginEmail, setLoginEmail] = useState('Local');

  const getLoginInfo = () => {
    try{
      chrome.identity.getProfileUserInfo((res)=>{
        setLoginEmail(res.email);
      })
    }catch (e) {
      setLoginEmail('Not Connect');
    }
  };

  useEffect(()=>{
    getLoginInfo();
  },[]);

  const classes = useStyles();
  //// Init
  return (
      <>
        <Box className={classes.tobBox}>
          <FeedBack loginEmail={loginEmail}/>
          <Clock/><br />
          <div className={classes.brDiv}/>
          <Typography className={classes.nameStyle}>{loginEmail}</Typography>
        </Box>
      </>
  )
};
