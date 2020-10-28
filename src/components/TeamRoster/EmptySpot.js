import React from "react";
import PositionPill from "./PositionPill";

const EmptySpot = () => {
  return (
    <div className='flex items-center mb-2 w-48'>
      <PositionPill isEmpty={true} />
      <div className=''>
        <p
          className='w-24 truncate text-sm font-medium'
          title={`Empty roster spot`}
        >
          -
        </p>
        <p className='text-2xs text-gray-200'>N/A - N/A</p>
      </div>
    </div>
  );
};

export default EmptySpot;
