import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";

type ClockPropsType = {
  cellDate: string,
}

const useStyles = makeStyles({
  timeValueStyle: {
    fontSize: 16,
    float: 'right',
    display: 'inline',
    marginRight: 10,
    fontFamily: 'monospace'
  }
});

export default function Clock() {
  const classes = useStyles();
  const [timeValue, setTimeValue] = useState<string>(moment().format('MM. DD. ddd. HH:mm:ss'));

  const PrintTime = useCallback(() => {
    setTimeValue(moment().format('MM. DD. ddd. HH:mm:ss'));
  }, []);

  useEffect(()=>{
    setInterval((PrintTime), 1000)
  },[]);

  return (
      <span className={classes.timeValueStyle}>{timeValue}</span>
  )
};
