// components/ElevatorShaft.jsx
import React from 'react';
import ElevatorCar from './ElevatorCar';
import { FLOORS } from '../constants/elevatorConstants';

const ElevatorShaft = ({ elevator }) => {
  return (
    <div className='relative h-[500px]'>
      {/* 電梯井道背景 */}
      <div className='absolute inset-0 bg-gray-200 rounded overflow-hidden'>
        {/* 樓層標記線 */}
        {FLOORS.map((floor, index) => (
          <div
            key={floor.level}
            className={`absolute left-0 right-0 h-px ${floor.level === 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
            style={{
              top: `${index * (500 / (FLOORS.length - 1))}px`,
            }}
          />
        ))}
        {/* 電梯箱體 - 減少左右邊距以容納更寬的內容 */}
        <div className='absolute inset-x-2'>
          <ElevatorCar elevator={elevator} />
        </div>
      </div>
    </div>
  );
};

export default ElevatorShaft;
