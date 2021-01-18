import React, { useCallback } from "react";
import moment from "moment";
import BodyDateInput from "./bodyDateInput";

type WeekContainerType = {
  firstWeek: string;
  lastWeek: string;
  currentYY: string;
  currentMM: string;
  loginEmail: string;
};

export default function TtsBody({
  firstWeek,
  lastWeek,
  currentYY,
  currentMM,
  loginEmail,
}: WeekContainerType) {
  const LastYearLastWW = moment(Number(currentYY) - 1, "YY")
    .endOf("year")
    .format("WW");

  const trDiv = useCallback(() => {
    let n = 0;
    const tempWeek: string[] = [];
    // [49,50,51,52,53,01]
    // [53,01,02,03,04]
    if (firstWeek.slice(0, 2) === lastWeek.slice(0, 2)) {
      // 년도가 같으면 마지막 - 처음 반복문
      for (n = 0; n <= Number(lastWeek) - Number(firstWeek); n++) {
        tempWeek.push(String(Number(lastWeek) - n));
        // console.log(String(Number(lastWeek) - n), 1);
      }
    } else {
      // 년도가 다르면 전년도 마지막주 - firstWeek 반복문, 마지막주 - 해당년도 첫째주
      if (currentMM === "01") {
        for (
          n = 0;
          n <=
          Number(LastYearLastWW) -
            Number(moment(firstWeek, "YYWW").format("WW"));
          n++
        ) {
          tempWeek.push(
            String(Number(currentYY) - 1) + String(Number(LastYearLastWW) - n)
          );
          // console.log(String(Number(currentYY) - 1) + String(Number(LastYearLastWW) - n), 2)
        }
        for (n = 1; n < Number(lastWeek.slice(2)) + 1; n++) {
          if (tempWeek.length !== 6) {
            tempWeek.push(currentYY + "0" + n);
            // console.log(currentYY + '0' + n, 3)
          }
        }
      } else if (currentMM === "12") {
        //년도가 다른데 12월인 특수한경우
        let n = 0;
        while (
          moment(lastWeek, "YYWW").format("WW") !==
          moment(firstWeek, "YYWW").add(n, "w").format("WW")
        ) {
          tempWeek.push(
            currentYY + moment(firstWeek, "YYWW").add(n, "w").format("WW")
          );
          // console.log(currentYY +moment(firstWeek, 'YYWW').add(n,'w').format('WW'), 2)
          n += 1;
        }

        for (n = 1; n < Number(lastWeek.slice(2)) + 1; n++) {
          if (tempWeek.length !== 6) {
            tempWeek.push(Number(currentYY) + 1 + "0" + n);
            // console.log((Number(currentYY) + 1) + '0' + n, 3)
          }
        }
      }
    }

    tempWeek.sort();
    const headerDiv = () => {
      let tempHeaderContainer = [];
      tempHeaderContainer.push(
        <div className="column" style={{ padding: 6 }}>
          <div
            className="box"
            style={{
              padding: 6,
              textAlign: "center",
              backgroundColor: "wheat",
              fontWeight: "bold",
            }}
          >
            Week
          </div>
        </div>
      );
      let n = 0;
      while (n < 7) {
        tempHeaderContainer.push(
          <div className="column" style={{ padding: 6 }}>
            <div
              className="box"
              style={{
                padding: 6,
                textAlign: "center",
                backgroundColor: "wheat",
                fontWeight: "bold",
              }}
            >
              {moment().startOf("isoWeek").add(n, "days").format("ddd")}
            </div>
          </div>
        );
        n++;
      }
      return <div className="columns">{tempHeaderContainer}</div>;
    };
    return (
      <>
        {headerDiv()}
        {tempWeek.map((row) => (
          <div className="columns">{tdDiv(row)}</div>
        ))}
      </>
    );
  }, [lastWeek, firstWeek]);

  const tdDiv = useCallback(
    (row) => {
      let tempDivContainer = [];
      tempDivContainer.push(
        <div className="column" style={{ padding: 6 }}>
          <BodyDateInput
            header={row.substring(2, 4) + "W"}
            cellDate={row}
            loginEmail={loginEmail}
            // cellDate={moment(row, 'WW').format('YYWW')}
          />
        </div>
      );
      let n = 0;
      while (n < 7) {
        // console.log(moment(row, 'WW').startOf('isoWeek').add(n, 'days',).format('YYMMDD'))
        tempDivContainer.push(
          <div
            className="column"
            id={n === 5 || n === 6 ? "classes.tdWeekendBox" : "classes.tdBox"}
            style={{ padding: 6 }}
          >
            <BodyDateInput
              header={moment(row, "YYWW")
                .startOf("isoWeek")
                .add(n, "days")
                .format("YYMMDD")}
              cellDate={moment(row, "YYWW")
                .startOf("isoWeek")
                .add(n, "days")
                .format("YYMMDD")}
              loginEmail={loginEmail}
            />
          </div>
        );
        n++;
      }

      return tempDivContainer;
    },
    [loginEmail]
  );

  return <>{trDiv()}</>;
}
