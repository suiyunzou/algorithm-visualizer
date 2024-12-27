import React from 'react';
import { ArrayElement } from '../../../models/SortingAlgorithm';

interface BubbleSortVisualizerProps {
  array: ArrayElement[];
}

const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({ array }) => {
  const maxValue = Math.max(...array.map(item => item.value));
  
  const getBarColor = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-500';
      case 'swapping':
        return 'bg-red-500';
      case 'sorted':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-end justify-center h-64 gap-1">
        {array.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ width: `${Math.max(30, 600 / array.length)}px` }}
          >
            <div
              className={`w-full ${getBarColor(item.state)} rounded-t transition-all duration-300`}
              style={{
                height: `${(item.value / maxValue) * 200}px`,
              }}
            />
            <span className="text-xs mt-1">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
