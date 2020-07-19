import React, {useCallback, useEffect, useState, useRef} from 'react';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import {makeStyles} from '@material-ui/core/styles';
import Modal from "@material-ui/core/Modal";
import MomentUtils from '@date-io/moment';

type TimePickerPropsType = {
  setCurrentYY: (e: any) => void,
  setCurrentMM: (e: any) => void,
  currentYY: string,
  currentMM: string,
  isDate: boolean,
  setIsDate: (e: any) => void,
}

const useStyles = makeStyles({
  modalPaper: {
    width: 310,
    height: 405,
    backgroundColor: 'white',
    border: '2px solid #000',
    borderRadius: '4px',
    margin: '20vh auto',
    overFlow: 'scroll',
    zIndex: 1
  },
});

export default function TimePicker({
                                     setCurrentMM, setCurrentYY, currentYY, currentMM, isDate, setIsDate
                                }:TimePickerPropsType) {
  const classes = useStyles();

  const onChangeDate = (e:any) => {
    setCurrentYY(e.format('YY'));
    setCurrentMM(e.format('MM'));
  };

  return (
    <>
      <Modal
        className={classes.modalPaper}
        open={isDate}
        onClose={()=>setIsDate(false)}
      >
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            views={["year", "month"]}
            // autoOk
            // orientation="landscape"
            variant="static"
            value={moment(currentYY+currentMM, 'YYMM')}
            onChange={onChangeDate}
          />
        </MuiPickersUtilsProvider>
      </Modal>
    </>
  )
}

