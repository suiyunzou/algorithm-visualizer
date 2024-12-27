import React, { useState, useEffect } from 'react';
import { HashTableStructure } from '../../models/HashTableStructure';
import HashTableVisualizer from './HashTable/HashTableVisualizer';
import HashTableOperations from './HashTable/HashTableOperations';
import HashTableComplexity from './HashTable/HashTableComplexity';

const HashTable: React.FC = () => {
  const [hashTableStructure] = useState(() => new HashTableStructure(8));
  const [state, setState] = useState(() => hashTableStructure.getState());

  useEffect(() => {
    console.log('Subscribing to hash table structure updates');
    const unsubscribe = hashTableStructure.subscribe((newState) => {
      console.log('Hash table state updated:', newState);
      setState(newState);
    });
    return () => {
      console.log('Unsubscribing from hash table structure updates');
      unsubscribe();
    };
  }, [hashTableStructure]);

  const handleSet = async (key: string, value: string) => {
    return await hashTableStructure.set(key, value);
  };

  const handleGet = async (key: string) => {
    return await hashTableStructure.get(key);
  };

  const handleDelete = async (key: string) => {
    return await hashTableStructure.delete(key);
  };

  const handleClear = async () => {
    await hashTableStructure.clear();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">哈希表可视化</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <HashTableVisualizer 
            buckets={state?.buckets || []}
            highlightBuckets={state?.highlightBuckets || []}
            highlightItems={state?.highlightItems || []}
          />
        </div>
        
        <div>
          <HashTableOperations
            onSet={handleSet}
            onGet={handleGet}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        </div>
        
        <div>
          <HashTableComplexity />
        </div>
      </div>

      {/* 哈希表统计信息 */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <span className="text-gray-600">项目数量:</span>
            <span className="ml-2 font-semibold">{state?.size || 0}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-600">容量:</span>
            <span className="ml-2 font-semibold">{state?.capacity || 0}</span>
          </div>
          <div className="text-center">
            <span className="text-gray-600">负载因子:</span>
            <span className="ml-2 font-semibold">
              {((state?.loadFactor || 0) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="text-center col-span-3">
            <span className="text-gray-600">冲突数:</span>
            <span className="ml-2 font-semibold">{state?.collisions || 0}</span>
          </div>
        </div>
      </div>

      {/* 操作提示 */}
      {state?.message && (
        <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
          {state.message}
        </div>
      )}
    </div>
  );
};

export default HashTable;
