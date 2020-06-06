import React, {useCallback, useState} from 'react';
import {Paper, Button, Input} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

type InputProps = {
  onInputChange: (e: any) => void,
  inputValue: string,
}

const useStyles = makeStyles({
  nameInputStyle: {
    fontSize: '50px',
    color: 'white',
    width: '35vw',
    overflow: 'auto'
  },
});

export default function CustomInput({
                    onInputChange,
                    inputValue
                     }: InputProps) {
  const classes = useStyles();


  return (
    <Input className={classes.nameInputStyle} value={inputValue} onChange={onInputChange} placeholder={"Hello, What's your name?"}/>
  )
}

