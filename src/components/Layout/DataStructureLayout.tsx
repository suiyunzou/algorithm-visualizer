import React from 'react';

interface Feature {
  title: string;
  items: string[];
}

interface ComplexityItem {
  operation: string;
  timeComplexity: string;
}

interface Complexity {
  title: string;
  items: ComplexityItem[];
}

interface DataStructureLayoutProps {
  title: string;
  visualization: React.ReactNode;
  operations: React.ReactNode;
  features: Feature;
  complexity: Complexity;
}

const DataStructureLayout: React.FC<DataStructureLayoutProps> = ({
  title,
  visualization,
  operations,
  features,
  complexity
}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      <div className="flex flex-col gap-4">
        {/* 可视化和操作区域 */}
        <div className="flex flex-col gap-4">
          {/* 可视化区域 */}
          <div className="w-full">
            {visualization}
          </div>

          {/* 操作区域 */}
          <div className="w-full border rounded-lg">
            {operations}
          </div>

          {/* 特点说明 */}
          <div className="w-full flex gap-4">
            <div className="flex-1 border rounded-lg bg-blue-50 p-4">
              <h3 className="text-lg font-medium mb-2">{features.title}</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {features.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            {/* 性能分析 */}
            <div className="flex-1 border rounded-lg bg-blue-50 p-4">
              <h3 className="text-lg font-medium mb-2">{complexity.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                {complexity.items.map((item, index) => (
                  <React.Fragment key={index}>
                    <div>{item.operation}:</div>
                    <div className="text-right">{item.timeComplexity}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataStructureLayout;
