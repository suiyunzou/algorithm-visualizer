import React, { useState, useEffect } from 'react';
import { DynamicProgramming } from '../../models/DynamicProgramming';
import DPSteps from './DP/DPSteps';
import DPControls from './DP/DPControls';
import DPTable from './DP/DPTable';

const Knapsack: React.FC = () => {
  const [dp] = useState(() => new DynamicProgramming());
  const [state, setState] = useState(() => dp.getState());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const unsubscribe = dp.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [dp]);

  const handleStart = async ({ weights, values, capacity }: { weights: number[], values: number[], capacity: number }) => {
    setIsRunning(true);
    await dp.knapsack(weights, values, capacity);
    setIsRunning(false);
  };

  const handleReset = () => {
    dp.reset();
  };

  const handleSetDelay = (delay: number) => {
    dp.setDelay(delay);
  };

  const renderCurrentState = () => {
    if (!state.steps[state.currentStep]) return null;

    const { weights, values, dp: dpArray, current, selected } = state.steps[state.currentStep].state;

    return (
      <div className="space-y-4">
        {/* 物品列表 */}
        <div>
          <h3 className="font-semibold mb-2">物品列表</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">物品</th>
                  {weights.map((_: any, index: number) => (
                    <th key={index} className="px-4 py-2">{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-medium">重量</td>
                  {weights.map((w: number, index: number) => (
                    <td
                      key={index}
                      className={`px-4 py-2 text-center ${
                        current?.item === index ? 'bg-yellow-100' : ''
                      } ${selected?.includes(index) ? 'bg-green-100' : ''}`}
                    >
                      {w}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">价值</td>
                  {values.map((v: number, index: number) => (
                    <td
                      key={index}
                      className={`px-4 py-2 text-center ${
                        current?.item === index ? 'bg-yellow-100' : ''
                      } ${selected?.includes(index) ? 'bg-green-100' : ''}`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* DP 表格 */}
        <div>
          <h3 className="font-semibold mb-2">DP 表格</h3>
          <DPTable
            dp={dpArray}
            highlightCell={current ? { row: current.item + 1, col: current.weight } : undefined}
          />
        </div>

        {/* 已选物品 */}
        {selected && (
          <div>
            <h3 className="font-semibold mb-2">已选物品</h3>
            <div className="flex flex-wrap gap-4">
              {selected.map((index: number) => (
                <div
                  key={index}
                  className="p-2 bg-green-100 rounded-lg border border-green-500"
                >
                  <div>物品 {index + 1}</div>
                  <div>重量: {weights[index]}</div>
                  <div>价值: {values[index]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">0/1 背包问题（动态规划）</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <DPSteps
            steps={state.steps}
            currentStep={state.currentStep}
          />
        </div>
        
        <div className="space-y-6">
          <DPControls
            onStart={handleStart}
            onReset={handleReset}
            onSetDelay={handleSetDelay}
            isRunning={isRunning}
            inputType="knapsack"
            defaultValue={{
              weights: '2,3,4,5',
              values: '3,4,5,6',
              capacity: 10
            }}
          />

          <div className="bg-white rounded-lg shadow p-4">
            {renderCurrentState()}
          </div>

          {/* 复杂度分析 */}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">动态规划</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(nW)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(nW)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">空间优化</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(nW)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(W)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 算法说明 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
            <div className="space-y-2 text-gray-700">
              <p>0/1 背包问题是一个经典的动态规划问题，目标是在有限的容量下，选择物品使得总价值最大。每个物品只能选择一次（0或1次）。</p>
              <div className="mt-2">
                <h5 className="font-semibold">动态规划思路：</h5>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>定义 dp[i][w] 表示前 i 个物品，容量为 w 时的最大价值</li>
                  <li>对于每个物品，有两种选择：放入或不放入</li>
                  <li>如果当前容量不足，则不能放入当前物品</li>
                  <li>状态转移方程：dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i]] + values[i])</li>
                </ol>
              </div>
              <div className="mt-2 text-yellow-600">
                <p><strong>优化：</strong>可以使用滚动数组将空间复杂度优化到 O(W)。</p>
              </div>
            </div>
          </div>

          {/* 可视化说明 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">可视化说明</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>黄色：当前正在考虑的物品</li>
              <li>绿色：最终选择的物品</li>
              <li>DP表格：行表示前i个物品，列表示容量，值表示最大价值</li>
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

export default Knapsack;
