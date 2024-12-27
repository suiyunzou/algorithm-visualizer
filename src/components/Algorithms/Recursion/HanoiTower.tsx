import React from 'react';

interface Disk {
  size: number;
  position: 'A' | 'B' | 'C';
}

interface HanoiTowerProps {
  disks: Disk[];
  sourceRod: string;
  targetRod: string;
  movingDisk?: number;
}

const HanoiTower: React.FC<HanoiTowerProps> = ({
  disks,
  sourceRod,
  targetRod,
  movingDisk
}) => {
  const maxDiskWidth = 200;
  const minDiskWidth = 60;
  const diskHeight = 20;
  const rodHeight = 200;
  const rodWidth = 10;
  const baseHeight = 20;
  const spacing = 300;

  const getDiskWidth = (size: number) => {
    const totalDisks = disks.length;
    return minDiskWidth + ((maxDiskWidth - minDiskWidth) * (size - 1)) / (totalDisks - 1);
  };

  const getDisksOnRod = (rod: 'A' | 'B' | 'C') => {
    return disks.filter(disk => disk.position === rod);
  };

  const renderRod = (position: 'A' | 'B' | 'C', x: number) => {
    const disksOnRod = getDisksOnRod(position);
    
    return (
      <g key={position}>
        {/* 底座 */}
        <rect
          x={x - 100}
          y={300}
          width={200}
          height={baseHeight}
          fill="#8B4513"
        />
        
        {/* 柱子 */}
        <rect
          x={x - rodWidth/2}
          y={300 - rodHeight}
          width={rodWidth}
          height={rodHeight}
          fill="#8B4513"
        />
        
        {/* 柱子标签 */}
        <text
          x={x}
          y={340}
          textAnchor="middle"
          fill="#666"
          fontSize="16"
        >
          {position}
        </text>
        
        {/* 圆盘 */}
        {disksOnRod.map((disk, index) => {
          const width = getDiskWidth(disk.size);
          const y = 280 - (index * (diskHeight + 2));
          const isMoving = disk.size === movingDisk;
          
          return (
            <g
              key={disk.size}
              transform={isMoving ? `translate(0, -30)` : ''}
              className={isMoving ? 'transition-transform duration-300' : ''}
            >
              <rect
                x={x - width/2}
                y={y}
                width={width}
                height={diskHeight}
                rx={4}
                fill={`hsl(${disk.size * 30}, 70%, 50%)`}
                className={`transition-all duration-300 ${
                  isMoving ? 'filter drop-shadow-lg' : ''
                }`}
              />
              <text
                x={x}
                y={y + 15}
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                {disk.size}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <svg
        width="100%"
        height="400"
        viewBox="0 0 1000 400"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 渲染三根柱子 */}
        {renderRod('A', 200)}
        {renderRod('B', 500)}
        {renderRod('C', 800)}
        
        {/* 当前移动提示 */}
        {sourceRod && targetRod && (
          <g>
            <path
              d={`M ${sourceRod === 'A' ? 200 : sourceRod === 'B' ? 500 : 800} 150
                  Q ${sourceRod === 'A' ? 500 : targetRod === 'A' ? 500 : 500} 50
                  ${targetRod === 'A' ? 200 : targetRod === 'B' ? 500 : 800} 150`}
              fill="none"
              stroke="#666"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text
              x="500"
              y="30"
              textAnchor="middle"
              fill="#666"
              fontSize="14"
            >
              {sourceRod} → {targetRod}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default HanoiTower;
