import React from 'react';

interface ComplexityAnalysisProps {
  timeComplexity: string;
  spaceComplexity: string;
}

const ComplexityAnalysis: React.FC<ComplexityAnalysisProps> = ({ timeComplexity, spaceComplexity }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Complexity Analysis</h3>
      <p><strong>Time Complexity:</strong> {timeComplexity}</p>
      <p><strong>Space Complexity:</strong> {spaceComplexity}</p>
    </div>
  );
};

export default ComplexityAnalysis;