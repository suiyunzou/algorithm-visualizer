import React, { useState, useEffect } from 'react';
import { GreedyAlgorithm } from '../../models/GreedyAlgorithm';
import GreedySteps from './Greedy/GreedySteps';
import GreedyControls from './Greedy/GreedyControls';

const MakeChange: React.FC = () => {
  const [greedyAlgorithm] = useState(() => new GreedyAlgorithm());
  const [state, setState] = useState(() => greedyAlgorithm.getState());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const unsubscribe = greedyAlgorithm.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [greedyAlgorithm]);

  const handleStart = async ({ amount, coins }: { amount: number; coins: number[] }) => {
    setIsRunning(true);
    await greedyAlgorithm.makeChange(amount, coins);
    setIsRunning(false);
  };

  const handleReset = () => {
    greedyAlgorithm.reset();
  };

  const handleSetDelay = (delay: number) => {
    greedyAlgorithm.setDelay(delay);
  };

  const renderCurrentState = () => {
    if (!state.steps[state.currentStep]) return null;

    const { remaining, result = [] } = state.steps[state.currentStep].state;

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">当前状态</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <span className="text-gray-600">剩余金额：</span>
              <span className="font-mono">{remaining}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <span className="text-gray-600">已用硬币数：</span>
              <span className="font-mono">
                {result.reduce((sum: number, { count }: { count: number }) => sum + count, 0)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">已选硬币</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {result.map(({ coin, count }: { coin: number; count: number }, index: number) => (
              <div key={index} className="p-2 bg-green-50 rounded border border-green-200">
                <div className="text-center">
                  <span className="font-mono text-lg">{coin}¢</span>
                  <span className="text-sm text-gray-500 ml-2">× {count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">找零钱问题（贪心算法）</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <GreedySteps
            steps={state.steps}
            currentStep={state.currentStep}
          />
        </div>
        
        <div className="space-y-6">
          <GreedyControls
            onStart={handleStart}
            onReset={handleReset}
            onSetDelay={handleSetDelay}
            isRunning={isRunning}
            inputType="change"
            defaultValue={{
              amount: 63,
              coins: '1,5,10,25'
            }}
          />

          <div className="bg-white rounded-lg shadow p-4">
            {renderCurrentState()}
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">情况</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间复杂度</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">空间复杂度</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">贪心实现</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 算法说明 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
            <div className="space-y-2 text-gray-700">
              <p>找零钱问题是一个经典的贪心算法问题，目标是用最少的硬币数量凑出指定金额。</p>
              <div className="mt-2">
                <h5 className="font-semibold">贪心策略：</h5>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>将硬币按面值从大到小排序</li>
                  <li>每次尽可能多地使用最大面值的硬币</li>
                  <li>如果当前面值的硬币无法使用，尝试下一个较小面值</li>
                  <li>重复直到凑出目标金额或无法继续</li>
                </ol>
              </div>
              <div className="mt-2 text-yellow-600">
                <p><strong>注意：</strong>贪心算法不一定能得到最优解，但在特定硬币系统下（如美国硬币系统）可以保证最优解。</p>
              </div>
            </div>
          </div>

          {/* 可视化说明 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">可视化说明</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>绿色：选择使用某个面值的硬币</li>
              <li>红色：跳过某个面值的硬币</li>
              <li>蓝色：找到完整解决方案</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 操作提示 */}
      {state.message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default MakeChange;
