import React, { useState } from 'react';
import { PropertyData } from '.././types';
import { FormSection } from "../FormComponents";
import { Plus, X, Sparkles } from 'lucide-react';

interface FeaturesStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const FeaturesStep: React.FC<FeaturesStepProps> = ({ data, setData }) => {
  const [newAmenity, setNewAmenity] = useState('');

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addAmenity();
    }
  };

  const suggestedFeatures = [
    'Swimming Pool',
    'Home Theater',
    'Smart Home System',
    'Gourmet Kitchen',
    'Wine Cellar',
    'Gym',
    'Garden',
    'Garage',
    'Security System',
    'Solar Panels'
  ];

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Features & Amenities" 
        description="Highlight the key features that make this property special"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a feature (e.g., Swimming Pool)"
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
          />
          <button
            onClick={addAmenity}
            className="px-6 py-3 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {data.amenities.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {data.amenities.map((amenity, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg group hover:border-emerald-300 transition-all"
              >
                <span className="text-sm text-gray-900">{amenity}</span>
                <button
                  onClick={() => removeAmenity(i)}
                  className="p-1 hover:bg-red-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-red-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        {data.amenities.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
            <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-4">No features added yet</p>
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3 font-medium">Quick Add:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedFeatures.map((feature, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!data.amenities.includes(feature)) {
                    setData((prev) => ({
                      ...prev,
                      amenities: [...prev.amenities, feature]
                    }));
                  }
                }}
                className="px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-[#059669] transition-all"
              >
                + {feature}
              </button>
            ))}
          </div>
        </div>
      </FormSection>
    </div>
  );
};

export default FeaturesStep;