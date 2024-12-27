import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';

const CountingSort: React.FC = () => {
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
    await sortingAlgorithm.countingSort();
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
      <h2 className="text-2xl font-bold mb-6">计数排序可视化</h2>
      
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n + k)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(k)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">k为数据范围</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 当前执行统计 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-blue-700">执行统计</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">统计次数:</span>
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
                <p>计数排序是一种非比较性的整数排序算法，其核心是将输入的数据值转化为键存储在额外开辟的数组空间中。</p>
                <div className="mt-2">
                  <h5 className="font-semibold">工作原理：</h5>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>找出待排序数组中的最大值和最小值</li>
                    <li>统计数组中每个值为i的元素出现的次数</li>
                    <li>对所有的计数累加，得到每个元素的最终位置</li>
                    <li>反向填充目标数组，将每个元素放到其对应的位置</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 算法特点 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">算法特点</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>稳定排序算法</li>
                <li>非比较排序</li>
                <li>时间复杂度为 O(n + k)</li>
                <li>空间复杂度为 O(k)</li>
                <li>k 为数据范围（最大值和最小值的差）</li>
              </ul>
            </div>

            {/* 使用场景 */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-purple-700">适用场景</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>数据范围较小</li>
                <li>数据为整数</li>
                <li>要求排序稳定</li>
                <li>对时间复杂度要求高</li>
                <li>可以牺牲空间换取时间</li>
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

export default CountingSort;
