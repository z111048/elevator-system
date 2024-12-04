// components/ElevatorControls.jsx
import React from 'react';
import SpeedControl from './controls/SpeedControl';
import EmergencyButton from './controls/EmergencyButton';
import FloorSelector from './controls/FloorSelector';
import ElevatorStatusDisplay from './ElevatorStatusDisplay';
import PassengerAvatar from './PassengerAvatar';

const ElevatorControls = ({
  elevator,
  onSpeedChange,
  onEmergencyStop,
  onInputChange,
  onFloorSelect,
  onAddPassenger,
  onRemovePassenger,
  floorLevels,
}) => {
  return (
    <div className='space-y-4'>
      {/* 主控制面板 */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* 電梯狀態顯示區 */}
        <div className='bg-gray-50 px-4 py-3 border-b border-gray-100'>
          <ElevatorStatusDisplay elevator={elevator} />
        </div>

        {/* 控制選項區 */}
        <div className='p-4 grid grid-cols-2 gap-4'>
          {/* 左側：基本控制 */}
          <div className='space-y-4'>
            <div className='bg-gray-50 rounded-lg p-3'>
              <SpeedControl elevator={elevator} onSpeedChange={onSpeedChange} />
            </div>
            <EmergencyButton elevator={elevator} onEmergencyStop={onEmergencyStop} />
          </div>

          {/* 右側：樓層選擇和乘客管理 */}
          <div className='space-y-4'>
            <div className='bg-gray-50 rounded-lg p-3'>
              <FloorSelector
                elevator={elevator}
                onInputChange={onInputChange}
                onFloorSelect={onFloorSelect}
                floorLevels={floorLevels}
              />
            </div>
          </div>
        </div>

        {/* 乘客管理區 */}
        <div className='border-t border-gray-100'>
          <div className='p-4'>
            <div className='bg-gray-50 rounded-lg p-4'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>乘客管理</span>
                {Array.isArray(elevator.passengers) && (
                  <span className='text-xs text-gray-500'>({elevator.passengers.length}/10)</span>
                )}
              </div>
              <PassengerAvatar
                elevator={elevator}
                onAddPassenger={onAddPassenger}
                onRemovePassenger={onRemovePassenger}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElevatorControls;
