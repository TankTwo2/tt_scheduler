import React, {useCallback, useEffect, useState} from 'react';
import {Paper, Button, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import useDebounce from "./hooks/useDebounce";
import NameContainer from "./containers/NameContainer";

const useStyles = makeStyles({
  root: {
    margin:0,
    padding:0,
    width: '100%',
    height: '100vh',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    background: 'url(https://source.unsplash.com/7vKP5BAm8wg/1600x900)',
    backgroundSize: 'cover',
    color: 'white',
  },
});

// chrome.storage.sync.set({ "yourBody": "myBody" }, function(){
function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [timeFlag, setTimeFlag] = useState(false);

  const debounceValue = useDebounce(inputValue, 5000);

  //// InIt

  useEffect(()=>{
    setTimeout(()=>{
      setTimeFlag(true)
    },1000);
  },[]);

  //// Func

  // const onInputChange = useCallback((e)=>{
  //   setInputValue(e.target.value);
  //
  // },[]);

  // useEffect(()=>{
  //   chrome.storage.sync.set({ "testData": debounceValue}, function(){
  //   });
  // },[debounceValue]);




  return (
    <>
      <Paper className={classes.root}>
        {timeFlag ? <NameContainer /> : null}

        {/*<Button>*/}
        {/*  Hellow World!*/}
        {/*</Button>*/}
        {/*<TextField id="standard-basic" label="Standard" value={inputValue} onChange={onInputChange}/>*/}
        {/*{debounceValue}*/}
      </Paper>
      {/*<CounterContainer />*/}
    </>
  );
}

export default App;
