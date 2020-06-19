import React, {useCallback, useState} from 'react';
import {Box, Input, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type CellBoxPropsType = {
  onInputChange: (e: any) => void,
  inputValue: string,
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

export default function CellBox() {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const [tempValue, setTempValue] = useState('');

  if(flag) return <Input
    multiline
    className={classes.cellContents} value={tempValue} onChange={e=>setTempValue(e.target.value)}
  />;

  return (
    <>
      <Box className={classes.cellContents} onClick={()=> setFlag(true)}>
        <Typography variant="body1" style={{fontSize: 8}}>{tempValue}</Typography>
      </Box>
    </>
  )
}

