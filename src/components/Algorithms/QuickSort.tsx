import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';

const QuickSort: React.FC = () => {
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
    await sortingAlgorithm.quickSort();
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
      <h2 className="text-2xl font-bold mb-6">快速排序可视化</h2>
      
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n log n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(log n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">每次划分都平均</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">平均情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n log n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(log n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">大部分划分较为平均</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">最坏情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n²)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">每次划分都极不平均</td>
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
                <p>快速排序使用分治法策略来把一个序列分为较小和较大的2个子序列，然后递归地排序两个子序列。</p>
                <div className="mt-2">
                  <h5 className="font-semibold">工作原理：</h5>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>选择一个基准元素（pivot）</li>
                    <li>将小于基准的元素放在基准的左边</li>
                    <li>将大于基准的元素放在基准的右边</li>
                    <li>递归地对左右两个子序列进行相同操作</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 优化建议 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">优化建议</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>选择合适的基准元素（如三数取中法）</li>
                <li>对于小规模子数组使用插入排序</li>
                <li>采用尾递归优化</li>
                <li>处理重复元素时使用三路快排</li>
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

export default QuickSort;
