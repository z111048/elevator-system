// components/ElevatorSystem.jsx
import React, { useState, useEffect } from 'react';
import FloorIndicator from './FloorIndicator';
import ElevatorShaft from './ElevatorShaft';
import ElevatorControls from './ElevatorControls';
import FirstFloorCalls from './FirstFloorCalls';
import { FLOORS, ElevatorStatus, FLOOR_DOORS_TIME } from '../constants/elevatorConstants';

const ElevatorSystem = () => {
  // 將樓層級別提取為陣列
  const floorLevels = FLOORS.map((f) => f.level);

  // 電梯狀態
  const [elevators, setElevators] = useState([
    {
      id: 1,
      currentFloor: 1,
      targetFloor: null,
      status: ElevatorStatus.IDLE,
      doorTimer: null,
      inputValue: '',
      speed: 200,
      passengers: [],
    },
    {
      id: 2,
      currentFloor: 1,
      targetFloor: null,
      status: ElevatorStatus.IDLE,
      doorTimer: null,
      inputValue: '',
      speed: 200,
    },
    {
      id: 3,
      currentFloor: 1,
      targetFloor: null,
      status: ElevatorStatus.IDLE,
      doorTimer: null,
      inputValue: '',
      speed: 200,
    },
  ]);

  // 一樓呼叫狀態
  const [firstFloorCalls, setFirstFloorCalls] = useState({
    up: false,
    down: false,
  });

  // 處理速度變更
  const handleSpeedChange = (elevatorId, newSpeed) => {
    setElevators((prevElevators) =>
      prevElevators.map((el) => (el.id === elevatorId ? { ...el, speed: parseInt(newSpeed) } : el)),
    );
  };

  // 處理緊急停止
  const handleEmergencyStop = (elevatorId) => {
    setElevators((prevElevators) =>
      prevElevators.map((el) =>
        el.id === elevatorId
          ? {
              ...el,
              status:
                el.status === ElevatorStatus.EMERGENCY_STOP
                  ? el.targetFloor
                    ? el.targetFloor > el.currentFloor
                      ? ElevatorStatus.MOVING_UP
                      : ElevatorStatus.MOVING_DOWN
                    : ElevatorStatus.IDLE
                  : ElevatorStatus.EMERGENCY_STOP,
            }
          : el,
      ),
    );
  };

  // 處理輸入值變更
  const handleInputChange = (elevatorId, value) => {
    setElevators((prevElevators) =>
      prevElevators.map((el) => (el.id === elevatorId ? { ...el, inputValue: value } : el)),
    );
  };

  // 處理電梯移動
  const handleElevatorMove = (elevatorId, targetFloor) => {
    if (floorLevels.includes(targetFloor)) {
      setElevators((prevElevators) =>
        prevElevators.map((elevator) => {
          if (elevator.id === elevatorId && elevator.status === ElevatorStatus.IDLE) {
            const status =
              targetFloor > elevator.currentFloor
                ? ElevatorStatus.MOVING_UP
                : targetFloor < elevator.currentFloor
                ? ElevatorStatus.MOVING_DOWN
                : ElevatorStatus.IDLE;

            return {
              ...elevator,
              targetFloor: targetFloor === elevator.currentFloor ? null : targetFloor,
              status: status,
              inputValue: '',
            };
          }
          return elevator;
        }),
      );
    }
  };

  // 處理新增乘客
  const handleAddPassenger = (elevatorId, passenger) => {
    setElevators((prevElevators) =>
      prevElevators.map((el) => {
        if (el.id === elevatorId) {
          const currentPassengers = el.passengers || [];
          return {
            ...el,
            passengers: [...currentPassengers, passenger],
          };
        }
        return el;
      }),
    );
  };

  // 處理移除乘客
  // 處理移除乘客
  const handleRemovePassenger = (elevatorId, passengerId) => {
    setElevators((prevElevators) =>
      prevElevators.map((el) => {
        if (el.id === elevatorId) {
          return {
            ...el,
            passengers: el.passengers.filter((p) => p.id !== passengerId),
          };
        }
        return el;
      }),
    );
  };

  // 處理一樓呼叫
  const handleFirstFloorCall = (direction) => {
    setFirstFloorCalls((prev) => ({
      ...prev,
      [direction]: true,
    }));

    setElevators((prevElevators) => {
      const availableElevators = prevElevators.filter((e) => e.status === ElevatorStatus.IDLE);

      if (availableElevators.length === 0) {
        setTimeout(() => {
          setFirstFloorCalls((prev) => ({
            ...prev,
            [direction]: false,
          }));
        }, 1000);
        return prevElevators;
      }

      const elevatorDistances = availableElevators.map((elevator) => ({
        elevator,
        distance: Math.abs(floorLevels.indexOf(elevator.currentFloor) - floorLevels.indexOf(1)),
      }));

      const closestElevator = elevatorDistances.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr,
      ).elevator;

      setTimeout(() => {
        setFirstFloorCalls((prev) => ({
          ...prev,
          [direction]: false,
        }));
      }, 1000);

      return prevElevators.map((elevator) => {
        if (elevator.id === closestElevator.id) {
          if (elevator.currentFloor === 1) {
            return {
              ...elevator,
              status: ElevatorStatus.DOORS_OPERATING,
              doorTimer: setTimeout(() => {
                setElevators((prev) =>
                  prev.map((e) =>
                    e.id === elevator.id
                      ? {
                          ...e,
                          status: ElevatorStatus.IDLE,
                          targetFloor: null,
                          doorTimer: null,
                        }
                      : e,
                  ),
                );
              }, FLOOR_DOORS_TIME),
            };
          } else {
            return {
              ...elevator,
              targetFloor: 1,
              status:
                floorLevels.indexOf(elevator.currentFloor) > floorLevels.indexOf(1)
                  ? ElevatorStatus.MOVING_DOWN
                  : ElevatorStatus.MOVING_UP,
            };
          }
        }
        return elevator;
      });
    });
  };

  // 電梯移動控制
  useEffect(() => {
    const intervals = elevators.map((elevator) => {
      if (
        !elevator.targetFloor ||
        elevator.status === ElevatorStatus.DOORS_OPERATING ||
        elevator.status === ElevatorStatus.EMERGENCY_STOP
      ) {
        return null;
      }

      return setInterval(() => {
        setElevators((prevElevators) => {
          return prevElevators.map((el) => {
            if (el.id !== elevator.id) return el;

            if (el.status === ElevatorStatus.EMERGENCY_STOP) {
              clearInterval(intervals[el.id - 1]);
              return el;
            }

            if (el.currentFloor === el.targetFloor) {
              return {
                ...el,
                status: ElevatorStatus.DOORS_OPERATING,
                doorTimer: setTimeout(() => {
                  setElevators((prev) =>
                    prev.map((e) =>
                      e.id === el.id
                        ? {
                            ...e,
                            status: ElevatorStatus.IDLE,
                            targetFloor: null,
                            doorTimer: null,
                          }
                        : e,
                    ),
                  );
                }, FLOOR_DOORS_TIME),
              };
            }

            const currentIndex = floorLevels.indexOf(el.currentFloor);
            const targetIndex = floorLevels.indexOf(el.targetFloor);

            let nextFloor;
            if (targetIndex < currentIndex) {
              nextFloor = floorLevels[currentIndex - 1];
            } else if (targetIndex > currentIndex) {
              nextFloor = floorLevels[currentIndex + 1];
            } else {
              nextFloor = el.currentFloor;
            }

            return {
              ...el,
              currentFloor: nextFloor,
              status: targetIndex < currentIndex ? ElevatorStatus.MOVING_DOWN : ElevatorStatus.MOVING_UP,
            };
          });
        });
      }, elevator.speed);
    });

    return () => {
      intervals.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
      elevators.forEach((elevator) => {
        if (elevator.doorTimer) {
          clearTimeout(elevator.doorTimer);
        }
      });
    };
  }, [elevators]);

  // components/ElevatorSystem.jsx
  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      {/* 主要電梯顯示區域 */}
      <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
        <div className='flex'>
          <FloorIndicator />
          {/* 電梯組 */}
          <div className='flex-1 grid grid-cols-3 gap-8 pl-8'>
            {elevators.map((elevator) => (
              <ElevatorShaft
                key={elevator.id}
                elevator={elevator}
                onAddPassenger={handleAddPassenger}
                onRemovePassenger={handleRemovePassenger}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 一樓呼叫控制區域 */}
      <div className='bg-white rounded-lg shadow-lg p-6 mb-6'>
        <div className='flex justify-center'>
          <FirstFloorCalls firstFloorCalls={firstFloorCalls} onFirstFloorCall={handleFirstFloorCall} />
        </div>
      </div>

      {/* 控制台區域 */}
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <div className='grid grid-cols-3 gap-8'>
          {elevators.map((elevator) => (
            <ElevatorControls
              key={elevator.id}
              elevator={elevator}
              onSpeedChange={handleSpeedChange}
              onEmergencyStop={handleEmergencyStop}
              onInputChange={handleInputChange}
              onFloorSelect={handleElevatorMove}
              onAddPassenger={handleAddPassenger}
              onRemovePassenger={handleRemovePassenger}
              floorLevels={floorLevels}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElevatorSystem;
