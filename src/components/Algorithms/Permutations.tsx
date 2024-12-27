import React, { useState, useEffect } from 'react';
import { BacktrackingAlgorithm } from '../../models/BacktrackingAlgorithm';
import BacktrackingSteps from './Backtracking/BacktrackingSteps';
import BacktrackingControls from './Backtracking/BacktrackingControls';

const Permutations: React.FC = () => {
  const [backtrackingAlgorithm] = useState(() => new BacktrackingAlgorithm());
  const [state, setState] = useState(() => backtrackingAlgorithm.getState());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const unsubscribe = backtrackingAlgorithm.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [backtrackingAlgorithm]);

  const handleStart = async (nums: number[]) => {
    setIsRunning(true);
    await backtrackingAlgorithm.permutations(nums);
    setIsRunning(false);
  };

  const handleReset = () => {
    backtrackingAlgorithm.reset();
  };

  const handleSetDelay = (delay: number) => {
    backtrackingAlgorithm.setDelay(delay);
  };

  const renderCurrentState = () => {
    if (!state.steps[state.currentStep]) return null;
    const { current, used, trying, backtrack } = state.steps[state.currentStep].state;

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">当前排列:</span>
          <div className="flex space-x-2">
            {current.map((num: number, index: number) => (
              <div
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded border
                  ${trying !== undefined && index === current.length - 1
                    ? 'bg-yellow-100 border-yellow-500'
                    : backtrack !== undefined && index === current.length
                    ? 'bg-red-100 border-red-500'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">可用数字:</span>
          <div className="flex space-x-2">
            {used.map((isUsed: boolean, index: number) => (
              <div
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded border
                  ${isUsed
                    ? 'bg-gray-100 border-gray-300 text-gray-400'
                    : 'bg-white border-gray-300'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSolutions = () => {
    if (!state.solutions.length) return null;

    return (
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">所有解:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {state.solutions.map((solution: number[], index: number) => (
            <div
              key={index}
              className="p-2 bg-green-50 rounded border border-green-200 flex items-center justify-center"
            >
              [{solution.join(', ')}]
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">全排列回溯算法可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BacktrackingSteps
            steps={state.steps}
            currentStep={state.currentStep}
          />
        </div>
        
        <div className="space-y-6">
          <BacktrackingControls
            onStart={handleStart}
            onReset={handleReset}
            onSetDelay={handleSetDelay}
            isRunning={isRunning}
            inputType="array"
            defaultValue="1,2,3"
          />

          <div className="bg-white rounded-lg shadow p-4">
            {renderCurrentState()}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            {renderSolutions()}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">回溯实现</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n!)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 算法说明 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
            <div className="space-y-2 text-gray-700">
              <p>全排列是一个经典的回溯算法问题，目标是列出所有可能的排列组合。</p>
              <div className="mt-2">
                <h5 className="font-semibold">回溯思路：</h5>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>维护一个已使用数字的标记数组</li>
                  <li>每次选择一个未使用的数字加入当前排列</li>
                  <li>递归处理下一个位置</li>
                  <li>回溯时撤销选择，继续尝试其他数字</li>
                </ol>
              </div>
            </div>
          </div>

          {/* 可视化说明 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">可视化说明</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>黄色：当前正在尝试的数字</li>
              <li>红色：正在回溯的位置</li>
              <li>绿色：找到的完整解</li>
              <li>灰色：已使用的数字</li>
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

export default Permutations;
