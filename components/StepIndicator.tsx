import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-8 h-0.5 bg-gray-200">
            <div 
              className="h-full bg-[#10B981] transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isUpcoming = step.id > currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#10B981] border-[#10B981] shadow-lg shadow-emerald-500/25'
                      : isCurrent
                      ? 'bg-[#10B981] border-[#10B981] ring-4 ring-emerald-100'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-7 h-7 text-white" />
                  ) : (
                    <div className={`${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                      {step.icon}
                    </div>
                  )}
                </div>
                <span
                  className={`mt-3 text-sm font-medium transition-colors ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;