import React from "react";

const StatItem = ({ value, text, icon = null }) => (
  <div className='flex-grow flex justify-center items-center bg-gray-800 rounded-lg py-2 px-4 mx-1'>
    <div className='flex flex-col items-center justify-center'>
      <div className='flex items-center'>
        {icon ? (
          <i className={`text-xs mr-2 ${icon}`} />
        ) : (
          <span className='mr-2 text-gray-400'>-</span>
        )}
        <p className='text-base font-semibold'>{value}</p>
      </div>

      <p className='text-2xs uppercase'>{text}</p>
    </div>
  </div>
);

const StatRow = ({
  stats = [],
  valueKey = "value",
  textKey = "text",
  iconKey = "icon",
}) => {
  return (
    <div className='flex'>
      {stats.map((s) => (
        <StatItem
          key={`stateitem-${s[textKey]}`}
          value={s[valueKey]}
          text={s[textKey]}
          icon={s[iconKey]}
        />
      ))}
    </div>
  );
};

export default StatRow;
