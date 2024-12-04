// components/StatusIcon.jsx
import React from 'react';
import { ArrowUp, ArrowDown, Pause } from 'lucide-react';
import { ElevatorStatus } from '../constants/elevatorConstants';

const StatusIcon = ({ elevator }) => {
  if (elevator.status === ElevatorStatus.EMERGENCY_STOP) {
    return <Pause className="w-6 h-6 text-white animate-pulse" />;
  }
  
  if (elevator.targetFloor === null) {
    return <Pause className="w-4 h-4 text-white" />;
  }
  
  return elevator.targetFloor > elevator.currentFloor ? (
    <ArrowUp className="w-4 h-4 text-white" />
  ) : (
    <ArrowDown className="w-4 h-4 text-white" />
  );
};

export default StatusIcon;
