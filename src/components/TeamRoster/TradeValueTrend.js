import React from "react";
import { AreaChart, Area, XAxis, YAxis } from "recharts";

const NoTrendAvailable = ({ trendHeight, trendWidth }) => (
  <div
    className='flex items-center justify-center bg-gray-800 opacity-75 rounded-lg'
    style={{
      height: `${trendHeight}px`,
      width: `${trendWidth}px`,
    }}
  >
    <p className='text-2xs uppercase text-green-600'>No trade values</p>
  </div>
);

const TradeValueTrend = ({
  data = [],
  trendHeight = 100,
  trendWidth = 200,
}) => {
  return (
    <div className=''>
      {data.length === 0 ? (
        <NoTrendAvailable trendHeight={trendHeight} trendWidth={trendWidth} />
      ) : (
        <AreaChart
          width={trendWidth}
          height={trendHeight}
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          <defs>
            <linearGradient id='colorValue' x1='1' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#00b7b3' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#4ce2a7' stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type='monotone'
            dataKey='value'
            stroke='#00b7b3'
            strokeWidth={3}
            activeDot={{ r: 4 }}
            fill='url(#colorValue)'
          />
          <XAxis
            dataKey='week'
            type='number'
            domain={["dataMax-4", "dataMax"]}
            tick={{ fill: "#EDF2F9", fontSize: "0.7rem" }}
            label={{
              value: "Week",
              position: "insideBottom",
              fontSize: "0.7rem",
              fill: "#EDF2F9",
            }}
          />
          <YAxis
            type='number'
            domain={[0, "auto"]}
            tick={{ fill: "#EDF2F9", fontSize: "0.7rem" }}
            label={{
              value: "Value",
              position: "bottomLeft",
              angle: -90,
              fontSize: "0.7rem",
              fill: "#EDF2F9",
            }}
          />
        </AreaChart>
      )}
    </div>
  );
};

export default TradeValueTrend;
