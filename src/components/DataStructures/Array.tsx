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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">数组可视化</h2>
      
      <ArrayVisualizer 
        data={state?.data || []}
        highlightIndices={state?.highlightIndices || []}
      />
      
      <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">总和</div>
          <div className="font-bold">{stats.sum}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">平均值</div>
          <div className="font-bold">{stats.avg.toFixed(2)}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">最大值</div>
          <div className="font-bold">{stats.max}</div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">最小值</div>
          <div className="font-bold">{stats.min}</div>
        </div>
      </div>
      
      <ArrayOperations
        onInsert={handleInsert}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onSort={handleSort}
        onReverse={handleReverse}
        maxIndex={state?.data ? state.data.length : 0}
      />
      
      <ArrayComplexity />
    </div>
  );
};

export default Array;