import axios from "axios";

const promiseTemp = (idArray) => {
  const tetheredTemp = (resolve, reject) => {
    let data;
    resolve(data);
  };
  return new Promise(tetheredTemp);
};

export const calculateTotalTeamValue = (
  players,
  { currWeek = "Week 8", leagueFormat = "halfppr" }
) => {
  let valuesArr = players.map((p) => {
    if (
      p.stats_fantasyCalc &&
      p.stats_fantasyCalc.values[currWeek][leagueFormat].hasOwnProperty("value")
    ) {
      return p.stats_fantasyCalc.values[currWeek][leagueFormat].value * 1;
    } else {
      return 0;
    }
  });

  let totalValue = valuesArr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return totalValue;
};
