import React from "react";

const statsEnum = {
  // 1: "Pass A/C", // Passing
  2: "Pass Att", // Passing
  3: "Pass Comp", // passing
  5: "Pass Yds", //
  6: "Pass TDs", //
  13: "?", //
  14: "Rush Yds", // Rushing
  15: "Rush TDs", // Rushing
  20: "Rec", // Receiving
  21: "Rec Yds", // Receiving
  22: "Rec TDs", // Receiving
};

const filterStatsByPosition = (statsArr, playerPosition) => {
  let visibilityByPositionEnum = {
    QB: [2, 3, 5, 6, 13, 14, 15],
    WR: [13, 14, 15, 20, 21, 22],
    RB: [13, 14, 15, 20, 21, 22],
    TE: [13, 14, 15, 20, 21, 22],
    DEF: [],
    K: [],
  };

  let visArr = visibilityByPositionEnum[playerPosition];

  let visibleStats = visArr.map((i) => statsArr.find((s) => s.objKey === i));
  console.log("filterStatsByPosition", {
    statsArr,
    playerPosition,
    visibleStats,
    visArr,
  });
  return visibleStats;
};

const compileStatsArr = (statsObj) => {
  let statsArr = [];
  for (const [key, value] of Object.entries(statsEnum)) {
    console.log("compileStats", { key, value });
    let statItem = {
      name: statsEnum[key],
      category: "",
      value: statsObj[key],
      objKey: parseInt(key),
    };
    statsArr.push(statItem);
  }
  return statsArr;
};

const StatPair = ({ name, value }) => (
  <div className='flex flex-col items-center justify-center border-r last:border-r-0 border-gray-400 px-2'>
    <p className='text-sm'>{value}</p>
    <p className='text-xs'>{name}</p>
  </div>
);

const StatsTable = ({ stats, seasonPts, position }) => {
  if (!stats) {
    return null;
  }

  let statsArr = compileStatsArr(stats);
  let visibleStats = filterStatsByPosition(statsArr, position);
  console.log("StatsTable", { stats, statsArr, visibleStats });
  return (
    <div className=''>
      <div className='flex p-2'>
        {visibleStats.map((val, index) => (
          <StatPair name={val?.name} value={val?.value} />
        ))}
      </div>
    </div>
  );
};

export default StatsTable;
