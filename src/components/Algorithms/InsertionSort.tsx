import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';

const InsertionSort: React.FC = () => {
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
    await sortingAlgorithm.insertionSort();
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
      <h2 className="text-2xl font-bold mb-6">插入排序可视化</h2>
      
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">最好情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(1)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">数组已经有序</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">平均情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n²)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(1)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">需要部分元素移动</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">最坏情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n²)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(1)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">数组完全逆序</td>
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
                <p>插入排序是一种简单直观的排序算法，它的工作原理是：</p>
                <div className="mt-2">
                  <h5 className="font-semibold">工作原理：</h5>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>从第一个元素开始，该元素可以认为已经被排序</li>
                    <li>取出下一个元素，在已经排序的元素序列中从后向前扫描</li>
                    <li>如果该元素大于新元素，将该元素移到下一位置</li>
                    <li>重复步骤3，直到找到已排序的元素小于或等于新元素的位置</li>
                    <li>将新元素插入到该位置</li>
                    <li>重复步骤2~5，直到所有元素排序完成</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 算法特点 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">算法特点</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>稳定排序算法</li>
                <li>原地排序算法，只需要一个额外空间</li>
                <li>对于小规模数据或基本有序的数据效率很高</li>
                <li>适合插入新元素到已排序的数组中</li>
                <li>对于大规模乱序数组效率较低</li>
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

export default InsertionSort;
