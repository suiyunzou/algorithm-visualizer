import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

interface QueueVisualizerProps {
  items: any[];
  highlightIndices: number[];
  front: number;
  rear: number;
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ 
  items, 
  highlightIndices = [], 
  front, 
  rear 
}) => {
  return (
    <div className="flex flex-col items-center space-y-8 min-h-[300px] my-4 p-4 border rounded-lg bg-gray-50">
      {/* 队列元素 */}
      <div className="flex items-center justify-start space-x-4 overflow-x-auto w-full">
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            {index < items.length - 1 && (
              <div className="flex items-center mx-2">
                <FiArrowRight className="text-blue-500" />
              </div>
            )}
            <div
              className={`
                flex flex-col items-center justify-center
                w-24 h-16
                border-2 rounded-lg
                ${highlightIndices.includes(index)
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white'}
                ${index === front ? 'border-green-500' : ''}
                ${index === rear ? 'border-yellow-500' : ''}
                transition-all duration-300
              `}
            >
              <span className="text-sm text-gray-500">
                {index === front ? 'Front' : index === rear ? 'Rear' : `Index ${index}`}
              </span>
              <span className="font-bold">{item.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 队列为空时的提示 */}
      {items.length === 0 && (
        <div className="text-gray-500 text-center w-full">
          空队列
        </div>
      )}

      {/* 队列指示器 */}
      <div className="flex justify-between w-full px-8">
        <div className="text-sm text-green-600">Front: {front}</div>
        <div className="text-sm text-yellow-600">Rear: {rear}</div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
