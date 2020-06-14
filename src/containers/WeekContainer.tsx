import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';

type WeekContainerType = {
  firstWeek: string,
  lastWeek: string
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
      tempWeek.map(row => <div>{row}</div>)
    )
  },[lastWeek, firstWeek]);



  return (
    <>
      {trDiv()}
    </>
  )
}

