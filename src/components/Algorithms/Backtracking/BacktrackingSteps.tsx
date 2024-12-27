import React from 'react';
import { BacktrackingStep } from '../../../models/BacktrackingAlgorithm';

interface BacktrackingStepsProps {
  steps: BacktrackingStep[];
  currentStep: number;
}

const BacktrackingSteps: React.FC<BacktrackingStepsProps> = ({ steps, currentStep }) => {
  const getStepColor = (step: BacktrackingStep) => {
    switch (step.type) {
      case 'try':
        return 'bg-yellow-100 border-yellow-500';
      case 'solution':
        return 'bg-green-100 border-green-500';
      case 'backtrack':
        return 'bg-red-100 border-red-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const getStepIcon = (step: BacktrackingStep) => {
    switch (step.type) {
      case 'try':
        return '→';
      case 'solution':
        return '✓';
      case 'backtrack':
        return '←';
      default:
        return '•';
    }
  };

  const renderStep = (step: BacktrackingStep) => {
    const isCurrentStep = step.id === currentStep;
    const stepColor = getStepColor(step);
    const borderStyle = isCurrentStep ? 'border-2' : 'border';

    return (
      <div
        key={step.id}
        className={`relative p-2 rounded-lg ${stepColor} ${borderStyle} mb-2`}
        style={{ marginLeft: `${step.level * 20}px` }}
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

export default BacktrackingSteps;
