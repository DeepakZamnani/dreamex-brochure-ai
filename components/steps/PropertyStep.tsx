import React from 'react';
import { PropertyData } from '.././types';
import { FormInput, FormSection } from '../FormComponents';
import { Building2, MapPin, DollarSign, Bed, Bath, Ruler, Calendar } from 'lucide-react';

interface PropertyStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const PropertyStep: React.FC<PropertyStepProps> = ({ data, setData }) => {
  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Details" 
        description="Enter the basic information about your property"
      >
        <FormInput
          label="Property Name"
          value={data.title}
          onChange={(v) => setData({ ...data, title: v })}
          placeholder="e.g., Luxury Villa in Beverly Hills"
          icon={Building2}
          required
        />

        <FormInput
          label="Location"
          value={data.location}
          onChange={(v) => setData({ ...data, location: v })}
          placeholder="e.g., 123 Main Street, Beverly Hills, CA"
          icon={MapPin}
          required
        />

        <FormInput
          label="Price"
          value={data.price}
          onChange={(v) => setData({ ...data, price: v })}
          placeholder="e.g., $5,500,000"
          icon={DollarSign}
          required
        />
      </FormSection>

      <FormSection 
        title="Property Specifications"
        description="Add key details about the property"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Bedrooms"
            value={data.specs.beds}
            onChange={(v) => setData({ ...data, specs: { ...data.specs, beds: v } })}
            placeholder="e.g., 5"
            icon={Bed}
            type="text"
          />

          <FormInput
            label="Bathrooms"
            value={data.specs.baths}
            onChange={(v) => setData({ ...data, specs: { ...data.specs, baths: v } })}
            placeholder="e.g., 4.5"
            icon={Bath}
            type="text"
          />

          <FormInput
            label="Square Feet"
            value={data.specs.sqft}
            onChange={(v) => setData({ ...data, specs: { ...data.specs, sqft: v } })}
            placeholder="e.g., 6,500"
            icon={Ruler}
            type="text"
          />

          <FormInput
            label="Year Built"
            value={data.specs.yearBuilt}
            onChange={(v) => setData({ ...data, specs: { ...data.specs, yearBuilt: v } })}
            placeholder="e.g., 2024"
            icon={Calendar}
            type="text"
          />
        </div>
      </FormSection>
    </div>
  );
};

export default PropertyStep;