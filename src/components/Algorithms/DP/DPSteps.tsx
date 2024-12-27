import React from 'react';
import { DPStep } from '../../../models/DynamicProgramming';

interface DPStepsProps {
  steps: DPStep[];
  currentStep: number;
}

const DPSteps: React.FC<DPStepsProps> = ({ steps, currentStep }) => {
  const getStepColor = (step: DPStep) => {
    switch (step.type) {
      case 'init':
        return 'bg-blue-100 border-blue-500';
      case 'calculate':
        return step.state.update
          ? 'bg-green-100 border-green-500'
          : 'bg-yellow-100 border-yellow-500';
      case 'solution':
        return 'bg-purple-100 border-purple-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  const getStepIcon = (step: DPStep) => {
    switch (step.type) {
      case 'init':
        return '⚡';
      case 'calculate':
        return step.state.update ? '✓' : '🔄';
      case 'solution':
        return '★';
      default:
        return '•';
    }
  };

  const renderStep = (step: DPStep) => {
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

export default DPSteps;
