import React from 'react';

interface ArrayVisualizerProps {
  data: any[];
  highlightIndices: number[];
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ data, highlightIndices = [] }) => {
  return (
    <div className="flex items-center justify-center space-x-2 min-h-[200px] my-4 p-4 border rounded-lg bg-gray-50">
      {data.map((value, index) => (
        <div
          key={index}
          className={`
            flex items-center justify-center
            w-12 h-12 
            border-2 rounded-lg
            ${highlightIndices.includes(index) 
              ? 'border-blue-500 bg-blue-100' 
              : 'border-gray-300 bg-white'}
            transition-all duration-300
          `}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default ArrayVisualizer; 