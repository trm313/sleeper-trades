import React from "react";
import Player from "./Player";
import { Chart } from "react-charts";
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineSeries,
  AreaSeries,
} from "react-vis";

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
      primary: null,
      secondary: null,
    };

    console.log({ key, value: values[key] });

    if (!values[key][leagueFormat].value) {
      console.log("empty object", key);
      // No trade values for this week
      datapoint = {
        x: parseInt(key.split(" ")[1]),
        y: 0,
      };
    } else {
      datapoint = {
        x: parseInt(key.split(" ")[1]),
        y: parseFloat(values[key][leagueFormat].value),
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
  // const data = [
  //   { x: 0, y: 8 },
  //   { x: 1, y: 5 },
  //   { x: 2, y: 4 },
  //   { x: 3, y: 9 },
  //   { x: 4, y: 1 },
  //   { x: 5, y: 7 },
  //   { x: 6, y: 6 },
  //   { x: 7, y: 3 },
  //   { x: 8, y: 2 },
  //   { x: 9, y: 0 },
  // ];

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
          <XYPlot height={trend.trendHeight} width={trend.trendWidth}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis
              tickSizeOuter={4}
              tickSizeInner={0}
              style={{
                line: { stroke: "#EDF2F9" },
                ticks: { stroke: "#EDF2F9" },
                text: {
                  stroke: "none",
                  fill: "#EDF2F9",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                },
              }}
            />
            <YAxis
              tickTotal={2}
              tickSizeOuter={4}
              tickSizeInner={0}
              style={{
                line: { stroke: "#EDF2F9" },
                ticks: { stroke: "#EDF2F9" },
                text: {
                  stroke: "none",
                  fill: "#EDF2F9",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                },
              }}
            />
            <AreaSeries
              data={data}
              color='#00b7b3'
              style={{
                strokeLinejoin: "round",
                strokeWidth: 4,
              }}
              fill='#00b7b3'
            />
          </XYPlot>
        )}
        {/* <XYPlot height={100} width={200}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data={data} />
        </XYPlot> */}
      </div>
    </div>
  );
};

export default PlayerPopup;
