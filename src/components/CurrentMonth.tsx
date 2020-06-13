import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 200,
    backgroundColor: 'rgba( 255, 255, 255, 0.0 )',
    boxShadow: 'none',
    textAlign: 'center'
  },
  arrowButton: {
    marginTop: 9, cursor:'pointer', color: 'white', opacity: 0.5, zoom: 1.5
  },
  monthFont: {
    color: 'white',
    opacity: 0.5
  }
});

export default function CurrentMonth() {
  const classes = useStyles();
  const [currentYY, setCurrentYY] = useState(moment().format('YY'));
  const [currentMM, setCurrentMM] = useState(moment().format('MM'));
  const [firstWeek, setFirstWeek] = useState(moment(currentMM, 'MM').startOf('month').format('WW'));
  const [lastWeek, setLastWeek] = useState(moment(currentMM, 'MM').endOf('month').format('WW'));


  //주차불러오기
  useEffect(()=>{
    let n;
    for(n=0; n < Number(lastWeek) - Number(firstWeek) + 1; n++){
      console.log(Number(firstWeek) + n)
    }
  },[lastWeek, firstWeek]);

  const prevButton = useCallback(()=>{
    let tempMonthValue = String(Number(currentMM) - 1);
    if(tempMonthValue.length === 1){
      tempMonthValue = '0' + tempMonthValue
    }
    if (tempMonthValue === '00'){
      setCurrentMM('12');
      setCurrentYY(String(Number(currentYY) - 1));
    } else {
      setCurrentMM(tempMonthValue);
    }
  },[currentMM, currentYY]);

  const nextButton = useCallback(()=>{
    let tempMonthValue = String(Number(currentMM) + 1);
    if(tempMonthValue.length === 1){
      tempMonthValue = '0' + tempMonthValue
    }
    if (tempMonthValue === '13'){
      setCurrentMM('01');
      setCurrentYY(String(Number(currentYY) + 1));
    } else {
      setCurrentMM(tempMonthValue);
    }
  },[currentMM, currentYY]);


  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid key={1} item>
            <Paper className={classes.paper}>
              <ArrowBackIosIcon onClick={prevButton} className={classes.arrowButton}/>
            </Paper>
          </Grid>
          <Grid key={2} item>
            <Paper className={classes.paper}>
              <Typography variant="h2" className={classes.monthFont}>{currentYY + '. ' + currentMM}</Typography>
            </Paper>
          </Grid>
          <Grid key={3} item>
            <Paper className={classes.paper}>
              <ArrowForwardIosIcon onClick={nextButton} className={classes.arrowButton}/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

