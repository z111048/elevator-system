// components/controls/FloorSelector.jsx
import React from 'react';
import { ElevatorStatus, formatFloor } from '../../constants/elevatorConstants';
import { ChevronRight } from 'lucide-react';

const FloorSelector = ({ elevator, onInputChange, onFloorSelect, floorLevels }) => {
  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium text-gray-700'>樓層選擇</div>
      <div className='flex items-center gap-2'>
        <input
          type='number'
          min='-2'
          max='11'
          id={`floor-input-${elevator.id}`}
          name={`floor-input-${elevator.id}`}
          placeholder='B2(-2)~RF(11)'
          value={elevator.inputValue || ''}
          disabled={elevator.status !== ElevatorStatus.IDLE}
          onChange={(e) => onInputChange(elevator.id, e.target.value)}
          className={`flex-1 h-10 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            elevator.status !== ElevatorStatus.IDLE
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50'
          }`}
        />
        <button
          disabled={elevator.status !== ElevatorStatus.IDLE}
          onClick={() => {
            const floor = parseInt(elevator.inputValue);
            if (floorLevels.includes(floor)) {
              onFloorSelect(elevator.id, floor);
            }
          }}
          className={`h-10 px-4 rounded-lg flex items-center gap-1.5 transition-colors ${
            elevator.status !== ElevatorStatus.IDLE
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          前往
          <ChevronRight className='w-4 h-4' />
        </button>
      </div>
      {elevator.targetFloor !== null && (
        <div className='text-sm text-gray-600 flex items-center gap-2'>
          <span>目標樓層:</span>
          <span className='font-medium'>{formatFloor(elevator.targetFloor)}</span>
        </div>
      )}
    </div>
  );
};

export default FloorSelector;
