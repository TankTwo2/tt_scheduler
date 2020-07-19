import React, {useCallback, useEffect, useState, useRef} from 'react';
import {Box, Input, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type CellBoxPropsType = {
  cellDate: string,
}

const useStyles = makeStyles({
  cellContents: {
    cursor: 'text',
    height: '8vh',
    width: '11vw',
    overflow: 'auto',
    textOverflow: 'ellipsis',
  }
});

export default function CellBox({
                                  cellDate,
                                }:CellBoxPropsType) {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    try {
      chrome.storage.sync.get([cellDate], function (items) {
        if(Object.values(items)[0])console.log(cellDate, Object.values(items)[0]);
        setTempValue(Object.values(items)[0] ? Object.values(items)[0] : '');
      });
    } catch (e) {
      // console.log('Local Test', cellDate)
    }
  }, [cellDate]);

  const onInputChange = useCallback((e) => {
    setTempValue(e.target.value);
  }, []);

  const onInputBlur = useCallback(() => {
    setFlag(false);
    let temp: {[index: string]:any} = {};
    temp[cellDate] = tempValue;
    try {
      chrome.storage.sync.set(temp, function () {
      });
    } catch (e) {
      // console.log('Local Test');
    }
  }, [tempValue]);

  useEffect(()=>{
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  },[flag]);

  if(flag) return <Input
    inputRef={inputRef}
    multiline disableUnderline
    onBlur={onInputBlur}
    className={classes.cellContents} value={tempValue} onChange={onInputChange}
  />;

  return (
    <>
      <Box className={classes.cellContents} onClick={()=> setFlag(true)}>
        <Input
          multiline style={{fontSize: 10}} disableUnderline
          className={classes.cellContents} value={tempValue}
        />
      </Box>
    </>
  )
}

