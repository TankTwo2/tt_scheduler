import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";

export default function Clock() {
  const [timeValue, setTimeValue] = useState<string>(
    moment().format("MM. DD. ddd. HH:mm")
  );

  const PrintTime = useCallback(() => {
    setTimeValue(moment().format("MM. DD. ddd. HH:mm"));
  }, []);

  useEffect(() => {
    setInterval(PrintTime, 60000);
    // eslint-disable-next-line
  }, []);

  return <div className="navbar-item">{timeValue}</div>;
}
