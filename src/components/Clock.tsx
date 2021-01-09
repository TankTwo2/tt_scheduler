import React, {useCallback, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";

const useStyles = makeStyles({
  dateValueStyle: {
    fontSize: 16,
    display: 'inline',
    marginRight: 10,
  },
  timeValueStyle: {
    fontSize: 16,
    display: 'inline',
    marginRight: 10,
    fontFamily: 'monospace'
  }
});

export default function Clock() {
  const classes = useStyles();
  const [dateValue, setDateValue] = useState<string>(moment().format('MM. DD. dddd.'));
  const [timeValue, setTimeValue] = useState<string>(moment().format('HH:mm:ss'));

  const PrintTime = useCallback(() => {
    setDateValue(moment().format('MM. DD. dddd.'));
    setTimeValue(moment().format('HH:mm:ss'));
  }, []);

  useEffect(()=>{
    setInterval((PrintTime), 1000)
    // eslint-disable-next-line
  },[]);

  return (
    <>
      <span className={classes.dateValueStyle}>{dateValue}</span>
      <span className={classes.timeValueStyle}>{timeValue}</span>
    </>
  )
};
