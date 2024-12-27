import React, { useState, useEffect } from 'react';
import { ArrayStructure } from '../../models/ArrayStructure';
import ArrayVisualizer from './Array/ArrayVisualizer';
import ArrayOperations from './Array/ArrayOperations';
import ArrayComplexity from './Array/ArrayComplexity';
import DataStructureLayout from '../Layout/DataStructureLayout';

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

  // 数组特点
  const features = {
    title: '数组特点',
    items: [
      '连续的内存空间',
      '支持随机访问',
      '插入和删除需要移动元素',
      '大小固定'
    ]
  };

  // 可视化组件
  const visualization = (
    <div className="h-full flex items-center justify-center">
      <ArrayVisualizer 
        data={state?.data || []} 
        highlightIndices={state?.highlightIndices || []} 
      />
    </div>
  );

  // 操作面板
  const operations = (
    <ArrayOperations
      onInsert={handleInsert}
      onDelete={handleDelete}
      onSearch={handleSearch}
      onSort={handleSort}
      onReverse={handleReverse}
      maxIndex={state?.data ? state.data.length : 0}
    />
  );

  return (
    <DataStructureLayout
      title="数组"
      visualization={visualization}
      operations={operations}
      features={features}
      complexity={ArrayComplexity}
    />
  );
};

export default Array;