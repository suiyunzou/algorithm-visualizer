import { Complexity } from '../../../types';

const HashTableComplexity: Complexity = {
  title: '性能分析',
  items: [
    {
      operation: '插入',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      description: '平均情况下直接计算索引位置并插入'
    },
    {
      operation: '查找',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      description: '平均情况下直接通过哈希值访问'
    },
    {
      operation: '删除',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      description: '平均情况下可直接定位并删除'
    },
    {
      operation: '哈希冲突',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      description: '最坏情况下需要遍历链表'
    }
  ],
  summary: {
    bestCase: 'O(1)',
    averageCase: 'O(1)',
    worstCase: 'O(n)',
    spaceComplexity: 'O(n)'
  }
};

export default HashTableComplexity;
