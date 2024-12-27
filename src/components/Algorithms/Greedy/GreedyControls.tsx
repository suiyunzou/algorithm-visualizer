import React from 'react';

interface GreedyControlsProps {
  onStart: (input: any) => void;
  onReset: () => void;
  onSetDelay: (delay: number) => void;
  isRunning: boolean;
  inputType: 'change' | 'activities';
  defaultValue?: any;
}

const GreedyControls: React.FC<GreedyControlsProps> = ({
  onStart,
  onReset,
  onSetDelay,
  isRunning,
  inputType,
  defaultValue
}) => {
  const [amount, setAmount] = React.useState(defaultValue?.amount || 63);
  const [coins, setCoins] = React.useState(defaultValue?.coins || '1,5,10,25');
  const [activities, setActivities] = React.useState(defaultValue?.activities || '0,6,8|1,4,7|2,2,4|3,3,5|4,1,3|5,5,9');
  const [delay, setDelay] = React.useState(500);

  const handleStart = () => {
    if (inputType === 'change') {
      const coinArray = coins.split(',').map(Number).filter(n => !isNaN(n));
      onStart({ amount, coins: coinArray });
    } else {
      const activityArray = activities.split('|').map(act => {
        const [id, start, end] = act.split(',').map(Number);
        return { id, start, end };
      });
      onStart(activityArray);
    }
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDelay = parseInt(e.target.value);
    setDelay(newDelay);
    onSetDelay(newDelay);
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow">
      {inputType === 'change' ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              金额
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isRunning}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              硬币面值（用逗号分隔）
            </label>
            <input
              type="text"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isRunning}
            />
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            活动列表（格式：id,开始时间,结束时间|...）
          </label>
          <input
            type="text"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isRunning}
          />
        </div>
      )}

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

export default GreedyControls;
