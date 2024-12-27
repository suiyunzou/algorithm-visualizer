import React from 'react';

interface HashTableItem {
  key: string;
  value: string;
  hash?: number;
}

interface HashTableVisualizerProps {
  buckets: (HashTableItem[])[];
  highlightBuckets: number[];
  highlightItems: HashTableItem[];
}

const HashTableVisualizer: React.FC<HashTableVisualizerProps> = ({
  buckets,
  highlightBuckets,
  highlightItems
}) => {
  return (
    <div className="border rounded-lg bg-white p-4 shadow-sm overflow-x-auto">
      <div className="min-w-max">
        {buckets.map((bucket, index) => (
          <div
            key={index}
            className={`flex items-start mb-2 p-2 rounded ${
              highlightBuckets.includes(index) ? 'bg-blue-100' : 'bg-gray-50'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded mr-4">
              {index}
            </div>
            <div className="flex-1">
              {bucket.length === 0 ? (
                <div className="h-12 flex items-center text-gray-400">空桶</div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {bucket.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`
                        p-2 rounded border
                        ${highlightItems.some(hi => hi.key === item.key)
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-white border-gray-200'
                        }
                      `}
                    >
                      <div className="text-sm font-medium">
                        键: {item.key}
                      </div>
                      <div className="text-sm">
                        值: {item.value}
                      </div>
                      {item.hash !== undefined && (
                        <div className="text-xs opacity-75">
                          哈希: {item.hash}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HashTableVisualizer;
