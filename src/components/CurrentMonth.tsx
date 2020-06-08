import React, {useCallback, useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

type CurrentMonthPropsType = {
  onInputChange: (e: any) => void,
  inputValue: string,
}

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
  const [currentYYMM, setCurrentYYMM] = useState<string>(moment().format('YYMM'));


  const prevButton = useCallback(()=>{
    let tempValue = Number(currentYYMM) - 1;
    setCurrentYYMM(String(tempValue));
  },[currentYYMM]);

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
              <Typography variant="h2" className={classes.monthFont}>{currentYYMM}</Typography>
            </Paper>
          </Grid>
          <Grid key={3} item>
            <Paper className={classes.paper}>
              <ArrowForwardIosIcon onClick={()=>console.log('next')} className={classes.arrowButton}/>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

