import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';
import BubbleSortComplexity from './Sorting/BubbleSortComplexity';

const SelectionSort: React.FC = () => {
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
    await sortingAlgorithm.selectionSort();
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
      <h2 className="text-2xl font-bold mb-6">选择排序可视化</h2>
      
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n²)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(1)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">需要进行 n-1 轮选择，每轮需要扫描未排序部分</td>
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
                  <span className="text-gray-600">交换次数:</span>
                  <span className="ml-2 font-semibold">{state.swaps}</span>
                </div>
              </div>
            </div>

            {/* 算法说明 */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
              <div className="space-y-2 text-gray-700">
                <p>选择排序是一种简单直观的排序算法。它的工作原理是：</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>首先在未排序序列中找到最小元素，存放到排序序列的起始位置</li>
                  <li>再从剩余未排序元素中继续寻找最小元素，然后放到已排序序列的末尾</li>
                  <li>重复第二步，直到所有元素均排序完毕</li>
                </ol>
              </div>
            </div>

            {/* 算法特点 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">算法特点</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>原地排序算法，不需要额外空间</li>
                <li>不稳定排序，相等元素的相对位置可能改变</li>
                <li>交换次数最少，最多进行 n-1 次交换</li>
                <li>对于小规模数据或者交换成本很高的情况，选择排序是一个很好的选择</li>
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

export default SelectionSort;
