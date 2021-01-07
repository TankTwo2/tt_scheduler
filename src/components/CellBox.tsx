import React, { useCallback, useEffect, useState, useRef } from "react";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import { Box, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../config/config";

type CellBoxPropsType = {
  cellDate: string;
  loginEmail: string;
};

const useStyles = makeStyles({
  cellContents: {
    fontSize: 11,
    cursor: "text",
    height: "8vh",
    width: "10.2vw",
    overflow: "auto",
    textOverflow: "ellipsis",
  },
});

export default function CellBox({
  cellDate,
  loginEmail,
}: CellBoxPropsType) {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
  const [tempValue, setTempValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      chrome.storage.sync.get([cellDate], function (items) {
        if (Object.values(items)[0])
          console.log(cellDate, Object.values(items)[0]);
        setTempValue(Object.values(items)[0] ? Object.values(items)[0] : "");
      });
    } catch (e) {
      // console.log('Local Test', cellDate)
    }
  }, [cellDate]);

  const onInputChange = useCallback((e) => {
    setTempValue(e.target.value);
  }, []);

  const onInputBlur = useCallback(async () => {
    setFlag(false);
    let temp: { [index: string]: any } = {};
    temp[cellDate] = tempValue;
    let saveApiRes = await fetch(
      `${loginEmail === "Local" ? config.dev : config.api}tts/save`,
      {
        method: "POST",
        body: JSON.stringify({
          chrome_id: loginEmail,
          event_key: cellDate,
          event_type: "SAVE",
          event_at: moment().format("YYYY-MM-DD HH:mm:ss"),
        }),
      }
    );
    if (saveApiRes.status !== 200)
      console.log(`save api error : ${saveApiRes.status}`);
    try {
      chrome.storage.sync.set(temp, function () {});
    } catch (e) {
      // console.log('Local Test');
    }
  }, [tempValue]);

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, [flag]);

  if (flag)
    return (
      <Input
        inputRef={inputRef}
        multiline
        disableUnderline
        onBlur={onInputBlur}
        className={classes.cellContents}
        value={tempValue}
        onChange={onInputChange}
      />
    );
  // if(flag) return<ReactQuill theme="snow" onBlur={onInputBlur} value={tempValue} onChange={setTempValue} />

  return (
    <>
      <Box className={classes.cellContents} onClick={() => setFlag(true)}>
        <Input
          multiline
          style={{ fontSize: 10 }}
          disableUnderline
          className={classes.cellContents}
          value={tempValue}
        />
      </Box>
    </>
  );
}
