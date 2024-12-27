import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';

const MergeSort: React.FC = () => {
  const [sortingAlgorithm] = useState(() => new SortingAlgorithm());
  const [state, setState] = useState(() => sortingAlgorithm.getState());
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    // 生成初始数组
    handleGenerateArray(10);

    // 订阅状态更新
    const unsubscribe = sortingAlgorithm.subscribe((newState) => {
      setState(newState);
    });

    return () => {
      unsubscribe();
    };
  }, [sortingAlgorithm]);

  const handleSort = async () => {
    setIsSorting(true);
    await sortingAlgorithm.mergeSort();
    setIsSorting(false);
  };

  const handleGenerateArray = (size: number) => {
    sortingAlgorithm.generateRandomArray(size);
  };

  const handleSetDelay = (delay: number) => {
    sortingAlgorithm.setDelay(delay);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">归并排序可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <BubbleSortVisualizer 
            array={state.array}
          />
        </div>
        
        <div>
          <BubbleSortControls
            onSort={handleSort}
            onGenerateArray={handleGenerateArray}
            onSetDelay={handleSetDelay}
            isSorting={isSorting}
          />
        </div>
        
        <div>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">情况</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间复杂度</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">空间复杂度</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">说明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">所有情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n log n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">稳定的时间复杂度</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 当前执行统计 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-700">执行统计</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">比较次数:</span>
                  <span className="ml-2 font-semibold">{state.comparisons}</span>
                </div>
                <div>
                  <span className="text-gray-600">移动次数:</span>
                  <span className="ml-2 font-semibold">{state.swaps}</span>
                </div>
              </div>
            </div>

            {/* 算法说明 */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
              <div className="space-y-2 text-gray-700">
                <p>归并排序是一种分治算法，其基本思想是将两个有序的子序列合并成一个有序序列。</p>
                <div className="mt-2">
                  <h5 className="font-semibold">工作原理：</h5>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>将待排序序列分成若干个长度为1的子序列</li>
                    <li>将相邻的子序列两两合并，得到新的有序序列</li>
                    <li>重复步骤2，直到只剩下一个序列</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 算法特点 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">算法特点</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>稳定排序算法</li>
                <li>分治策略，将问题分解为更小的子问题</li>
                <li>最好、最坏、平均时间复杂度都是 O(n log n)</li>
                <li>需要额外的 O(n) 空间</li>
                <li>适合处理大规模数据</li>
              </ul>
            </div>

            {/* 分治策略说明 */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-purple-700">分治策略</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>分解：将问题分解为若干个规模较小的子问题</li>
                <li>解决：递归地求解各个子问题</li>
                <li>合并：将子问题的解合并成原问题的解</li>
                <li>递归终止条件：子序列长度为1</li>
                <li>合并操作是算法的关键</li>
              </ul>
            </div>
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

export default MergeSort;
