import React from 'react';
import { GreedyStep } from '../../../models/GreedyAlgorithm';

interface GreedyStepsProps {
  steps: GreedyStep[];
  currentStep: number;
}

const GreedySteps: React.FC<GreedyStepsProps> = ({ steps, currentStep }) => {
  const getStepColor = (step: GreedyStep) => {
    switch (step.type) {
      case 'select':
        return 'bg-green-100 border-green-500';
      case 'skip':
        return 'bg-red-100 border-red-500';
      case 'solution':
        return 'bg-blue-100 border-blue-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const getStepIcon = (step: GreedyStep) => {
    switch (step.type) {
      case 'select':
        return '✓';
      case 'skip':
        return '✗';
      case 'solution':
        return '★';
      default:
        return '•';
    }
  };

  const renderStep = (step: GreedyStep) => {
    const isCurrentStep = step.id === currentStep;
    const stepColor = getStepColor(step);
    const borderStyle = isCurrentStep ? 'border-2' : 'border';

    return (
      <div
        key={step.id}
        className={`relative p-2 rounded-lg ${stepColor} ${borderStyle} mb-2`}
      >
        <div className="flex items-center space-x-2">
          <span className="font-mono">{getStepIcon(step)}</span>
          <span className="flex-1">{step.description}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-auto max-h-[600px]">
      <div className="space-y-2">
        {steps.map(step => renderStep(step))}
      </div>
    </div>
  );
};

export default GreedySteps;
