import React, { useState, useEffect } from 'react';
import { SortingAlgorithm } from '../../models/SortingAlgorithm';
import BubbleSortVisualizer from './Sorting/BubbleSortVisualizer';
import BubbleSortControls from './Sorting/BubbleSortControls';

const BucketSort: React.FC = () => {
  const [sortingAlgorithm] = useState(() => new SortingAlgorithm());
  const [state, setState] = useState(() => sortingAlgorithm.getState());
  const [isSorting, setIsSorting] = useState(false);
  const [bucketSize, setBucketSize] = useState(5);

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
    await sortingAlgorithm.bucketSort(bucketSize);
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
      <h2 className="text-2xl font-bold mb-6">桶排序可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <BubbleSortVisualizer 
            array={state.array}
          />
        </div>
        
        <div className="space-y-4">
          <BubbleSortControls
            onSort={handleSort}
            onGenerateArray={handleGenerateArray}
            onSetDelay={handleSetDelay}
            isSorting={isSorting}
          />
          
          {/* 桶大小控制 */}
          <div className="bg-white p-4 rounded-lg shadow">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              桶大小（每个桶的范围）
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={bucketSize}
              onChange={(e) => setBucketSize(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              当前值: {bucketSize}
            </div>
          </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">平均情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n + k)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n + k)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">k为桶的数量</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">最坏情况</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n²)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">O(n + k)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">所有元素在同一个桶</td>
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
                <p>桶排序是一种分治的排序算法，其原理是将数组分到有限数量的桶中，每个桶再分别排序。</p>
                <div className="mt-2">
                  <h5 className="font-semibold">工作原理：</h5>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>设置一个定量的数组当作空桶</li>
                    <li>遍历序列，将每个元素放到对应的桶中</li>
                    <li>对每个不是空的桶进行排序</li>
                    <li>按照顺序把每个桶中的元素放回原序列</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 算法特点 */}
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-green-700">算法特点</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>稳定排序算法</li>
                <li>平均时间复杂度为 O(n + k)</li>
                <li>空间复杂度为 O(n + k)</li>
                <li>桶的数量会影响排序效率</li>
                <li>适合数据分布均匀的场景</li>
              </ul>
            </div>

            {/* 性能影响因素 */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2 text-purple-700">性能影响因素</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>桶的数量选择</li>
                <li>数据分布的均匀程度</li>
                <li>桶内排序算法的选择</li>
                <li>数据规模大小</li>
                <li>内存使用限制</li>
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

export default BucketSort;
