import React from 'react';
import { FileText } from 'lucide-react';

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

const Header: React.FC<HeaderProps> = ({ currentStep, totalSteps }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">DreamExProp</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-600 hover:text-[#10B981] transition-colors font-medium">
            Features
          </a>
          <a href="#create" className="text-sm text-gray-600 hover:text-[#10B981] transition-colors font-medium">
            Create Brochure
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;