import React from "react";
import Draggable from "react-draggable";

import TradeValueTrend from "./TradeValueTrend";
import StatsTable from "./StatsTable";

const styles = {
  container:
    "absolute z-30 bg-gray-700 text-gray-200 top-0 right-0 transform -translate-y-full py-2 px-4 rounded-lg cursor-move",
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

const PlayerPopup = ({ player, leagueFormat, currentWeek }) => {
  let data = generateTradeValueTrendData(
    player.stats_fantasyCalc?.values,
    leagueFormat
  );

  return (
    <Draggable>
      <div className={styles.container}>
        <div className='flex'>
          <h6 className={styles.name}>
            {player.first_name + " " + player.last_name}
          </h6>
        </div>
        <div className='my-2'>
          <StatsTable
            stats={player.stats_fantasyCalc?.stats}
            seasonPts={player.stats_fantasyCalc?.seasonPts}
            position={player.position}
          />
        </div>
        <div className='my-2 flex flex-col'>
          <TradeValueTrend data={data} />
        </div>
      </div>
    </Draggable>
  );
};

export default PlayerPopup;
