// import React from 'react';
// import { PropertyData } from '.././types';
// import { FormInput, FormSection } from '../FormComponents';
// import { Building2, MapPin, DollarSign, Bed, Bath, Ruler, Calendar } from 'lucide-react';

// interface PropertyStepProps {
//   data: PropertyData;
//   setData: React.Dispatch<React.SetStateAction<PropertyData>>;
// }

// const PropertyStep: React.FC<PropertyStepProps> = ({ data, setData }) => {
//   return (
//     <div className="space-y-8">
//       <FormSection 
//         title="Property Details" 
//         description="Enter the basic information about your property"
//       >
//         <FormInput
//           label="Property Name"
//           value={data.title}
//           onChange={(v) => setData({ ...data, title: v })}
//           placeholder="e.g., Luxury Villa in Beverly Hills"
//           icon={Building2}
//           required
//         />

//         <FormInput
//           label="Location"
//           value={data.location}
//           onChange={(v) => setData({ ...data, location: v })}
//           placeholder="e.g., 123 Main Street, Beverly Hills, CA"
//           icon={MapPin}
//           required
//         />

//         <FormInput
//           label="Price"
//           value={data.price}
//           onChange={(v) => setData({ ...data, price: v })}
//           placeholder="e.g., $5,500,000"
//           icon={DollarSign}
//           required
//         />
//       </FormSection>

//       <FormSection 
//         title="Property Specifications"
//         description="Add key details about the property"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormInput
//             label="Bedrooms"
//             value={data.specs.beds}
//             onChange={(v) => setData({ ...data, specs: { ...data.specs, beds: v } })}
//             placeholder="e.g., 5"
//             icon={Bed}
//             type="text"
//           />

//           <FormInput
//             label="Bathrooms"
//             value={data.specs.baths}
//             onChange={(v) => setData({ ...data, specs: { ...data.specs, baths: v } })}
//             placeholder="e.g., 4.5"
//             icon={Bath}
//             type="text"
//           />

//           <FormInput
//             label="Square Feet"
//             value={data.specs.sqft}
//             onChange={(v) => setData({ ...data, specs: { ...data.specs, sqft: v } })}
//             placeholder="e.g., 6,500"
//             icon={Ruler}
//             type="text"
//           />

//           <FormInput
//             label="Year Built"
//             value={data.specs.yearBuilt}
//             onChange={(v) => setData({ ...data, specs: { ...data.specs, yearBuilt: v } })}
//             placeholder="e.g., 2024"
//             icon={Calendar}
//             type="text"
//           />
//         </div>
//       </FormSection>
//     </div>
//   );
// };

// export default PropertyStep;
import React from 'react';
import { PropertyData, PropertyType, ProjectStatus, Configuration } from '../types';
import { FormInput, FormSection } from '../FormComponents';
import { Building2, MapPin, DollarSign, Home, Calendar, Ruler } from 'lucide-react';

