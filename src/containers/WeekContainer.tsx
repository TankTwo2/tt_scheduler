import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Paper, Typography, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import CellBox from "../components/CellBox";

type WeekContainerType = {
  firstWeek: string,
  lastWeek: string,
  currentYY: string,
}

const useStyles = makeStyles({
  tdContainer: {
    padding: 10
  },
  headerBox: {
    fontSize: 20,
    height: '100%',
    opacity: 0.5,
    backgroundColor: 'green',
    textAlign: 'center'
  },
  weekTdBox: {
    height: 90,
    width: '11vw',
    opacity: 0.5,
  },
  tdBox: {
    height: '100%',
    width: '11vw',
    opacity: 0.5,
  },
  tdWeekendBox: {
    height: '100%',
    backgroundColor: 'pink',
    width: '11vw',
    opacity: 0.5,
  },
  tdDivHeader: {
    textAlign: 'center',
    borderBottom: '0.5px dashed grey'
  },
});

// 20Y29W = {
// 200531:String,
// 200601:String,
// 200601:String....
// }

export default function WeekContainer({
                                        firstWeek, lastWeek, currentYY
                                      }: WeekContainerType) {
  const classes = useStyles();
  const [weekData, setWeekData] = useState([]);

  //주차불러오기
  useEffect(() => {
    let n;
    let tempSearchWeekList = [];
    for (n = 0; n < Number(lastWeek) - Number(firstWeek) + 1; n++) {
      tempSearchWeekList.push(currentYY + (Number(firstWeek) + n))
    }
    // console.log(tempSearchWeekList,'tempSearchWeekList');
    // try {
    //   chrome.storage.sync.get([tempSearchWeekList[0]], function (items) {
    //     // items.map(row => setWeekData({...weekData, row}))
    //     console.log(items, 'items')
    //   });
    // } catch (e) {
    //   console.log('Local Test')
    // }

  }, [lastWeek, firstWeek]);

  const trDiv = useCallback(() => {
    let n;
    const tempWeek = [];
    for (n = 0; n < Number(lastWeek) - Number(firstWeek) + 1; n++) {
      tempWeek.push(Number(firstWeek) + n)
    }
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
        <Paper className={classes.weekTdBox}>
          {row}W
        </Paper>
      </Grid>
    );
    let n = 0;
    while (n < 7) {
      tempDivContainer.push(
        <Grid item xs>
          <Paper className={n === 5 || n === 6 ? classes.tdWeekendBox : classes.tdBox}>
            <Typography variant="subtitle1" className={classes.tdDivHeader}>
              {moment(row, 'WW').startOf('isoWeek').add( n, 'days').format('MM. DD')}
            </Typography>
            <CellBox
              cellDate={moment(row, 'WW').startOf('isoWeek').add(n, 'days',).format('YYMMDD')}
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

