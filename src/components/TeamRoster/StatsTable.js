import React from "react";

// TODO: turn statsEnum into statsEnumArr as arr of objects:
/*
[{
  category: "Passing",
  name: "Pass Att",
  subname: "Att"
}, {},...]
*/
// edit filterStatsBfyPosition
// --> turn visibilityByPositionEnum into array of categories to show
// --> visibleArr = statsEnumArr.filter where stat.category === cateory
// Return that?
// Then I can map over categories, then map over stats in that category, and show stat.category, then clustered under that would be stat.subname
// Help cut down on space, make it easier to consume

const statsEnum = {
  // 1: "Pass A/C", // Passing
  2: "Pass Att", // Passing
  3: "Pass Comp", // passing
  5: "Pass Yds", //
  6: "Pass TDs", //
  // 13: "?", // no clue what this is - seems to be incorrect Rush Att data
  14: "Rush Yds", // Rushing
  15: "Rush TDs", // Rushing
  20: "Rec", // Receiving
  21: "Rec Yds", // Receiving
  22: "Rec TDs", // Receiving
};

const filterStatsByPosition = (statsArr, playerPosition) => {
  let visibilityByPositionEnum = {
    QB: [2, 3, 5, 6, 14, 15],
    WR: [20, 21, 22, 14, 15],
    TE: [20, 21, 22, 14, 15],
    RB: [14, 15, 20, 21, 22],
    DEF: [],
    K: [],
  };

  let visArr = visibilityByPositionEnum[playerPosition];

  let visibleStats = visArr.map((i) => statsArr.find((s) => s.objKey === i));
  return visibleStats;
};

const compileStatsArr = (statsObj) => {
  let statsArr = [];
  for (const [key, value] of Object.entries(statsEnum)) {
    let statItem = {
      name: value,
      category: "",
      value: statsObj[key],
      objKey: parseInt(key),
    };
    statsArr.push(statItem);
  }
  return statsArr;
};

const StatPair = ({ name, value }) => (
  <div className='text-sm flex flex-col items-center justify-center border-r last:border-r-0 border-gray-400 px-2'>
    <p className=''>{value}</p>
    <p className='text-2xs whitespace-no-wrap'>{name}</p>
  </div>
);

const StatsTable = ({ stats, seasonPts, position }) => {
  if (!stats) {
    return null;
  }

  let statsArr = compileStatsArr(stats);
  let visibleStats = filterStatsByPosition(statsArr, position);
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
