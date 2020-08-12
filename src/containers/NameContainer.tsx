import React from 'react';
import {Typography, Box, Switch} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Clock from "../components/Clock";

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
                                        darkMode, setDarkMode, loginEmail
                                      }: {darkMode: boolean, setDarkMode: (e:any) => void, loginEmail: string}){

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkMode(event.target.checked);
    try {
      chrome.storage.sync.set({darkModeInfo:event.target.checked}, function () {
      });
    } catch (e) {
      // console.log('Local Test');
    }
  };

  return (
      <>
        <Box className={classes.tobBox}>
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
