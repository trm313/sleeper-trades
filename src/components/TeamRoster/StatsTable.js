import React from "react";

const statsEnum = {
  1: "A/C",
  2: "Yds", // Passing
  3: "TDs", // passing
  5: "Att", // Rushing
  6: "Yds", // Rushing
  13: "TDs", // Rushing
  14: "Rec", // Receiving
  15: "Yds", // Receiving
  20: "TDs", // Receiving
  21: "",
  22: "",
};
// Some of thse are wrong...

const StatsTable = ({ stats, seasonPts, position }) => {
  return (
    <div className=''>
      <p>Stats Table</p>
    </div>
  );
};

export default StatsTable;
