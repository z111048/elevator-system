// components/PassengerAvatar.jsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const MAX_PASSENGERS = 10; // 設定最大乘客數

const PassengerAvatar = ({ elevator, onAddPassenger, onRemovePassenger }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (Array.isArray(elevator.passengers) && elevator.passengers.length >= MAX_PASSENGERS) {
      alert(`電梯最多只能搭載 ${MAX_PASSENGERS} 位乘客`);
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();

      reader.onload = () => {
        const newPassenger = {
          id: Date.now(),
          avatar: reader.result,
          targetFloor: elevator.currentFloor,
        };

        onAddPassenger(elevator.id, newPassenger);
        setIsUploading(false);
      };

      reader.onerror = () => {
        console.error('檔案讀取錯誤');
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('上傳錯誤:', error);
      setIsUploading(false);
    }
  };

  const passengerCount = Array.isArray(elevator.passengers) ? elevator.passengers.length : 0;
  const isAtCapacity = passengerCount >= MAX_PASSENGERS;

  return (
    <div>
      <div className='flex flex-wrap gap-2 mb-2'>
        {Array.isArray(elevator.passengers) &&
          elevator.passengers.map((passenger) => (
            <div
              key={passenger.id}
              className='relative group'
              onClick={() => onRemovePassenger(elevator.id, passenger.id)}
            >
              <img
                src={passenger.avatar}
                alt='Passenger'
                className='w-8 h-8 rounded-full cursor-pointer hover:opacity-75 transition-opacity object-cover border border-gray-200'
              />
              <div className='hidden group-hover:block absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-1 rounded whitespace-nowrap'>
                點擊移除
              </div>
            </div>
          ))}
      </div>
      <label
        className={`flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 rounded p-2 border border-gray-200 transition-colors ${
          isUploading || isAtCapacity ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <input
          type='file'
          id={`passenger-upload-${elevator.id}`}
          name={`passenger-upload-${elevator.id}`}
          accept='image/*'
          onChange={handleFileUpload}
          className='hidden'
          disabled={isUploading || isAtCapacity}
        />
        {isUploading ? (
          <div className='text-gray-600 text-sm'>上傳中...</div>
        ) : isAtCapacity ? (
          <div className='text-gray-600 text-sm'>電梯已滿</div>
        ) : (
          <>
            <Upload className='w-4 h-4 text-gray-600' />
            <span className='text-sm text-gray-600'>新增乘客</span>
          </>
        )}
      </label>
      <div className='mt-2 text-xs text-gray-500 text-center'>
        乘客數：{passengerCount} / {MAX_PASSENGERS}
      </div>
    </div>
  );
};

export default PassengerAvatar;
