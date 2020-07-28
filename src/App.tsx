import React, {useCallback, useEffect, useState} from 'react';
import {Paper, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import NameContainer from "./containers/NameContainer";
import CurrentMonthContainer from "./containers/CurrentMonthContainer";
import WeekContainer from "./containers/WeekContainer";

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
    backgroundColor: '#A3BFBA',
    backgroundSize: 'cover',
    color: 'white',
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

  useEffect(()=>{
    console.log('firstWeek',firstWeek, 'lastWeek', lastWeek)
  },[firstWeek, lastWeek]);

  return (
    <>
      <Paper className={classes.root}>
        <NameContainer />
        <CurrentMonthContainer
          currentYY={currentYY} currentMM={currentMM} setCurrentMM={setCurrentMM} setCurrentYY={setCurrentYY}
        />
        <WeekContainer firstWeek={firstWeek} lastWeek={lastWeek} currentYY={currentYY} currentMM={currentMM}/>
        <Typography className={classes.version}>0.2.8.1 made by Tanktwo</Typography>
      </Paper>
    </>
  );
}

export default App;
