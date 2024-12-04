// components/controls/SpeedControl.jsx
import React from 'react';
import { SPEED_OPTIONS, ElevatorStatus } from '../../constants/elevatorConstants';
import { Gauge } from 'lucide-react';

const SpeedControl = ({ elevator, onSpeedChange }) => {
  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium text-gray-700 flex items-center gap-2'>
        <Gauge className='w-4 h-4' />
        <span>移動速度</span>
      </div>
      <select
        id={`speed-select-${elevator.id}`}
        name={`speed-select-${elevator.id}`}
        value={elevator.speed}
        onChange={(e) => onSpeedChange(elevator.id, e.target.value)}
        disabled={elevator.status !== ElevatorStatus.IDLE}
        className={`w-full h-10 rounded-lg border border-gray-200 px-3 
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            elevator.status !== ElevatorStatus.IDLE
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50'
          }`}
      >
        {SPEED_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpeedControl;
