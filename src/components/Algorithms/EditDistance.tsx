import React, { useState, useEffect } from 'react';
import { DynamicProgramming } from '../../models/DynamicProgramming';
import DPSteps from './DP/DPSteps';
import DPControls from './DP/DPControls';
import DPTable from './DP/DPTable';

const EditDistance: React.FC = () => {
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

  const handleStart = async ({ word1, word2 }: { word1: string, word2: string }) => {
    setIsRunning(true);
    await dp.editDistance(word1, word2);
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

    const { word1, word2, dp: dpArray, current, operations } = state.steps[state.currentStep].state;

    return (
      <div className="space-y-4">
        {/* 字符串显示 */}
        <div>
          <h3 className="font-semibold mb-2">字符串状态</h3>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">字符串 1:</div>
              <div className="flex gap-1">
                {word1.split('').map((char, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      current?.i === index ? 'bg-yellow-100 border-yellow-500' : 'border-gray-300'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">字符串 2:</div>
              <div className="flex gap-1">
                {word2.split('').map((char, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded border ${
                      current?.j === index ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DP 表格 */}
        <div>
          <h3 className="font-semibold mb-2">DP 表格</h3>
          <DPTable
            dp={dpArray}
            highlightCell={current ? { row: current.i + 1, col: current.j + 1 } : undefined}
            rowLabels={['', ...word1.split('')]}
            colLabels={['', ...word2.split('')]}
          />
        </div>

        {/* 编辑操作 */}
        {operations && (
          <div>
            <h3 className="font-semibold mb-2">编辑操作</h3>
            <div className="flex flex-wrap gap-2">
              {operations.map((op: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-green-100 rounded-full text-sm border border-green-500"
                >
                  {op}
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
      <h2 className="text-2xl font-bold mb-6">编辑距离（动态规划）</h2>
      
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
            inputType="editdistance"
            defaultValue={{
              word1: 'horse',
              word2: 'ros'
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(mn)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(mn)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">空间优化</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(mn)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(min(m,n))</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 算法说明 */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
            <div className="space-y-2 text-gray-700">
              <p>编辑距离（Levenshtein Distance）是一个经典的动态规划问题，用于计算将一个字符串转换成另一个字符串所需的最少操作次数。</p>
              <div className="mt-2">
                <h5 className="font-semibold">动态规划思路：</h5>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>定义 dp[i][j] 表示 word1 的前 i 个字符转换到 word2 的前 j 个字符需要的最少操作数</li>
                  <li>如果当前字符相同，不需要操作</li>
                  <li>如果不同，可以进行插入、删除或替换操作</li>
                  <li>状态转移方程：
                    <ul className="list-disc list-inside ml-4">
                      <li>如果 word1[i] {'==='} word2[j]：dp[i][j] {'='} dp[i-1][j-1]</li>
                      <li>否则：dp[i][j] {'='} min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1</li>
                    </ul>
                  </li>
                </ol>
              </div>
              <div className="mt-2 text-yellow-600">
                <p><strong>优化：</strong>可以使用滚动数组将空间复杂度优化到 O(min(m,n))。</p>
              </div>
            </div>
          </div>

          {/* 可视化说明 */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">可视化说明</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>黄色：word1 中当前正在比较的字符</li>
              <li>蓝色：word2 中当前正在比较的字符</li>
              <li>DP表格：行表示 word1 前缀，列表示 word2 前缀，值表示最小编辑距离</li>
              <li>绿色标签：显示具体的编辑操作步骤</li>
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

export default EditDistance;
