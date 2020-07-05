import React, {useCallback, useEffect, useState} from 'react';
import {Paper, Button, TextField, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
import useDebounce from "./hooks/useDebounce";
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
    overflow: 'hidden'
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
  const [timeFlag, setTimeFlag] = useState<boolean>(false);
  const [isName, setIsName] = useState<any>(true);
  // const [isName, setIsName] = useState<any>(false);
  ///
  const [currentYY, setCurrentYY] = useState(moment().format('YY'));
  const [currentMM, setCurrentMM] = useState(moment().format('MM'));
  const [firstWeek, setFirstWeek] = useState(moment(currentYY + currentMM, 'YYMM').startOf('month').format('WW'));
  const [lastWeek, setLastWeek] = useState(moment(currentYY + currentMM, 'YYMM').endOf('month').format('WW'));

  //// InIt


  return (
    <>
      <Paper className={classes.root}>
        <NameContainer isName={isName} />
        <CurrentMonthContainer
          currentYY={currentYY} currentMM={currentMM} setCurrentMM={setCurrentMM} setCurrentYY={setCurrentYY}
          setFirstWeek={setFirstWeek} setLastWeek={setLastWeek}
        />
        <WeekContainer firstWeek={firstWeek} lastWeek={lastWeek} currentYY={currentYY}/>
        <Typography className={classes.version}>0.2.7.3 made by Tanktwo</Typography>
      </Paper>
    </>
  );
}

export default App;
