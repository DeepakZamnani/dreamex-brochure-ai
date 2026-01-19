// import React, { useState } from 'react';
// import { PropertyData } from '.././types';
// import { FormSection } from "../FormComponents";
// import { Plus, X, Sparkles } from 'lucide-react';

// interface FeaturesStepProps {
//   data: PropertyData;
//   setData: React.Dispatch<React.SetStateAction<PropertyData>>;
// }

// const FeaturesStep: React.FC<FeaturesStepProps> = ({ data, setData }) => {
//   const [newAmenity, setNewAmenity] = useState('');

//   const addAmenity = () => {
//     if (newAmenity.trim()) {
//       setData((prev) => ({
//         ...prev,
//         amenities: [...prev.amenities, newAmenity.trim()]
//       }));
//       setNewAmenity('');
//     }
//   };

//   const removeAmenity = (index: number) => {
//     setData((prev) => ({
//       ...prev,
//       amenities: prev.amenities.filter((_, i) => i !== index)
//     }));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       addAmenity();
//     }
//   };

//   const suggestedFeatures = [
//     'Swimming Pool',
//     'Home Theater',
//     'Smart Home System',
//     'Gourmet Kitchen',
//     'Wine Cellar',
//     'Gym',
//     'Garden',
//     'Garage',
//     'Security System',
//     'Solar Panels'
//   ];

//   return (
//     <div className="space-y-8">
//       <FormSection 
//         title="Property Features & Amenities" 
//         description="Highlight the key features that make this property special"
//       >
//         <div className="flex gap-3">
//           <input
//             type="text"
//             value={newAmenity}
//             onChange={(e) => setNewAmenity(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Add a feature (e.g., Swimming Pool)"
//             className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
//           />
//           <button
//             onClick={addAmenity}
//             className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
//           >
//             <Plus className="w-5 h-5" />
//           </button>
//         </div>

//         {data.amenities.length > 0 && (
//           <div className="flex flex-wrap gap-3 mt-4">
//             {data.amenities.map((amenity, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg group hover:border-emerald-300 transition-all"
//               >
//                 <span className="text-sm text-gray-900">{amenity}</span>
//                 <button
//                   onClick={() => removeAmenity(i)}
//                   className="p-1 hover:bg-red-100 rounded transition-colors"
//                 >
//                   <X className="w-4 h-4 text-gray-500 hover:text-red-600" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {data.amenities.length === 0 && (
//           <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
//             <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500 text-sm mb-4">No features added yet</p>
//           </div>
//         )}

//         <div className="mt-6">
//           <p className="text-sm text-gray-600 mb-3 font-medium">Quick Add:</p>
//           <div className="flex flex-wrap gap-2">
//             {suggestedFeatures.map((feature, i) => (
//               <button
//                 key={i}
//                 onClick={() => {
//                   if (!data.amenities.includes(feature)) {
//                     setData((prev) => ({
//                       ...prev,
//                       amenities: [...prev.amenities, feature]
//                     }));
//                   }
//                 }}
//                 className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-[#059669] transition-all"
//               >
//                 + {feature}
//               </button>
//             ))}
//           </div>
//         </div>
//       </FormSection>
//     </div>
//   );
// };

// export default FeaturesStep;
import React, { useState } from 'react';
import { 
  PropertyData, 
  PROJECT_AMENITIES_OPTIONS, 
  APARTMENT_FEATURES_OPTIONS,
  SECURITY_FEATURES_OPTIONS,
  SUSTAINABILITY_OPTIONS 
} from '../types';
import { FormSection } from '../FormComponents';
import { Plus, X, Sparkles, Building2, Shield, Leaf, Home } from 'lucide-react';

interface FeaturesStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ data, setData }) => {
  const [customFeature, setCustomFeature] = useState('');
  const [activeCategory, setActiveCategory] = useState<'project' | 'apartment' | 'security' | 'sustainability'>('project');

  const addCustomFeature = () => {
    if (customFeature.trim()) {
      setData((prev) => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          projectAmenities: [...prev.amenities.projectAmenities, customFeature.trim()]
        }
      }));
      setCustomFeature('');
    }
  };

  const toggleAmenity = (category: keyof PropertyData['amenities'], amenity: string) => {
    setData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [category]: prev.amenities[category].includes(amenity)
          ? prev.amenities[category].filter(a => a !== amenity)
          : [...prev.amenities[category], amenity]
      }
    }));
  };

  const removeAmenity = (category: keyof PropertyData['amenities'], index: number) => {
    setData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [category]: prev.amenities[category].filter((_, i) => i !== index)
      }
    }));
  };

  const categories = [
    { id: 'project' as const, label: 'Project Amenities', icon: Building2, options: PROJECT_AMENITIES_OPTIONS },
    { id: 'apartment' as const, label: 'Apartment Features', icon: Home, options: APARTMENT_FEATURES_OPTIONS },
    { id: 'security' as const, label: 'Security Features', icon: Shield, options: SECURITY_FEATURES_OPTIONS },
    { id: 'sustainability' as const, label: 'Sustainability', icon: Leaf, options: SUSTAINABILITY_OPTIONS }
  ];

  const categoryMap = {
    project: 'projectAmenities',
    apartment: 'apartmentFeatures',
    security: 'securityFeatures',
    sustainability: 'sustainability'
  } as const;

  const activeOptions = categories.find(c => c.id === activeCategory)?.options || [];
  const activeCategoryKey = categoryMap[activeCategory];
  const selectedAmenities = data.amenities[activeCategoryKey];

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Features & Amenities" 
        description="Select features across different categories to highlight what makes this property special"
      >
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                activeCategory === id
                  ? 'bg-[#10B981] border-[#10B981] text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Quick Select Options */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3 font-medium">Quick Add:</p>
          <div className="flex flex-wrap gap-2">
            {activeOptions.map((feature) => (
              <button
                key={feature}
                onClick={() => toggleAmenity(activeCategoryKey, feature)}
                className={`px-3 py-1.5 text-xs rounded-full border-2 transition-all ${
                  selectedAmenities.includes(feature)
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-200'
                }`}
              >
                {selectedAmenities.includes(feature) ? '✓ ' : '+ '}
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Feature Input */}
        {activeCategory === 'project' && (
          <div className="flex gap-3">
            <input
              type="text"
              value={customFeature}
              onChange={(e) => setCustomFeature(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomFeature())}
              placeholder="Add custom feature..."
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            <button
              onClick={addCustomFeature}
              className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Selected Features Display */}
        <div className="space-y-4">
          {categories.map(({ id, label, icon: Icon }) => {
            const categoryKey = categoryMap[id];
            const features = data.amenities[categoryKey];
            
            if (features.length === 0) return null;

            return (
              <div key={id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-[#10B981]" />
                  <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
                  <span className="text-xs text-gray-500">({features.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {features.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg group hover:border-emerald-300 transition-all"
                    >
                      <span className="text-sm text-gray-900">{amenity}</span>
                      <button
                        onClick={() => removeAmenity(categoryKey, i)}
                        className="p-0.5 hover:bg-red-100 rounded transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {Object.values(data.amenities).every(arr => arr.length === 0) && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-2">No features added yet</p>
              <p className="text-gray-400 text-xs">Select features from the options above to get started</p>
            </div>
          )}
        </div>
      </FormSection>
    </div>
  );
};

export default FeaturesStep;