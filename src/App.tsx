import React, {useCallback, useEffect, useState} from 'react';
import {Paper, Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CounterContainer from './containers/CounterContainer';
import useDebounce from "./hooks/useDebounce";

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
});
// chrome.storage.sync.set({ "yourBody": "myBody" }, function(){
function App() {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const debounceValue = useDebounce(inputValue, 5000);

  //// InIt

  // useEffect(()=>{
  //   chrome.storage.sync.get(["testData"], function(items){
  //     setInputValue(items.testData)
  //   });
  // },[]);

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
