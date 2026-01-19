// import React from 'react';
// import { PropertyData, BrochureStyle } from "../types";
// import { FormInput, FormSection } from '../FormComponents';
// import { FileText, Palette } from 'lucide-react';

// interface DescriptionStepProps {
//   data: PropertyData;
//   setData: React.Dispatch<React.SetStateAction<PropertyData>>;
//   style: BrochureStyle;
//   setStyle: React.Dispatch<React.SetStateAction<BrochureStyle>>;
// }

// const DescriptionStep: React.FC<DescriptionStepProps> = ({ data, setData, style, setStyle }) => {
//   const styles = [
//     { value: BrochureStyle.ARCHITECTURAL, label: 'Architectural', desc: 'Bold, structural design' },
//     { value: BrochureStyle.LUXURY, label: 'Luxury ', desc: 'Elegant and contemporary' },
//     { value: BrochureStyle.MINIMALIST, label: 'Minimalist', desc: 'Clean and simple' },
//     { value: BrochureStyle.EDITORIAL, label: 'Editorial', desc: 'Magazine-style layout' },
//     { value: BrochureStyle.AVANT_GARDE, label: 'Avant-Garde', desc: 'Raw and powerful' }
//   ];

//   return (
//     <div className="space-y-8">
//       <FormSection 
//         title="Property Description" 
//         description="Write a compelling description that highlights what makes this property unique"
//       >
//         <FormInput
//           label="Description"
//           value={data.description}
//           onChange={(v) => setData({ ...data, description: v })}
//           placeholder="Describe the property's unique features, location advantages, and lifestyle benefits..."
//           icon={FileText}
//           multiline
//           rows={6}
//         />
//       </FormSection>

//       <FormSection 
//         title="Design Style" 
//         description="Choose the visual style for your brochure"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {styles.map((s) => (
//             <button
//               key={s.value}
//               onClick={() => setStyle(s.value)}
//               className={`p-5 rounded-lg border-2 text-left transition-all ${
//                 style === s.value
//                   ? 'bg-emerald-50 border-[#10B981] shadow-lg shadow-emerald-500/10'
//                   : 'bg-white border-gray-300 hover:border-emerald-300'
//               }`}
//             >
//               <div className="flex items-start gap-3">
//                 <div className={`p-2 rounded-lg ${
//                   style === s.value ? 'bg-[#10B981]' : 'bg-gray-100'
//                 }`}>
//                   <Palette className={`w-5 h-5 ${style === s.value ? 'text-white' : 'text-gray-600'}`} />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className={`font-semibold mb-1 ${style === s.value ? 'text-gray-900' : 'text-gray-700'}`}>
//                     {s.label}
//                   </h4>
//                   <p className="text-sm text-gray-600">{s.desc}</p>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </FormSection>
//     </div>
//   );
// };

// export default DescriptionStep;
import React from 'react';
import { PropertyData, BrochureStyle, TargetBuyer, UsageIntent } from '../types';
import { FormInput, FormSection } from '../FormComponents';
import { FileText, Palette, Target, Smartphone, MapPin, Plus, X } from 'lucide-react';

interface DescriptionStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
  style: BrochureStyle;
  setStyle: React.Dispatch<React.SetStateAction<BrochureStyle>>;
}

