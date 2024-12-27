import React from 'react';

interface DPControlsProps {
  onStart: (input: any) => void;
  onReset: () => void;
  onSetDelay: (delay: number) => void;
  isRunning: boolean;
  inputType: 'lis' | 'knapsack' | 'editdistance';
  defaultValue?: any;
}

const DPControls: React.FC<DPControlsProps> = ({
  onStart,
  onReset,
  onSetDelay,
  isRunning,
  inputType,
  defaultValue
}) => {
  const [sequence, setSequence] = React.useState(defaultValue?.sequence || '10,9,2,5,3,7,101,18');
  const [weights, setWeights] = React.useState(defaultValue?.weights || '2,3,4,5');
  const [values, setValues] = React.useState(defaultValue?.values || '3,4,5,6');
  const [capacity, setCapacity] = React.useState(defaultValue?.capacity || 10);
  const [word1, setWord1] = React.useState(defaultValue?.word1 || 'horse');
  const [word2, setWord2] = React.useState(defaultValue?.word2 || 'ros');
  const [delay, setDelay] = React.useState(500);

  const handleStart = () => {
    switch (inputType) {
      case 'lis':
        const nums = sequence.split(',').map(Number).filter(n => !isNaN(n));
        onStart(nums);
        break;
      case 'knapsack':
        const w = weights.split(',').map(Number).filter(n => !isNaN(n));
        const v = values.split(',').map(Number).filter(n => !isNaN(n));
        onStart({ weights: w, values: v, capacity });
        break;
      case 'editdistance':
        onStart({ word1, word2 });
        break;
    }
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = parseInt(e.target.value);
    setDelay(newDelay);
    onSetDelay(newDelay);
  };

  const renderInputs = () => {
    switch (inputType) {
      case 'lis':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              输入序列（用逗号分隔）
            </label>
            <input
              type="text"
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isRunning}
            />
          </div>
        );
      case 'knapsack':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                物品重量（用逗号分隔）
              </label>
              <input
                type="text"
                value={weights}
                onChange={(e) => setWeights(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                物品价值（用逗号分隔）
              </label>
              <input
                type="text"
                value={values}
                onChange={(e) => setValues(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                背包容量
              </label>
              <input
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isRunning}
              />
            </div>
          </>
        );
      case 'editdistance':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                字符串 1
              </label>
              <input
                type="text"
                value={word1}
                onChange={(e) => setWord1(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isRunning}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                字符串 2
              </label>
              <input
                type="text"
                value={word2}
                onChange={(e) => setWord2(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isRunning}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
      {renderInputs()}

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

export default DPControls;
