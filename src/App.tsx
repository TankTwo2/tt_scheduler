import React, { useEffect, useState } from "react";
import { patchFetch } from "./patch-fetch";
import TtsHeader from "./components/ttsHeader";
import TtsBody from "./components/ttsBody";
import moment from "moment";
import { loadChromeStorage, loginInfo } from "./hooks/chromeFunc";

const defaultStyle = {
  width: "100vw",
  height: "105vh",
  backgroundColor: "#2c2c2c",
};

function App() {
  const [currentYY, setCurrentYY] = useState(moment().format("YY"));
  const [currentMM, setCurrentMM] = useState(moment().format("MM"));
  const [firstWeek, setFirstWeek] = useState("");
  const [lastWeek, setLastWeek] = useState("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<"Local" | undefined | string>(
    "Local"
  );

  const getLoginInfo = () => {
    setLoginEmail(loginInfo());
  };

  const getDarkModeInfo = () => {
    const darkModeInfo = loadChromeStorage("darkModeInfo");
    if (darkModeInfo) setDarkMode(darkModeInfo);
    else setDarkMode(false);
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
      <div
        style={
          darkMode
            ? defaultStyle
            : { ...defaultStyle, backgroundColor: "white" }
        }
      >
        <div className="container is-fluid">
          <div className={"columns"}>
            <TtsHeader
              loginEmail={loginEmail}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              setCurrentYY={setCurrentYY}
              setCurrentMM={setCurrentMM}
              currentYY={currentYY}
              currentMM={currentMM}
            />
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
      </div>
    </>
  );
}

export default App;
patchFetch(window);
