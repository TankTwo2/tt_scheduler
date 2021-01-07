import React, {useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import NameContainer from "./containers/NameContainer";
import CurrentMonthContainer from "./containers/CurrentMonthContainer";
import WeekContainer from "./containers/WeekContainer";
import FeedBack from "./components/FeedBack";
import { patchFetch } from './patch-fetch';

const useStyles = makeStyles({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // background: 'url(https://source.unsplash.com/random/1600x900)',
    backgroundSize: 'cover',
    color: 'black',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  version: {
    fontSize:8,
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});

// chrome.storage.sync.set({ "yourBody": "myBody" }, function(){
function App() {
  const classes = useStyles();
  const [currentYY, setCurrentYY] = useState(moment().format('YY'));
  const [currentMM, setCurrentMM] = useState(moment().format('MM'));
  const [firstWeek, setFirstWeek] = useState('');
  const [lastWeek, setLastWeek] = useState('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('Local');

  const getLoginInfo = () => {
    try{
      chrome.identity.getProfileUserInfo((res)=>{
        setLoginEmail(res.email);
      })
    }catch (e) {
      setLoginEmail('Not Connect');
    }
  };

  const getDarkModeInfo = () => {
    try{
      chrome.storage.sync.get(['darkModeInfo'], function (items) {
        setDarkMode(Object.values(items)[0] ? Object.values(items)[0] : false);
      });
    }catch (e) {
      setDarkMode(false);
    }
  };

  useEffect(()=>{
    getLoginInfo();
    getDarkModeInfo();
  },[]);

  //// InIt
  //년도, 월,

  useEffect(() => {
    if(moment(currentYY + currentMM, 'YYMM').startOf('month').format('WW')>moment(currentYY + currentMM, 'YYMM').endOf('month').format('WW')){
      if(currentMM === '01'){
        setFirstWeek(Number(currentYY) - 1 + moment(currentYY + currentMM, 'YYMM').startOf('month').format('WW'));
        setLastWeek(moment(currentYY + currentMM, 'YYMM').endOf('month').format('YYWW'));
      }
      else if(currentMM === '12'){
        setFirstWeek(moment(currentYY + currentMM, 'YYMM').startOf('month').format('YYWW'));
        setLastWeek(Number(currentYY) + 1 + moment(currentYY + currentMM, 'YYMM').endOf('month').format('WW'));
      }
    } else {
      setFirstWeek(moment(currentYY + currentMM, 'YYMM').startOf('month').format('YYWW'));
      setLastWeek(moment(currentYY + currentMM, 'YYMM').endOf('month').format('YYWW'));
    }
  }, [currentYY, currentMM]);

  return (
    <>
      <Paper style={{backgroundColor: darkMode ? 'black' : '#eee', color: darkMode ? 'white' : 'black'}} className={classes.root}>
        <Grid container justify="space-between" spacing={2}>
          <Grid key={1} item xs={4}>
            <NameContainer darkMode={darkMode} setDarkMode={setDarkMode} loginEmail={loginEmail}/>
          </Grid>
          <Grid key={2} item xs={4}>
            <CurrentMonthContainer
              currentYY={currentYY} currentMM={currentMM} setCurrentMM={setCurrentMM} setCurrentYY={setCurrentYY} darkMode={darkMode}
            />
          </Grid>
          <Grid key={3} item xs={4}>
            <FeedBack loginEmail={loginEmail} darkMode={darkMode}/>
          </Grid>
        </Grid>
        <WeekContainer firstWeek={firstWeek} lastWeek={lastWeek} currentYY={currentYY} currentMM={currentMM} loginEmail={loginEmail}/>
        <Typography className={classes.version}>0.2.8.3 made by Tanktwo</Typography>
      </Paper>
    </>
  );
}

export default App;
patchFetch(window);
