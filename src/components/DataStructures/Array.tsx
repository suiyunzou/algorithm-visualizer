import React, { useState, useEffect } from 'react';
import { ArrayStructure } from '../../models/ArrayStructure';
import ArrayVisualizer from './Array/ArrayVisualizer';
import ArrayOperations from './Array/ArrayOperations';
import ArrayComplexity from './Array/ArrayComplexity';

const Array: React.FC = () => {
  const [arrayStructure] = useState(() => {
    const initialArray = new ArrayStructure([10, 20, 30, 40, 50]);
    return initialArray;
  });

  const [state, setState] = useState(() => arrayStructure.getState());

  useEffect(() => {
    console.log('Subscribing to array structure updates');
    const unsubscribe = arrayStructure.subscribe((newState) => {
      console.log('Array state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from array structure updates');
      unsubscribe();
    };
  }, [arrayStructure]);

  const handleInsert = async (value: any, index?: number) => {
    await arrayStructure.insert(value, index);
  };

  const handleDelete = async (index: number) => {
    await arrayStructure.delete(index);
  };

  const handleSearch = async (value: any) => {
    await arrayStructure.search(value);
  };

  const handleSort = async () => {
    await arrayStructure.sort();
  };

  const handleReverse = async () => {
    await arrayStructure.reverse();
  };

  const getArrayStats = () => {
    if (!state.data || state.data.length === 0) {
      return { sum: 0, avg: 0, max: 0, min: 0 };
    }
    const sum = state.data.reduce((acc: number, val: number) => acc + val, 0);
    const avg = sum / state.data.length;
    const max = Math.max(...state.data);
    const min = Math.min(...state.data);
    return { sum, avg, max, min };
  };

  const stats = getArrayStats();

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* 可视化区域 */}
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
        <div className="h-full flex items-center justify-center">
          <ArrayVisualizer data={state?.data || []} highlightIndices={state?.highlightIndices || []} />
        </div>
      </div>

      {/* 操作区域 */}
      <div className="flex space-x-4">
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">操作</h3>
          <ArrayOperations
            onInsert={handleInsert}
            onDelete={handleDelete}
            onSearch={handleSearch}
            onSort={handleSort}
            onReverse={handleReverse}
            maxIndex={state?.data ? state.data.length : 0}
          />
        </div>
      </div>

      {/* 信息卡片区域 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">数组特点</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• 连续的内存空间</li>
            <li>• 支持随机访问</li>
            <li>• 插入和删除需要移动元素</li>
            <li>• 大小固定</li>
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">性能分析</h3>
          <ArrayComplexity />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>访问：</span>
              <span className="font-mono">O(1)</span>
            </div>
            <div className="flex justify-between">
              <span>搜索：</span>
              <span className="font-mono">O(n)</span>
            </div>
            <div className="flex justify-between">
              <span>插入：</span>
              <span className="font-mono">O(n)</span>
            </div>
            <div className="flex justify-between">
              <span>删除：</span>
              <span className="font-mono">O(n)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Array;