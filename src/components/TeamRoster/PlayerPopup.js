import React from "react";
import Draggable from "react-draggable";

import TradeValueTrend from "./TradeValueTrend";
import StatsTable from "./StatsTable";
import StatRow from "./StatRow";

const styles = {
  container:
    "absolute z-30 bg-gray-700 text-gray-200 top-0 right-0 transform -translate-y-full py-2 px-4 rounded-lg cursor-move shadow-2xl",
  name: "text-sm",
};

const generateTradeValueTrendData = (values, leagueFormat = "halfppr") => {
  let data = [];
  if (!values) return data;

  for (let key of Object.keys(values)) {
    let datapoint = {
      week: null,
      value: null,
    };

    if (!values[key][leagueFormat].value) {
      console.log("empty object", key);
      // No trade values for this week
      datapoint = {
        week: parseInt(key.split(" ")[1]),
        value: 0,
      };
    } else {
      datapoint = {
        week: parseInt(key.split(" ")[1]),
        value: parseFloat(values[key][leagueFormat].value),
      };
    }

    data.push(datapoint);
  }

  return data.reverse();
};

const PopupHeader = ({ player, onClose }) => (
  <div className='flex justify-between text-gray-200 text-sm'>
    <div className='flex items-center'>
      <i className='fas fa-grip-vertical text-xs mr-2' />
      <p className='text-sm uppercase font-medium'>
        <span>{player.first_name + " " + player.last_name}</span>
        <span className='text-2xs ml-2'>
          {player.position} - {player.team}
        </span>
      </p>
    </div>
    <div>
      <i
        className='fas fa-times cursor-pointer text-xs'
        onClick={() => onClose()}
      />
    </div>
  </div>
);

const PlayerPopup = ({ player, leagueFormat, currentWeek, onClose }) => {
  let valueTrendData = generateTradeValueTrendData(
    player.stats_fantasyCalc?.values,
    leagueFormat
  );

  let currTradeValue =
    player.stats_fantasyCalc?.values[currentWeek][leagueFormat].value || 0;
  let currTrend =
    player.stats_fantasyCalc?.values[currentWeek][leagueFormat].trend || 0;
  let currTrendIcon = null;
  if (currTrend > 0) currTrendIcon = "fas fa-caret-up text-green-600";
  if (currTrend < 0) currTrendIcon = "fas fa-caret-down text-red-600";

  // Get icon direction

  return (
    <Draggable>
      <div className={styles.container}>
        <PopupHeader player={player} onClose={onClose} />
        <div className='my-2'>
          <StatRow
            stats={[
              {
                value: player.stats_fantasyCalc?.seasonPts || 0,
                text: "Total FPts",
                icon: "fas fa-football-ball text-2xs",
              },
              {
                value: currTradeValue,
                text: "Curr Value",
                icon: currTrendIcon,
              },
            ]}
          />
        </div>
        <div className='my-2'>
          <StatsTable
            stats={player.stats_fantasyCalc?.stats}
            seasonPts={player.stats_fantasyCalc?.seasonPts}
            position={player.position}
          />
        </div>
        <div className='my-2 flex flex-col'>
          <TradeValueTrend data={valueTrendData} />
        </div>
      </div>
    </Draggable>
  );
};

export default PlayerPopup;
