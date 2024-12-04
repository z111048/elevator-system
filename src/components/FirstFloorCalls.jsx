// components/FirstFloorCalls.jsx
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const FirstFloorCalls = ({ firstFloorCalls, onFirstFloorCall }) => {
  return (
    <div className='text-center'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>一樓呼叫電梯</h2>
      <div className='inline-flex bg-gray-50 rounded-lg p-4 shadow-sm'>
        <div className='flex space-x-4'>
          <button
            onClick={() => onFirstFloorCall('up')}
            className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all shadow-sm
              ${
                firstFloorCalls.up
                  ? 'bg-green-500 text-white shadow-green-500/20'
                  : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-green-500 border border-gray-200'
              }`}
          >
            <ArrowUp className='w-8 h-8' />
          </button>
          <button
            onClick={() => onFirstFloorCall('down')}
            className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all shadow-sm
              ${
                firstFloorCalls.down
                  ? 'bg-green-500 text-white shadow-green-500/20'
                  : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-green-500 border border-gray-200'
              }`}
          >
            <ArrowDown className='w-8 h-8' />
          </button>
        </div>
      </div>
      <div className='mt-2 text-sm text-gray-500'>點擊按鈕呼叫電梯</div>
    </div>
  );
};

export default FirstFloorCalls;
