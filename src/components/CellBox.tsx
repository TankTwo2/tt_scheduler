import React, {useCallback, useEffect, useState} from 'react';
import {Box, Input, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type CellBoxPropsType = {
  cellDate: string,
}

const useStyles = makeStyles({
  cellContents: {
    cursor: 'text',
    height: 62,
    width: '100%',
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

  useEffect(()=>{
    try {
      chrome.storage.sync.get([cellDate], function (items) {
        setTempValue(Object.values(items)[0]);
      });
    } catch (e) {
      console.log('Local Test')
    }
  }, []);

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
      console.log('Local Test');
    }
  }, [tempValue]);

  if(flag) return <Input
    multiline
    onBlur={onInputBlur}
    className={classes.cellContents} value={tempValue} onChange={onInputChange}
  />;

  return (
    <>
      <Box className={classes.cellContents} onClick={()=> setFlag(true)}>
        <Typography variant="body1" style={{fontSize: 8}}>{tempValue}</Typography>
      </Box>
    </>
  )
}

