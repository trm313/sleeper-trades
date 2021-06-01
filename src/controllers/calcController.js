import axios from "axios";
import { positionStyles } from "../constants/styleEnums";

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

const calculateLeaguePositionSettings = (positions) => {
  let FLEX = positions.filter((p) => p === "FLEX").length;
  let RB_Min = positions.filter((p) => p === "RB").length;
  let RB_Max = RB_Min + FLEX;
  let WR_Min = positions.filter((p) => p === "WR").length;
  let WR_Max = WR_Min + FLEX;

  return {
    RB: {
      Min: RB_Min,
      Max: RB_Max,
    },
    WR: {
      Min: WR_Min,
      Max: WR_Max,
    },
  };
};

export const calculatePositionalNeeds = (
  rosterSettings,
  { currWeek = "Week 8", leagueFormat = "halfppr" }
) => {
  let positionBreakdown = calculateLeaguePositionSettings(rosterSettings);
  console.log(positionBreakdown);

  /* Notes 
  Needs to take into account...
  - # of players at the position
  - Injury statuses at the position
  - Value of the players at the position (boiled down to 'bad' || 'fine' || 'good' || 'great')
  - Number of those players they HAVE to play
  - Number of those players they CAN play (which can impact their needs at other positions technically)
  */

  /**
   * Result:
   * {
   *   strengths: ['RB', 'QB'],
   *   weaknesses: ['QB', 'TE', 'WR']
   * }
   */
};
