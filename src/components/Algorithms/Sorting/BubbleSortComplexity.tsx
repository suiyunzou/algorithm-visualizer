import React from 'react';

interface BubbleSortComplexityProps {
  comparisons: number;
  swaps: number;
}

const BubbleSortComplexity: React.FC<BubbleSortComplexityProps> = ({
  comparisons,
  swaps
}) => {
  const complexityData = [
    { case: '最好情况', time: 'O(n)', space: 'O(1)', description: '数组已经有序' },
    { case: '平均情况', time: 'O(n²)', space: 'O(1)', description: '随机顺序的数组' },
    { case: '最坏情况', time: 'O(n²)', space: 'O(1)', description: '数组完全逆序' },
  ];

  return (
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
            {complexityData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.case}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.space}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 当前执行统计 */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2 text-blue-700">执行统计</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600">比较次数:</span>
            <span className="ml-2 font-semibold">{comparisons}</span>
          </div>
          <div>
            <span className="text-gray-600">交换次数:</span>
            <span className="ml-2 font-semibold">{swaps}</span>
          </div>
        </div>
      </div>

      {/* 算法说明 */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2 text-yellow-700">算法说明</h4>
        <div className="space-y-2 text-gray-700">
          <p>冒泡排序是一种简单的排序算法，它重复地遍历要排序的序列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。</p>
          <div className="mt-2">
            <h5 className="font-semibold">工作原理：</h5>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>比较相邻的元素，如果第一个比第二个大，就交换它们</li>
              <li>对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对</li>
              <li>针对所有的元素重复以上的步骤，除了最后一个</li>
              <li>持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 优化建议 */}
      <div className="bg-green-50 rounded-lg p-4">
        <h4 className="text-lg font-semibold mb-2 text-green-700">优化建议</h4>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>添加标志位记录是否发生交换，如果没有交换说明数组已经有序，可以提前结束</li>
          <li>记录上一轮最后一次交换的位置，下一轮只需要扫描到该位置即可</li>
          <li>同时找最大值和最小值，可以同时进行"上浮"和"下沉"</li>
        </ul>
      </div>
    </div>
  );
};

export default BubbleSortComplexity;
