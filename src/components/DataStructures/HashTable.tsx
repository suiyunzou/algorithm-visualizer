import React, { useState, useEffect } from 'react';
import { HashTableStructure } from '../../models/HashTableStructure';
import HashTableVisualizer from './HashTable/HashTableVisualizer';
import HashTableOperations from './HashTable/HashTableOperations';
import hashTableComplexity from './HashTable/HashTableComplexity';
import DataStructureLayout from '../Layout/DataStructureLayout';

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

  const features = {
    title: "哈希表特点",
    items: [
      "支持快速的插入、查找和删除操作",
      "通过哈希函数将键映射到数组索引",
      "使用链地址法处理哈希冲突",
      "动态调整大小以保持性能"
    ]
  };

  return (
    <DataStructureLayout
      title="哈希表可视化"
      visualization={
        <HashTableVisualizer 
          buckets={state?.buckets || []}
          highlightBuckets={state?.highlightBuckets || []}
          highlightItems={state?.highlightItems || []}
        />
      }
      operations={
        <div>
          <HashTableOperations
            onSet={handleSet}
            onGet={handleGet}
            onDelete={handleDelete}
            onClear={handleClear}
          />
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
          {state?.message && (
            <div className="mt-4 p-2 bg-blue-100 text-blue-700 rounded">
              {state.message}
            </div>
          )}
        </div>
      }
      features={features}
      complexity={hashTableComplexity}
    />
  );
};

export default HashTable;
