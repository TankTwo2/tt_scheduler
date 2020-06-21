import React, {useCallback, useEffect, useState} from 'react';
import {Box, Input, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type CellBoxPropsType = {
  cellDate: string,
  cellWeek: string
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
                                  cellDate, cellWeek
                                }:CellBoxPropsType) {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const [tempValue, setTempValue] = useState('');



  const onInputChange = useCallback((e) => {
    try {
      // chrome.storage.sync.set({"20Y23W": debounceValue}, function () {
        setTempValue(e.target.value);
      // });
    } catch (e) {
      console.log('Local Test')
    }
  }, [tempValue]);

  if(flag) return <Input
    multiline
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

