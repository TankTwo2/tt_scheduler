import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

type WeekContainerType = {
  firstWeek: string,
  lastWeek: string
}

const useStyles = makeStyles({
  tdContainer: {
    padding: 10
  },
  tdBox: {
    height: 40,
    opacity: 0.5
  }
});

export default function WeekContainer({
  firstWeek, lastWeek
                                              }: WeekContainerType) {
  const classes = useStyles();

  //주차불러오기
  useEffect(()=>{
    let n;
    for(n=0; n < Number(lastWeek) - Number(firstWeek) + 1; n++){
      console.log(Number(firstWeek) + n)
    }
  },[lastWeek, firstWeek]);

  const trDiv = useCallback(()=>{
    let n;
    let tempWeek = [];
    for(n=0; n < Number(lastWeek) - Number(firstWeek) + 1; n++){
      tempWeek.push(Number(firstWeek) + n)
    }
    return (
      tempWeek.map(row => (
        <>
          <Grid container spacing={3} className={classes.tdContainer}>
            {tdDiv(row)}
          </Grid>
        </>
      ))
    )
  },[lastWeek, firstWeek]);

  const tdDiv = useCallback((row)=>{

    return(
      <>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.tdBox}>{row}</Paper>
        </Grid>
      </>
    )
  }, []);



  return (
    <>
      {trDiv()}
    </>
  )
}

