import React, {useEffect, useState} from 'react';
import {Typography, Box, Switch} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Clock from "../components/Clock";
import FeedBack from "../components/FeedBack";

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
                                        darkMode, setDarkMode
                                      }: {darkMode: boolean, setDarkMode: (e:any) => void}){
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
  };

  return (
      <>
        <Box className={classes.tobBox}>
          <FeedBack loginEmail={loginEmail} darkMode={darkMode}/>
          <Clock/><br />
          <div className={classes.brDiv}/>
          <Typography className={classes.nameStyle}>{loginEmail}</Typography>
          <Switch
            checked={darkMode}
            onChange={handleChange}
          />Dark Mode
        </Box>
      </>
  )
};
