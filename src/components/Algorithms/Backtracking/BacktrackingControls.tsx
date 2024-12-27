import React from 'react';

interface BacktrackingControlsProps {
  onStart: (input: any) => void;
  onReset: () => void;
  onSetDelay: (delay: number) => void;
  isRunning: boolean;
  inputType: 'array' | 'number';
  defaultValue?: any;
  maxValue?: number;
}

const BacktrackingControls: React.FC<BacktrackingControlsProps> = ({
  onStart,
  onReset,
  onSetDelay,
  isRunning,
  inputType,
  defaultValue = inputType === 'array' ? [1, 2, 3] : 4,
  maxValue = 8
}) => {
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const [delay, setDelay] = React.useState(500);

  const handleStart = () => {
    if (inputType === 'array') {
      const arr = inputValue.split(',').map(Number).filter(n => !isNaN(n));
      onStart(arr);
    } else {
      onStart(parseInt(inputValue));
    }
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = parseInt(e.target.value);
    setDelay(newDelay);
    onSetDelay(newDelay);
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {inputType === 'array' ? '输入数组 (用逗号分隔)' : `输入值 (1-${maxValue})`}
        </label>
        <input
          type={inputType === 'array' ? 'text' : 'number'}
          min={inputType === 'array' ? undefined : 1}
          max={inputType === 'array' ? undefined : maxValue}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isRunning}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          延迟 (ms): {delay}
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={delay}
          onChange={handleDelayChange}
          className="block w-full"
          disabled={isRunning}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
        >
          开始
        </button>
        <button
          onClick={onReset}
          disabled={isRunning}
          className={`flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            }`}
        >
          重置
        </button>
      </div>
    </div>
  );
};

export default BacktrackingControls;
