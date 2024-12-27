import React from 'react';

interface StackVisualizerProps {
  items: any[];
  highlightIndices: number[];
  maxSize: number;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ items, highlightIndices = [], maxSize }) => {
  // 创建空槽位数组
  const emptySlots = Array(maxSize - items.length).fill(null);
  
  // 计算元素的大小和间距，根据总数动态调整
  const totalItems = maxSize;
  const baseSize = Math.min(40, Math.max(24, Math.floor(300 / totalItems))); // 基础大小在24-40之间动态调整
  const spacing = Math.max(4, Math.min(8, Math.floor(baseSize / 5))); // 间距随元素大小调整

  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-gray-50">
      <div className="text-sm text-gray-500 mb-2">栈容量: {maxSize}</div>
      
      {/* 栈的主体部分，使用动态大小 */}
      <div className="flex flex-col items-center" style={{ gap: `${spacing}px` }}>
        {/* 显示空槽位 */}
        {emptySlots.map((_, index) => (
          <div
            key={`empty-${index}`}
            style={{
              width: `${baseSize * 2}px`,
              height: `${baseSize}px`
            }}
            className="border-2 border-dashed border-gray-300 rounded-md bg-gray-50 flex items-center justify-center"
          >
            <span className="text-gray-400 text-xs">Empty</span>
          </div>
        ))}

        {/* 显示栈中的元素，从栈底到栈顶 */}
        {[...items].reverse().map((item, idx) => {
          const index = items.length - 1 - idx; // 计算实际索引
          return (
            <div
              key={index}
              style={{
                width: `${baseSize * 2}px`,
                height: `${baseSize}px`
              }}
              className={`
                flex flex-col items-center justify-center
                border-2 rounded-md
                ${highlightIndices.includes(index)
                  ? 'border-blue-500 bg-blue-100'
                  : 'border-gray-300 bg-white'}
                transition-all duration-300
                ${index === items.length - 1 ? 'border-green-500' : ''}
              `}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500" style={{ fontSize: `${Math.max(10, baseSize / 3)}px` }}>
                  {index === items.length - 1 ? 'Top' : `${index}`}
                </span>
                <span className="font-bold" style={{ fontSize: `${Math.max(12, baseSize / 2)}px` }}>
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 栈底部基座 */}
      <div className="mt-4 border-t-4 border-gray-300" style={{ width: `${baseSize * 2 + 20}px` }}></div>

      {/* 空栈提示 */}
      {items.length === 0 && (
        <div className="text-gray-500 text-center mt-4">
          空栈
        </div>
      )}

      {/* 栈的状态信息 */}
      <div className="mt-4 text-sm text-gray-500">
        元素个数: {items.length} / {maxSize}
      </div>
    </div>
  );
};

export default StackVisualizer;
