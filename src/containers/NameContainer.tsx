import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../modules';
import CustomInput from '../components/CustomInput';
import useDebounce from "../hooks/useDebounce";
import {Typography, Box, Zoom} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles({
  mainBox: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',

    textAlign: 'center'
  },
  nameStyle: {
    fontSize: 15,
    float: 'right',
    margin: 5
  }
});

export default function NameContainer() {
  // 상태를 조회합니다. 상태를 조회 할 때에는 state 의 타입을 RootState 로 지정해야합니다.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  // 각 액션들을 디스패치하는 함수들을 만들어줍니다
  const [inputValue, setInputValue] = useState('');
  const [isName, setIsName] = useState(false);

  const debounceValue = useDebounce(inputValue, 2000);
  const classes = useStyles();

  //// Init
  useEffect(() => {
    try {
      chrome.storage.sync.get(["Name"], function (items) {
        console.log(items.Name);
        if (items.Name !== '') {
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
      chrome.storage.sync.set({"Name": debounceValue}, function () {
        if(debounceValue !== ''){
          setIsName(true);
        }
      });
    } catch (e) {
      console.log('Local Test')
    }
  }, [debounceValue]);


  //// Func
  const onInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  return (
    isName ?
        <Typography className={classes.nameStyle} onClick={()=>{chrome.storage.sync.clear(); setIsName(false)}}>{inputValue}'s Scheduler</Typography>
      :
      <>
        <Box className={classes.mainBox}>
          <CustomInput
            onInputChange={onInputChange}
            inputValue={inputValue}
          />
        </Box>
      </>

  )
};
