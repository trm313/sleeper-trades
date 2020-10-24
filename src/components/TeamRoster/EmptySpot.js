import React from "react";

const EmptySpot = () => {
  return (
    <div className='flex items-center mb-2 w-48'>
      <div className='bg-gray-700 w-10 h-6 rounded text-2xs flex items-center justify-center flex-shrink-0 mr-1'>
        {`-`}
      </div>
      <div className=''>
        <p
          className='w-24 truncate text-sm font-medium'
          title={`Empty roster spot`}
        >
          -
        </p>
        <p className='text-2xs text-gray-200'>Empty - N/a</p>
      </div>
    </div>
  );
};

export default EmptySpot;
