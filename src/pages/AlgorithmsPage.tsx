import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import BubbleSort from '../components/Algorithms/BubbleSort';
import SelectionSort from '../components/Algorithms/SelectionSort';
import QuickSort from '../components/Algorithms/QuickSort';
import InsertionSort from '../components/Algorithms/InsertionSort';
import ShellSort from '../components/Algorithms/ShellSort';
import HeapSort from '../components/Algorithms/HeapSort';
import MergeSort from '../components/Algorithms/MergeSort';
import CountingSort from '../components/Algorithms/CountingSort';
import BucketSort from '../components/Algorithms/BucketSort';
import RadixSort from '../components/Algorithms/RadixSort';
import Fibonacci from '../components/Algorithms/Fibonacci';
import Hanoi from '../components/Algorithms/Hanoi';
import Permutations from '../components/Algorithms/Permutations';
import MakeChange from '../components/Algorithms/MakeChange';
import ActivitySelection from '../components/Algorithms/ActivitySelection';
import LIS from '../components/Algorithms/LIS';
import Knapsack from '../components/Algorithms/Knapsack';
import EditDistance from '../components/Algorithms/EditDistance';

const algorithms = [
  // 排序算法
  {
    path: 'bubble-sort',
    name: '冒泡排序',
    description: '一种简单的排序算法，重复地遍历要排序的序列，一次比较两个元素，交换它们的位置。',
    category: '排序算法'
  },
  {
    path: 'selection-sort',
    name: '选择排序',
    description: '一种简单直观的排序算法，每次从未排序区间选择最小的元素放到已排序区间的末尾。',
    category: '排序算法'
  },
  {
    path: 'insertion-sort',
    name: '插入排序',
    description: '一种简单直观的排序算法，对于小规模数据或基本有序的数据效率很高。',
    category: '排序算法'
  },
  {
    path: 'shell-sort',
    name: '希尔排序',
    description: '插入排序的改进版本，通过设置增量分组来提高效率，对中等规模数据性能较好。',
    category: '排序算法'
  },
  {
    path: 'heap-sort',
    name: '堆排序',
    description: '一种基于堆数据结构的排序算法，具有稳定的时间复杂度，适合大规模数据排序。',
    category: '排序算法'
  },
  {
    path: 'merge-sort',
    name: '归并排序',
    description: '一种基于分治策略的排序算法，具有稳定的时间复杂度和稳定性，适合处理大规模数据。',
    category: '排序算法'
  },
  {
    path: 'counting-sort',
    name: '计数排序',
    description: '一种非比较性的整数排序算法，通过统计元素出现次数来实现排序，适用于数据范围较小的场景。',
    category: '排序算法'
  },
  {
    path: 'bucket-sort',
    name: '桶排序',
    description: '一种分治的排序算法，将元素分配到不同的桶中，再对每个桶分别排序，适合数据分布均匀的场景。',
    category: '排序算法'
  },
  {
    path: 'radix-sort',
    name: '基数排序',
    description: '一种非比较性的整数排序算法，基于数字的每一位进行排序，从最低位开始，依次处理到最高位。',
    category: '排序算法'
  },
  {
    path: 'quick-sort',
    name: '快速排序',
    description: '一种高效的排序算法，使用分治法策略，选择基准元素将序列分为两部分，递归排序。',
    category: '排序算法'
  },
  // 递归算法
  {
    path: 'fibonacci',
    name: '斐波那契数列',
    description: '经典的递归问题，每个数是前两个数的和，通过递归调用计算第n个斐波那契数。',
    category: '递归算法'
  },
  {
    path: 'hanoi',
    name: '汉诺塔',
    description: '经典的递归问题，通过递归方式将n个圆盘从一个柱子移动到另一个柱子，遵循大盘不能放在小盘上的规则。',
    category: '递归算法'
  },
  // 回溯算法
  {
    path: 'permutations',
    name: '全排列',
    description: '使用回溯算法生成一组数字的所有可能排列，通过不断尝试和回退来找到所有解。',
    category: '回溯算法'
  },
  // 贪心算法
  {
    path: 'make-change',
    name: '找零钱问题',
    description: '使用贪心策略选择最大面值的硬币来找零，每次都选择当前最优解。',
    category: '贪心算法'
  },
  {
    path: 'activity-selection',
    name: '活动选择问题',
    description: '在一组活动中选择最多的互不重叠的活动，通过按结束时间排序来贪心选择。',
    category: '贪心算法'
  },
  // 动态规划
  {
    path: 'lis',
    name: '最长递增子序列',
    description: '使用动态规划求解序列中最长的严格递增子序列，是一个经典的动态规划问题。',
    category: '动态规划'
  },
  {
    path: 'knapsack',
    name: '0/1背包问题',
    description: '在有限的容量下，选择物品使得总价值最大，每个物品只能选择一次，是动态规划的经典应用。',
    category: '动态规划'
  },
  {
    path: 'edit-distance',
    name: '编辑距离',
    description: '计算将一个字符串转换成另一个字符串所需的最少操作次数，包括插入、删除和替换操作。',
    category: '动态规划'
  }
  // 后续可以添加更多算法
];

const AlgorithmsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop();

  // 按类别分组算法
  const algorithmsByCategory = algorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<string, typeof algorithms>);

  return (
    <div className="flex h-full">
      {/* 左侧导航栏 */}
      <div className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">算法列表</h2>
        
        {Object.entries(algorithmsByCategory).map(([category, algos]) => (
          <div key={category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              {category}
            </h3>
            <ul className="space-y-1">
              {algos.map((algo) => (
                <li key={algo.path}>
                  <Link
                    to={`/algorithms/${algo.path}`}
                    className={`
                      block px-3 py-2 rounded-md text-sm font-medium
                      ${currentPath === algo.path
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {algo.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 overflow-y-auto">
        {location.pathname === '/algorithms' ? (
          // 默认页面
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">算法可视化</h1>
            <p className="text-gray-600 mb-8">
              选择左侧的算法来查看其可视化演示和详细说明。
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.map((algo) => (
                <div
                  key={algo.path}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/algorithms/${algo.path}`)}
                >
                  <h3 className="text-xl font-semibold mb-2">{algo.name}</h3>
                  <p className="text-gray-600">{algo.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // 算法可视化区域
          <Routes>
            <Route path="bubble-sort" element={<BubbleSort />} />
            <Route path="selection-sort" element={<SelectionSort />} />
            <Route path="insertion-sort" element={<InsertionSort />} />
            <Route path="shell-sort" element={<ShellSort />} />
            <Route path="heap-sort" element={<HeapSort />} />
            <Route path="merge-sort" element={<MergeSort />} />
            <Route path="counting-sort" element={<CountingSort />} />
            <Route path="bucket-sort" element={<BucketSort />} />
            <Route path="radix-sort" element={<RadixSort />} />
            <Route path="quick-sort" element={<QuickSort />} />
            <Route path="fibonacci" element={<Fibonacci />} />
            <Route path="hanoi" element={<Hanoi />} />
            <Route path="permutations" element={<Permutations />} />
            <Route path="make-change" element={<MakeChange />} />
            <Route path="activity-selection" element={<ActivitySelection />} />
            <Route path="lis" element={<LIS />} />
            <Route path="knapsack" element={<Knapsack />} />
            <Route path="edit-distance" element={<EditDistance />} />
            {/* 后续可以添加更多算法的路由 */}
          </Routes>
        )}
      </div>
    </div>
  );
};

export default AlgorithmsPage;