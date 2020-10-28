import React from "react";
import { positionStyles } from "../../constants/styleEnums";

const PositionPill = ({
  position,
  isBenched = false,
  isReserve = false,
  isEmpty = false,
}) => {
  if (isEmpty) {
    return (
      <div className='bg-gray-700 w-10 h-6 rounded text-2xs flex items-center justify-center flex-shrink-0 mr-1'>
        {`-`}
      </div>
    );
  }

  let bgColor;
  let posText = positionStyles[position].text;
  if (isReserve) {
    bgColor = positionStyles.IR.bgColor;
    // posText = positionStyles.IR.text;
  } else if (isBenched) {
    bgColor = positionStyles.BN.bgColor;
    // posText = positionStyles.BN.text;
  } else {
    bgColor = positionStyles[position].bgColor;
    posText = positionStyles[position].text;
  }

  return (
    <div
      className='w-10 h-6 rounded text-2xs flex items-center justify-center flex-shrink-0 mr-1'
      style={{
        backgroundColor: bgColor,
        borderBottom: isBenched
          ? `3px solid ${positionStyles[position].bgColor}`
          : "none",
      }}
    >
      {posText}
    </div>
  );
};

export default PositionPill;