const DescriptionStep: React.FC<DescriptionStepProps> = ({ data, setData, style, setStyle }) => {
  const styles = [
    { value: BrochureStyle.LUXURY, label: 'Luxury', desc: 'Best for high-ticket / NRI buyers' },
    { value: BrochureStyle.MINIMALIST, label: 'Minimalist', desc: 'Best for WhatsApp sharing' },
    { value: BrochureStyle.ARCHITECTURAL, label: 'Architectural', desc: 'Technical & precise' },
    { value: BrochureStyle.EDITORIAL, label: 'Editorial', desc: 'Best for email & PDF sharing' },
    { value: BrochureStyle.AVANT_GARDE, label: 'Avant-Garde', desc: 'Modern & bold design' }
  ];

  const targetBuyers: { value: TargetBuyer; label: string }[] = [
    { value: 'families', label: 'Families' },
    { value: 'investors', label: 'Investors' },
    { value: 'working_professionals', label: 'Working Professionals' },
    { value: 'luxury_buyers', label: 'Luxury Buyers' },
    { value: 'nri_buyers', label: 'NRI Buyers' },
    { value: 'senior_citizens', label: 'Senior Citizens' }
  ];

  const usageIntents: { value: UsageIntent; label: string; icon: any }[] = [
    { value: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
    { value: 'email', label: 'Email', icon: FileText },
    { value: 'print', label: 'Print', icon: FileText },
    { value: 'presentation', label: 'Presentation', icon: Target },
    { value: 'website', label: 'Website', icon: MapPin }
  ];

  const toggleTargetBuyer = (buyer: TargetBuyer) => {
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        targetBuyer: prev.salesIntelligence.targetBuyer.includes(buyer)
          ? prev.salesIntelligence.targetBuyer.filter(b => b !== buyer)
          : [...prev.salesIntelligence.targetBuyer, buyer]
      }
    }));
  };

  const updateKeySellingPoint = (index: number, value: string) => {
    const points = [...data.salesIntelligence.keySellingPoints];
    points[index] = value;
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        keySellingPoints: points as [string, string, string]
      }
    }));
  };

  const addLandmark = (landmark: string) => {
    if (landmark.trim()) {
      setData(prev => ({
        ...prev,
        salesIntelligence: {
          ...prev.salesIntelligence,
          locationAdvantages: {
            ...prev.salesIntelligence.locationAdvantages,
            nearbyLandmarks: [
              ...prev.salesIntelligence.locationAdvantages.nearbyLandmarks,
              landmark.trim()
            ]
          }
        }
      }));
    }
  };

  const removeLandmark = (index: number) => {
    setData(prev => ({
      ...prev,
      salesIntelligence: {
        ...prev.salesIntelligence,
        locationAdvantages: {
          ...prev.salesIntelligence.locationAdvantages,
          nearbyLandmarks: prev.salesIntelligence.locationAdvantages.nearbyLandmarks.filter((_, i) => i !== index)
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Sales Intelligence" 
        description="Define your target audience and key selling points"
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Target className="w-4 h-4 text-[#10B981]" />
            Target Buyer(s)
            <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {targetBuyers.map(buyer => (
              <button
                key={buyer.value}
                type="button"
                onClick={() => toggleTargetBuyer(buyer.value)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  data.salesIntelligence.targetBuyer.includes(buyer.value)
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
                }`}
              >
                {buyer.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette className="w-4 h-4 text-[#10B981]" />
            3 Key Selling Points
            <span className="text-red-500">*</span>
          </label>
          {[0, 1, 2].map(index => (
            <FormInput
              key={index}
              label={`Reason ${index + 1}`}
              value={data.salesIntelligence.keySellingPoints[index]}
              onChange={(v) => updateKeySellingPoint(index, v)}
              placeholder={`e.g., ${
                index === 0 ? 'Prime location near IT parks' : 
                index === 1 ? 'Best-in-class amenities' : 
                'Excellent connectivity'
              }`}
              required
            />
          ))}
        </div>
      </FormSection>

      <FormSection 
        title="Location Advantages" 
        description="Highlight nearby landmarks and connectivity"
      >
        <LandmarkInput 
          landmarks={data.salesIntelligence.locationAdvantages.nearbyLandmarks}
          onAdd={addLandmark}
          onRemove={removeLandmark}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Metro Distance (Optional)"
            value={data.salesIntelligence.locationAdvantages.metroDistance || ''}
            onChange={(v) => setData(prev => ({
              ...prev,
              salesIntelligence: {
                ...prev.salesIntelligence,
                locationAdvantages: {
                  ...prev.salesIntelligence.locationAdvantages,
                  metroDistance: v
                }
              }
            }))}
            placeholder="e.g., 500m from Metro"
            icon={MapPin}
          />

          <FormInput
            label="Connectivity (Optional)"
            value={data.salesIntelligence.locationAdvantages.connectivity || ''}
            onChange={(v) => setData(prev => ({
              ...prev,
              salesIntelligence: {
                ...prev.salesIntelligence,
                locationAdvantages: {
                  ...prev.salesIntelligence.locationAdvantages,
                  connectivity: v
                }
              }
            }))}
            placeholder="e.g., Close to Highway"
            icon={MapPin}
          />
        </div>

        <FormInput
          label="Unique Features (Optional)"
          value={data.salesIntelligence.uniqueFeatures || ''}
          onChange={(v) => setData(prev => ({
            ...prev,
            salesIntelligence: {
              ...prev.salesIntelligence,
              uniqueFeatures: v
            }
          }))}
          placeholder="Any special aspects or unique selling propositions..."
          multiline
          rows={3}
        />
      </FormSection>

      <FormSection 
        title="Usage Intent" 
        description="How will you use this brochure?"
      >
        <div className="flex flex-wrap gap-3">
          {usageIntents.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setData(prev => ({ ...prev, usageIntent: value }))}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                data.usageIntent === value
                  ? 'bg-[#10B981] border-[#10B981] text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
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

const LandmarkInput: React.FC<{
  landmarks: string[];
  onAdd: (landmark: string) => void;
  onRemove: (index: number) => void;
}> = ({ landmarks, onAdd, onRemove }) => {
  const [input, setInput] = React.useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <MapPin className="w-4 h-4 text-[#10B981]" />
        Nearby Landmarks
      </label>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder="Add landmark (e.g., Schools, Malls, etc.)"
          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
        />
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {landmarks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {landmarks.map((landmark, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg group hover:border-emerald-300 transition-all"
            >
              <span className="text-sm text-gray-900">{landmark}</span>
              <button
                onClick={() => onRemove(i)}
                className="p-0.5 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DescriptionStep;