import React, {useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type InputPropsType = {
  onInputChange: (e: any) => void,
  inputValue: string,
}

const useStyles = makeStyles({
  nameInputStyle: {
    fontSize: '50px',
    color: 'white',
    width: '35vw',
    overflow: 'auto',
    marginTop: 40,
    '& .MuiInput-underline:before': {
      borderBottomColor: 'white',
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: 'darkgrey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
  },

});

export default function CustomInput({
                    onInputChange,
                    inputValue
                     }: InputPropsType) {
  const classes = useStyles();


  return (
    <TextField
      className={classes.nameInputStyle} value={inputValue} onChange={onInputChange} placeholder={"Hello, What's your name?"}
      InputProps={{
        classes: {
          root: classes.nameInputStyle,
        }
      }}
    />
  )
}

