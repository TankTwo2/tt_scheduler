import React, { useState } from "react";
import Clock from "./clock";
import XLSX from "xlsx";

interface TtsHeaderInter {
  loginEmail: "Local" | undefined | string;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentYY: (e: string) => void;
  setCurrentMM: (e: string) => void;
  currentYY: string;
  currentMM: string;
}

export default function TtsHeader({
  loginEmail,
  darkMode,
  setDarkMode,
  setCurrentYY,
  setCurrentMM,
  currentYY,
  currentMM,
}: TtsHeaderInter) {
  const [searchData, setSearchData] = useState<{
    site: "Google" | "Naver";
    value: string;
  }>({ site: "Google", value: "" });

  function handleSearchData(type: "site" | "value", value: string) {
    setSearchData({ ...searchData, [type]: value });
  }

  function submitSearch() {
    if (searchData.site === "Google")
      window.open(
        `https://www.google.com/search?q=${searchData.value}`,
        "_self"
      );
    else
      window.open(
        `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${searchData.value}`,
        "_self"
      );
  }

  function prevButton() {
    let tempMonthValue = String(Number(currentMM) - 1);
    if (tempMonthValue.length === 1) {
      tempMonthValue = "0" + tempMonthValue;
    }
    if (tempMonthValue === "00") {
      setCurrentMM("12");
      setCurrentYY(String(Number(currentYY) - 1));
    } else {
      setCurrentMM(tempMonthValue);
    }
  }

  function nextButton() {
    let tempMonthValue = String(Number(currentMM) + 1);
    if (tempMonthValue.length === 1) {
      tempMonthValue = "0" + tempMonthValue;
    }
    if (tempMonthValue === "13") {
      setCurrentMM("01");
      setCurrentYY(String(Number(currentYY) + 1));
    } else {
      setCurrentMM(tempMonthValue);
    }
  }

  const onChangeDate = (e: string) => {
    const splitDate = e.split("-");
    setCurrentYY(splitDate[0].slice(2, 4));
    setCurrentMM(splitDate[1]);
  };

  function onExcelExport() {
    try {
      chrome.storage.sync.get(null, function (items) {
        let ws = XLSX.utils.json_to_sheet([items]);

        /* add to workbook */
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "tt_scheduler");

        /* generate an XLSX file */
        XLSX.writeFile(wb, `tt_scheduler_${new Date().toISOString()}.xlsx`);
      });
    } catch (e) {}
  }

  return (
    <nav
      className={
        darkMode
          ? "navbar is-fixed-top is-dark"
          : "navbar is-fixed-top is-light"
      }
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <form
              className="field has-addons has-addons-centered"
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch();
              }}
            >
              <p className="control">
                <span className="select is-small">
                  <select
                    onChange={(e) => handleSearchData("site", e.target.value)}
                  >
                    <option>Google</option>
                    <option>Naver</option>
                  </select>
                </span>
              </p>
              <p className="control">
                <input
                  type="text"
                  className="input is-small"
                  placeholder="Search..."
                  onChange={(e) => handleSearchData("value", e.target.value)}
                />
              </p>
              <p className="control">
                <a
                  className="button is-link is-small is-inverted"
                  style={{ border: "1px solid lightgrey" }}
                  onClick={() => submitSearch()}
                >
                  Search
                </a>
              </p>
            </form>
          </div>
          <div className="navbar-item" />
          <div className="navbar-item">
            <span
              className="icon"
              onClick={prevButton}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-chevron-left" />
            </span>
          </div>
          <div className="navbar-item">
            <input
              type="month"
              className="input is-small"
              value={`20${currentYY}-${currentMM}`}
              onChange={(e) => onChangeDate(e.target.value)}
            />
          </div>
          <div className="navbar-item">
            <span
              className="icon"
              onClick={nextButton}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-chevron-right" />
            </span>
          </div>
        </div>
        <div className="navbar-end pr-5">
          <Clock />
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <span className="icon">
                <i className="fas fa-cog" />
              </span>
            </a>
            <div className="navbar-dropdown is-right">
              <a className="navbar-item">
                <div className="field">
                  <label htmlFor="Dark Mode">
                    Dark Mode
                    <input
                      type="checkbox"
                      id="Dark Mode"
                      className="checkbox ml-1"
                      checked={darkMode}
                      onChange={(e) => {
                        try {
                          chrome.storage.sync.set(
                            { darkModeInfo: e.target.checked },
                            function () {}
                          );
                        } catch (e) {
                          console.error(e, "setDarkMode");
                        }
                        setDarkMode(e.target.checked);
                      }}
                    />
                  </label>
                </div>
              </a>
              <a className="navbar-item">
                <span
                  onClick={() =>
                    window.open(
                      "https://github.com/TankTwo2/tt_scheduler/issues"
                    )
                  }
                >
                  GitHub
                </span>
                <span className="icon">
                  <i className="fab fa-github" />
                </span>
              </a>
              <a className="navbar-item" onClick={() => onExcelExport()}>
                엑셀 추출
              </a>
              <hr className="navbar-divider" />
              <div className="navbar-item">{loginEmail}</div>
              <div className="navbar-item">Version 1.0.0</div>
            </div>
          </div>
        </div>
        {/*<div className="navbar-end">*/}
        {/*  <div className="navbar-item">*/}
        {/*    <div className="buttons">*/}
        {/*      <a className="button is-primary">*/}
        {/*        <strong>Sign up</strong>*/}
        {/*      </a>*/}
        {/*      <a className="button is-light">Log in</a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </nav>
  );
}
