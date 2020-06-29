import React, {useCallback, useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import {RootState} from '../modules';
import CustomInput from '../components/CustomInput';
import useDebounce from "../hooks/useDebounce";
import {Typography, Box} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Clock from "../components/Clock";
import FeedBack from "../components/FeedBack";


type NameContainerPropsType = {
  isName: boolean,
  setIsName: (e: boolean) => void
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
    cursor: 'pointer'
  },
  brDiv: {
    height: 5
  }
});

export default function NameContainer({
  isName, setIsName
                                      }:NameContainerPropsType) {
  const [inputValue, setInputValue] = useState('');


  const debounceValue = useDebounce(inputValue, 2000);
  const classes = useStyles();

  //// Init
  useEffect(() => {
    setInputValue('');
    try {
      chrome.storage.sync.get(["Name"], function (items) {
        console.log(items.Name + " 's scheduler");
        if (items.Name !== '' && items.Name ) {
          console.log(items.Name, 'items.Name get');
          setInputValue(items.Name);
          setIsName(true);
        } else{setIsName(false)}
      });
    } catch (e) {
      console.log('Local Test')
    }
  }, []);

  useEffect(() => {
    try {
      if(debounceValue !== '') {
        chrome.storage.sync.set({"Name": debounceValue}, function () {
          console.log(debounceValue, 'debounceValue');
          setIsName(true);
        });
      }
    } catch (e) {
      console.log('Local Test, Fave Fail', e)
    }
  }, [debounceValue]);


  //// Func
  const onInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (
    isName ?
      <>
        <Box className={classes.tobBox}>
          <FeedBack/>
          <Clock/><br />
          <div className={classes.brDiv}/>
          <Typography className={classes.nameStyle} onClick={()=>{chrome.storage.sync.clear(); setIsName(false)}}>{inputValue}'s Scheduler</Typography>
        </Box>
      </>
      : isName === false ?
      <>
        <Box className={classes.mainBox}>
          <CustomInput
            onInputChange={onInputChange}
            inputValue={inputValue}
          />
        </Box>
      </>
      : null
  )
};
