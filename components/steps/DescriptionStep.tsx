import React from 'react';
import { PropertyData, BrochureStyle } from "../types";
import { FormInput, FormSection } from '../FormComponents';
import { FileText, Palette } from 'lucide-react';

interface DescriptionStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
  style: BrochureStyle;
  setStyle: React.Dispatch<React.SetStateAction<BrochureStyle>>;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({ data, setData, style, setStyle }) => {
  const styles = [
    { value: BrochureStyle.ARCHITECTURAL, label: 'Architectural', desc: 'Bold, structural design' },
    { value: BrochureStyle.LUXURY_MODERN, label: 'Luxury Modern', desc: 'Elegant and contemporary' },
    { value: BrochureStyle.MINIMALIST, label: 'Minimalist', desc: 'Clean and simple' },
    { value: BrochureStyle.EDITORIAL, label: 'Editorial', desc: 'Magazine-style layout' },
    { value: BrochureStyle.BRUTALIST, label: 'Brutalist', desc: 'Raw and powerful' }
  ];

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Description" 
        description="Write a compelling description that highlights what makes this property unique"
      >
        <FormInput
          label="Description"
          value={data.description}
          onChange={(v) => setData({ ...data, description: v })}
          placeholder="Describe the property's unique features, location advantages, and lifestyle benefits..."
          icon={FileText}
          multiline
          rows={6}
        />
      </FormSection>

      <FormSection 
        title="Design Style" 
        description="Choose the visual style for your brochure"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {styles.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`p-5 rounded-lg border-2 text-left transition-all ${
                style === s.value
                  ? 'bg-emerald-50 border-[#10B981] shadow-lg shadow-emerald-500/10'
                  : 'bg-white border-gray-300 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  style === s.value ? 'bg-[#10B981]' : 'bg-gray-100'
                }`}>
                  <Palette className={`w-5 h-5 ${style === s.value ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${style === s.value ? 'text-gray-900' : 'text-gray-700'}`}>
                    {s.label}
                  </h4>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </FormSection>
    </div>
  );
};

export default DescriptionStep;