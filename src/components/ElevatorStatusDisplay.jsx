// components/ElevatorStatusDisplay.jsx
import React from 'react';
import { ElevatorStatus, formatFloor } from '../constants/elevatorConstants';

const ElevatorStatusDisplay = ({ elevator }) => {
  const getStatusText = (status, currentFloor, targetFloor) => {
    switch (status) {
      case ElevatorStatus.IDLE:
        return "待機中";
      case ElevatorStatus.EMERGENCY_STOP:
        return "緊急停止";
      case ElevatorStatus.DOORS_OPERATING:
        return "開關門中";
      default:
        return targetFloor > currentFloor ? "上行中" : "下行中";
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">電梯 #{elevator.id}</h3>
      <div className="mt-2 flex items-center justify-center space-x-2">
        <div className="bg-gray-100 rounded px-3 py-1">
          <span className="text-sm text-gray-600">目前樓層:</span>
          <span className="ml-2 font-semibold">
            {formatFloor(elevator.currentFloor)}
          </span>
        </div>
        <div className="bg-gray-100 rounded px-3 py-1">
          <span className="text-sm text-gray-600">狀態:</span>
          <span className="ml-2 font-semibold">
            {getStatusText(
              elevator.status,
              elevator.currentFloor,
              elevator.targetFloor
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ElevatorStatusDisplay;
