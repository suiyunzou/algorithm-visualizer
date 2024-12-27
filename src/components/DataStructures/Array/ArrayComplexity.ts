import { Complexity } from '../../../components/Layout/DataStructureLayout';

const ArrayComplexity: Complexity = {
  title: '性能分析',
  items: [
    {
      operation: '访问元素',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      description: '通过索引直接访问，时间复杂度为常数'
    },
    {
      operation: '插入元素',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: '最坏情况需要移动所有后续元素'
    },
    {
      operation: '删除元素',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: '最坏情况需要移动所有后续元素'
    },
    {
      operation: '查找元素',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: '需要遍历整个数组进行比较'
    }
  ],
  summary: {
    bestCase: 'O(1)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
    spaceComplexity: 'O(1)'
  }
} as const;

export default ArrayComplexity;
