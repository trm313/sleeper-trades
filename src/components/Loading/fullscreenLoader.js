import React from 'react';

const fullscreenLoader = ({ color = 'text-green-600', size = 'text-5xl'}) => {
  return (
    <div className="inset-0 absolute bg-gray-700 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <i className={`fas fa-circle-notch animate-spin ${color} ${size}`} />
        <h4 className="uppercase text-gray-200 text-xs mt-4">Loading</h4>
      </div>
    </div>
  )
}

export default fullscreenLoader;