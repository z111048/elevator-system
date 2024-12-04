// components/controls/EmergencyButton.jsx
import React from 'react';
import { ElevatorStatus } from '../../constants/elevatorConstants';
import { AlertOctagon, Play } from 'lucide-react';

const EmergencyButton = ({ elevator, onEmergencyStop }) => {
  const isEmergencyStopped = elevator.status === ElevatorStatus.EMERGENCY_STOP;

  return (
    <button
      onClick={() => onEmergencyStop(elevator.id)}
      className={`w-full h-12 rounded-lg flex items-center justify-center gap-2 transition-all ${
        isEmergencyStopped
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20'
          : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
      } shadow-lg active:scale-95`}
    >
      {isEmergencyStopped ? (
        <>
          <Play className='w-5 h-5' />
          <span className='font-medium'>恢復運行</span>
        </>
      ) : (
        <>
          <AlertOctagon className='w-5 h-5' />
          <span className='font-medium'>緊急停止</span>
        </>
      )}
    </button>
  );
};

export default EmergencyButton;
