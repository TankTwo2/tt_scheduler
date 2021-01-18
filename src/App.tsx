import React, { useEffect, useState } from "react";
import { patchFetch } from "./patch-fetch";
import TtsHeader from "./components/ttsHeader";
import TtsBody from "./components/ttsBody";
import moment from "moment";

function App() {
  const [currentYY, setCurrentYY] = useState(moment().format("YY"));
  const [currentMM, setCurrentMM] = useState(moment().format("MM"));
  const [firstWeek, setFirstWeek] = useState("");
  const [lastWeek, setLastWeek] = useState("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>("Local");

  const getLoginInfo = () => {
    try {
      chrome.identity.getProfileUserInfo((res) => {
        setLoginEmail(res.email);
      });
    } catch (e) {
      setLoginEmail("Not Connect");
    }
  };

  const getDarkModeInfo = () => {
    try {
      chrome.storage.sync.get(["darkModeInfo"], function (items) {
        setDarkMode(Object.values(items)[0] ? Object.values(items)[0] : false);
      });
    } catch (e) {
      setDarkMode(false);
    }
  };

  useEffect(() => {
    getLoginInfo();
    getDarkModeInfo();
  }, []);

  //// InIt
  //년도, 월,

  useEffect(() => {
    if (
      moment(currentYY + currentMM, "YYMM")
        .startOf("month")
        .format("WW") >
      moment(currentYY + currentMM, "YYMM")
        .endOf("month")
        .format("WW")
    ) {
      if (currentMM === "01") {
        setFirstWeek(
          Number(currentYY) -
            1 +
            moment(currentYY + currentMM, "YYMM")
              .startOf("month")
              .format("WW")
        );
        setLastWeek(
          moment(currentYY + currentMM, "YYMM")
            .endOf("month")
            .format("YYWW")
        );
      } else if (currentMM === "12") {
        setFirstWeek(
          moment(currentYY + currentMM, "YYMM")
            .startOf("month")
            .format("YYWW")
        );
        setLastWeek(
          Number(currentYY) +
            1 +
            moment(currentYY + currentMM, "YYMM")
              .endOf("month")
              .format("WW")
        );
      }
    } else {
      setFirstWeek(
        moment(currentYY + currentMM, "YYMM")
          .startOf("month")
          .format("YYWW")
      );
      setLastWeek(
        moment(currentYY + currentMM, "YYMM")
          .endOf("month")
          .format("YYWW")
      );
    }
  }, [currentYY, currentMM]);

  return (
    <>
      <div className="container is-fluid">
        <div className={"columns"}>
          <TtsHeader />
        </div>
        <br />
        <br />
        <br />
        <br />
        <TtsBody
          loginEmail={loginEmail}
          currentMM={currentMM}
          currentYY={currentYY}
          firstWeek={firstWeek}
          lastWeek={lastWeek}
        />
      </div>
    </>
  );
}

export default App;
patchFetch(window);
