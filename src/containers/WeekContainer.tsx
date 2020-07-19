import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import CellBox from "../components/CellBox";

type WeekContainerType = {
  firstWeek: string,
  lastWeek: string,
  currentYY: string,
  currentMM: string,
}

const useStyles = makeStyles({
  tdContainer: {
    padding: 10
  },
  headerBox: {
    fontSize: 20,
    width: '10.8vw',
    height: '100%',
    opacity: 0.8,
    backgroundColor: 'green',
    textAlign: 'center'
  },
  isoWeekTdBox: {
    height: '100%',
    width: '10.8vw',
    opacity: 0.9,
    textAlign: 'center',
    backgroundColor: 'darkgrey',
  },
  tdBox: {
    height: '100%',
    width: '10.8vw',
    opacity: 0.8,
  },
  tdWeekendBox: {
    height: '100%',
    backgroundColor: 'pink',
    width: '11vw',
    opacity: 0.8,
  },
  tdDivHeader: {
    textAlign: 'center',
    borderBottom: '0.5px dashed grey'
  },
});

export default function WeekContainer({
                                        firstWeek, lastWeek, currentYY, currentMM
                                      }: WeekContainerType) {
  const classes = useStyles();
  const LastYearLastWW = moment(Number(currentYY)-1, 'YY').endOf('year').format('WW');
  const trDiv = useCallback(() => {
    let n = 0;
    const tempWeek: string[] = [];
    // [49,50,51,52,53,01]
    // [53,01,02,03,04]
    if(firstWeek.slice(0,2) === lastWeek.slice(0,2)) {
      // 년도가 같으면 마지막 - 처음 반복문
      for (n = 0; n <=  Number(lastWeek) - Number(firstWeek) ; n++){
        tempWeek.push(String(Number(lastWeek) - n));
        // console.log(String(Number(lastWeek) - n), 1);
      }
    } else {
      // 년도가 다르면 전년도 마지막주 - firstWeek 반복문, 마지막주 - 해당년도 첫째주
      if(currentMM === '01') {
        for (n = 0; n <= Number(LastYearLastWW) - Number(moment(firstWeek, 'YYWW').format('WW')); n++) {
          tempWeek.push(String(Number(currentYY) - 1) + String(Number(LastYearLastWW) - n));
          // console.log(String(Number(currentYY) - 1) + String(Number(LastYearLastWW) - n), 2)
        }
        for (n = 1; n <= Number(lastWeek.slice(2)) + 1; n++) {
          if(tempWeek.length !== 6){
            tempWeek.push(currentYY + '0' + n);
            // console.log(currentYY + '0' + n, 3)
          }
        }
      } else if(currentMM === '12') {
        //년도가 다른데 12월인 특수한경우
        for (n = 0; n <= Number(LastYearLastWW) - Number(moment(firstWeek, 'YYWW').format('WW')); n++) {
          tempWeek.push(Number(currentYY) + String(Number(LastYearLastWW) - n));
          // console.log(Number(currentYY) + String(Number(LastYearLastWW) - n), 2)
        }
        for (n = 1; n <= Number(lastWeek.slice(2)) + 1; n++) {
          if(tempWeek.length !== 6){
            tempWeek.push(currentYY + '0' + n);
            // console.log(currentYY + '0' + n, 3)
          }
        }
      }
    };

    tempWeek.sort();
    console.log(tempWeek);
    const headerDiv = () => {
      let tempHeaderContainer = [];
      tempHeaderContainer.push(
        <Grid item xs>
          <Paper className={classes.headerBox}>
            <Typography variant="inherit" gutterBottom>
              Week
            </Typography>
          </Paper>
        </Grid>
      );
      let n = 0;
      while (n < 7) {
        tempHeaderContainer.push(
          <Grid item xs>
            <Paper className={classes.headerBox}>
              <Typography variant="inherit" gutterBottom>
                {moment().startOf('isoWeek').add(n, 'days').format('ddd')}
              </Typography>
            </Paper>
          </Grid>
        );
        n++;
      }
      return (
        <Grid container spacing={3} className={classes.tdContainer}>
          {tempHeaderContainer}
        </Grid>
      )
    };
    return (
      <>
      {headerDiv()}
      {tempWeek.map(row => (
        <Grid container spacing={3} className={classes.tdContainer}>
          {tdDiv(row)}
        </Grid>
      ))}
      </>
  )
  }, [lastWeek, firstWeek]);

  const tdDiv = useCallback((row) => {
    let tempDivContainer = [];
    tempDivContainer.push(
      <Grid item xs>
        <Paper className={classes.isoWeekTdBox}>
          <Typography
            variant="subtitle1" className={classes.tdDivHeader}>{row}W
          </Typography>
          <CellBox
            // cellDate={moment(row, 'WW').format('YYWW')}
            cellDate={row}
          />
        </Paper>
      </Grid>
    );
    let n = 0;
    while (n < 7) {
      // console.log(moment(row, 'WW').startOf('isoWeek').add(n, 'days',).format('YYMMDD'))
      tempDivContainer.push(
        <Grid item xs>
          <Paper className={n === 5 || n === 6 ? classes.tdWeekendBox : classes.tdBox}>
            <Typography
              variant="subtitle1" className={classes.tdDivHeader}
              style={moment(row, 'YYWW')
                .startOf('isoWeek').add(n, 'days',).format('YYMMDD') === moment().format('YYMMDD')
                ? {backgroundColor: "orangered"}
                : {}}
            >
              {moment(row, 'YYWW').startOf('isoWeek').add( n, 'days').format('MM. DD')}
            </Typography>
            <CellBox
              cellDate={moment(row, 'YYWW').startOf('isoWeek').add(n, 'days',).format('YYMMDD')}
            />
          </Paper>
        </Grid>
      );
      n++;
    }

    return tempDivContainer
  }, []);


  return (
    <>
      {trDiv()}
    </>
  )
}

