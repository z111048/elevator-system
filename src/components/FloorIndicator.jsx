// components/FloorIndicator.jsx
import React from 'react';
import { FLOORS } from '../constants/elevatorConstants';

const FloorIndicator = () => {
  return (
    <div className='w-16 flex flex-col justify-between pr-4 border-r border-gray-300 h-[500px]'>
      {FLOORS.map((floor) => (
        <div key={floor.level} className='font-semibold text-gray-600 text-right'>
          {floor.label}
        </div>
      ))}
    </div>
  );
};

export default FloorIndicator;
