// constants/elevatorConstants.js

export const FLOORS = [
  { level: 12, label: "RF" },
  { level: 11, label: "11F" },
  { level: 10, label: "10F" },
  { level: 9, label: "9F" },
  { level: 8, label: "8F" },
  { level: 7, label: "7F" },
  { level: 6, label: "6F" },
  { level: 5, label: "5F" },
  { level: 4, label: "4F" },
  { level: 3, label: "3F" },
  { level: 2, label: "2F" },
  { level: 1, label: "1F" },
  { level: -1, label: "B1" },
  { level: -2, label: "B2" }
];

export const ElevatorStatus = {
  IDLE: "IDLE",
  MOVING_UP: "MOVING_UP",
  MOVING_DOWN: "MOVING_DOWN",
  DOORS_OPERATING: "DOORS_OPERATING",
  EMERGENCY_STOP: "EMERGENCY_STOP"
};

export const SPEED_OPTIONS = [
  { label: "慢速", value: 500 },
  { label: "中速", value: 300 },
  { label: "快速", value: 100 }
];

export const FLOOR_DOORS_TIME = 1000;

// 格式化樓層顯示
export const formatFloor = (floor) => {
  if (floor === 12) return "RF";
  return floor < 0 ? `B${Math.abs(floor)}` : `${floor}F`;
};

// 取得電梯狀態樣式
export const getStatusStyle = (status) => {
  switch (status) {
    case ElevatorStatus.MOVING_UP:
    case ElevatorStatus.MOVING_DOWN:
      return "bg-green-500";
    case ElevatorStatus.EMERGENCY_STOP:
      return "bg-red-500";
    case ElevatorStatus.DOORS_OPERATING:
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
};