interface PropertyStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const PropertyStep: React.FC<PropertyStepProps> = ({ data, setData }) => {
  const propertyTypes: { value: PropertyType; label: string }[] = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'rowhouse', label: 'Row House' },
    { value: 'plot', label: 'Plot' },
    { value: 'commercial', label: 'Commercial' }
  ];

  const projectStatuses: { value: ProjectStatus; label: string }[] = [
    { value: 'under_construction', label: 'Under Construction' },
    { value: 'ready_to_move', label: 'Ready to Move' },
    { value: 'new_launch', label: 'New Launch' },
    { value: 'resale', label: 'Resale' }
  ];

  const configurations: Configuration[] = [
    '1BHK', '2BHK', '2.5BHK', '3BHK', '4BHK', '5BHK', 'Penthouse', 'Studio'
  ];

  const toggleConfiguration = (config: Configuration) => {
    setData(prev => ({
      ...prev,
      configuration: prev.configuration.includes(config)
        ? prev.configuration.filter(c => c !== config)
        : [...prev.configuration, config]
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Details" 
        description="Enter the basic information about your property"
      >
        <FormInput
          label="Property/Project Name"
          value={data.title}
          onChange={(v) => setData({ ...data, title: v })}
          placeholder="e.g., Luxury Apartment in Pimpri"
          icon={Building2}
          required
        />

        <FormInput
          label="Location (City/Area)"
          value={data.location}
          onChange={(v) => setData({ ...data, location: v })}
          placeholder="e.g., Pimpri-Chinchwad, Pune"
          icon={MapPin}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Home className="w-4 h-4 text-[#10B981]" />
              Property Type
              <span className="text-red-500">*</span>
            </label>
            <select
              value={data.propertyType}
              onChange={(e) => setData({ ...data, propertyType: e.target.value as PropertyType })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-[#10B981]" />
              Project Status
              <span className="text-red-500">*</span>
            </label>
            <select
              value={data.projectStatus}
              onChange={(e) => setData({ ...data, projectStatus: e.target.value as ProjectStatus })}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
            >
              {projectStatuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Building2 className="w-4 h-4 text-[#10B981]" />
            Configuration(s)
            <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {configurations.map(config => (
              <button
                key={config}
                type="button"
                onClick={() => toggleConfiguration(config)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                  data.configuration.includes(config)
                    ? 'bg-[#10B981] border-[#10B981] text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-emerald-300'
                }`}
              >
                {config}
              </button>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection 
        title="Area & Pricing"
        description="Specify area details and pricing information"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Carpet Area"
            value={data.areaDetails.carpetArea || ''}
            onChange={(v) => setData({ ...data, areaDetails: { ...data.areaDetails, carpetArea: v } })}
            placeholder="e.g., 850 sqft"
            icon={Ruler}
          />

          <FormInput
            label="Built-up Area"
            value={data.areaDetails.builtUpArea || ''}
            onChange={(v) => setData({ ...data, areaDetails: { ...data.areaDetails, builtUpArea: v } })}
            placeholder="e.g., 950 sqft"
            icon={Ruler}
          />

          <FormInput
            label="Super Built-up Area"
            value={data.areaDetails.superBuiltUpArea || ''}
            onChange={(v) => setData({ ...data, areaDetails: { ...data.areaDetails, superBuiltUpArea: v } })}
            placeholder="e.g., 1100 sqft"
            icon={Ruler}
          />
        </div>

        <FormInput
          label="Starting Price"
          value={data.priceDetails.startingPrice}
          onChange={(v) => setData({ 
            ...data, 
            priceDetails: { ...data.priceDetails, startingPrice: v } 
          })}
          placeholder="e.g., ₹45 Lakhs"
          icon={DollarSign}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Price Range - Min (Optional)"
            value={data.priceDetails.priceRange?.min || ''}
            onChange={(v) => setData({ 
              ...data, 
              priceDetails: { 
                ...data.priceDetails, 
                priceRange: { 
                  min: v, 
                  max: data.priceDetails.priceRange?.max || '' 
                } 
              } 
            })}
            placeholder="e.g., ₹40 Lakhs"
            icon={DollarSign}
          />

          <FormInput
            label="Price Range - Max (Optional)"
            value={data.priceDetails.priceRange?.max || ''}
            onChange={(v) => setData({ 
              ...data, 
              priceDetails: { 
                ...data.priceDetails, 
                priceRange: { 
                  min: data.priceDetails.priceRange?.min || '', 
                  max: v 
                } 
              } 
            })}
            placeholder="e.g., ₹65 Lakhs"
            icon={DollarSign}
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="checkbox"
            id="allInclusive"
            checked={data.priceDetails.isAllInclusive}
            onChange={(e) => setData({ 
              ...data, 
              priceDetails: { ...data.priceDetails, isAllInclusive: e.target.checked } 
            })}
            className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
          />
          <label htmlFor="allInclusive" className="text-sm text-gray-700 font-medium">
            Price is all-inclusive (taxes included)
          </label>
        </div>

        <FormInput
          label="Price per Sq.Ft (Optional)"
          value={data.priceDetails.pricePerSqft || ''}
          onChange={(v) => setData({ 
            ...data, 
            priceDetails: { ...data.priceDetails, pricePerSqft: v } 
          })}
          placeholder="e.g., ₹4,500/sqft"
          icon={DollarSign}
        />
      </FormSection>
    </div>
  );
};

export default PropertyStep;