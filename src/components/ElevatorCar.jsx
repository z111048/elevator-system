// components/ElevatorCar.jsx
import React from 'react';
import StatusIcon from './StatusIcon';
import { getStatusStyle, FLOORS } from '../constants/elevatorConstants';

const ElevatorCar = ({ elevator }) => {
  const getFloorPosition = (floorLevel) => {
    const floorHeight = 500 / (FLOORS.length - 1);
    const index = FLOORS.findIndex((f) => f.level === floorLevel);
    if (index === -1) return '0px';
    return `${(index - 1) * floorHeight}px`;
  };

  const elevatorStyle = {
    height: `${500 / (FLOORS.length - 1)}px`,
    top: getFloorPosition(elevator.currentFloor),
  };

  return (
    <div
      className={`absolute inset-x-0 ${getStatusStyle(elevator.status)} rounded transition-all duration-500`}
      style={elevatorStyle}
    >
      {/* 電梯內部容器 - 整體使用水平布局 */}
      <div className='h-full flex items-center px-3'>
        {/* 左側：電梯編號和狀態 */}
        <div className='flex items-center gap-2 mr-3'>
          <div
            className={`bg-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm
              ${elevator.status === 'EMERGENCY_STOP' ? 'animate-pulse' : ''}`}
          >
            {elevator.id}
          </div>
          <StatusIcon elevator={elevator} />
          {elevator.status === 'EMERGENCY_STOP' && (
            <div className='text-white text-xs animate-pulse whitespace-nowrap'>緊急停止中</div>
          )}
        </div>

        {/* 右側：乘客區域 */}
        <div className='flex gap-1.5 items-center'>
          {/* 已有乘客 */}
          {Array.isArray(elevator.passengers) &&
            elevator.passengers.map((passenger) => (
              <div key={passenger.id} className='w-6 h-6 flex-shrink-0'>
                <img
                  src={passenger.avatar}
                  alt='Passenger'
                  className='w-full h-full rounded-full object-cover border-2 border-white/50'
                />
              </div>
            ))}
          {/* 空位顯示 */}
          {Array.from({ length: Math.max(0, 15 - (elevator.passengers?.length || 0)) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className='w-6 h-6 rounded-full border-2 border-dashed border-white/30 flex-shrink-0'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElevatorCar;
