import React from 'react';

interface VisualizationCanvasProps {
  data: number[];
  highlightIndices?: number[];
}

const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({ data, highlightIndices = [] }) => {
  const maxValue = Math.max(...data);

  return (
    <div className="visualization-canvas">
      {data.map((value, index) => (
        <div
          key={index}
          className={`bar ${highlightIndices.includes(index) ? 'highlighted' : ''}`}
          style={{
            height: `${(value / maxValue) * 100}%`,
            width: `${100 / data.length}%`,
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default VisualizationCanvas;