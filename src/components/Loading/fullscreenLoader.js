import React from "react";

const fullscreenLoader = ({
  color = "text-green-600",
  size = "text-5xl",
  onCancel,
}) => {
  return (
    <div className='inset-0 absolute bg-gray-700 flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <i className={`fas fa-circle-notch animate-spin ${color} ${size}`} />
        <h4 className='uppercase text-gray-200 text-xs mt-4'>Loading</h4>
        <p
          className='text-green-600 cursor-pointer text-2xs uppercase mt-4'
          onClick={() => onCancel()}
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default fullscreenLoader;
