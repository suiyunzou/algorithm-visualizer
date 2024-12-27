import React from 'react';
import { RecursionStep } from '../../../models/RecursionAlgorithm';

interface RecursionTreeProps {
  steps: RecursionStep[];
  currentStep: number;
}

const RecursionTree: React.FC<RecursionTreeProps> = ({ steps, currentStep }) => {
  const getNodeColor = (step: RecursionStep) => {
    switch (step.state) {
      case 'active':
        return 'bg-yellow-100 border-yellow-500';
      case 'complete':
        return 'bg-green-100 border-green-500';
      case 'returning':
        return 'bg-blue-100 border-blue-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const renderNode = (step: RecursionStep) => {
    const isCurrentStep = step.id === currentStep;
    const nodeColor = getNodeColor(step);
    const borderStyle = isCurrentStep ? 'border-2' : 'border';

    return (
      <div
        key={step.id}
        className={`relative p-2 rounded-lg ${nodeColor} ${borderStyle} mb-2`}
        style={{ marginLeft: `${step.level * 40}px` }}
      >
        <div className="flex justify-between items-center">
          <div className="font-mono">
            {step.function}({step.args.join(', ')})
          </div>
          {step.result !== undefined && (
            <div className="ml-4 font-mono text-sm">
              = {step.result}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-auto max-h-[600px]">
      <div className="space-y-2">
        {steps.map(step => renderNode(step))}
      </div>
    </div>
  );
};

export default RecursionTree;
