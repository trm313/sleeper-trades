import React from "react";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const styles = {
  container:
    "absolute bg-gray-700 text-gray-200 top-0 right-0 transform -translate-y-full py-2 px-4 rounded-lg",
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

    console.log({ key, value: values[key] });

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

  return data;
};

const PlayerPopup = ({ player, leagueFormat, currentWeek }) => {
  let data = generateTradeValueTrendData(
    player.stats_fantasyCalc?.values,
    leagueFormat
  );

  console.log({ data });

  const trend = {
    trendHeight: 100,
    trendWidth: 200,
  };

  return (
    <div className={styles.container}>
      <div className='flex'>
        <h6 className={styles.name}>
          {player.first_name + " " + player.last_name}
        </h6>
      </div>
      <div className=''>
        {data.length === 0 ? (
          <div
            className='flex items-center justify-center'
            style={{
              height: `${trend.trendHeight}px`,
              width: `${trend.trendWidth}px`,
            }}
          >
            <p className='text-2xs uppercase text-gray-200'>No trade values</p>
          </div>
        ) : (
          <LineChart
            width={trend.trendWidth}
            height={trend.trendHeight}
            data={data}
          >
            <Line type='monotone' dataKey='value' stroke='#00b7b3' />
            <CartesianGrid stroke='#ccc' />
            <XAxis dataKey='week' />
            <YAxis />
          </LineChart>
        )}
      </div>
    </div>
  );
};

export default PlayerPopup;
