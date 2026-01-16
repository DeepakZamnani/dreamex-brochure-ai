import React, { useRef } from 'react';
import { PropertyData } from '.././types';
import { FormInput, FormSection } from '../FormComponents';
import { User, Phone, Mail, Briefcase, UploadCloud, X } from 'lucide-react';

interface ContactStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const ContactStep: React.FC<ContactStepProps> = ({ data, setData }) => {
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setData((prev) => ({
          ...prev,
          agent: { ...prev.agent, photoUrl: result }
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setData((prev) => ({
      ...prev,
      agent: { ...prev.agent, photoUrl: '' }
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Contact & Branding" 
        description="Add your contact details and branding for a professional finish"
      >
        <div className="flex items-center gap-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={photoInputRef}
            onChange={handlePhotoUpload}
          />
          
          <div className="relative group">
            <button
              onClick={() => photoInputRef.current?.click()}
              className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#10B981] transition-all"
            >
              {data.agent.photoUrl ? (
                <img 
                  src={data.agent.photoUrl} 
                  alt="Agent" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </button>
            {data.agent.photoUrl && (
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1 font-medium">Agent Photo</p>
            <button
              onClick={() => photoInputRef.current?.click()}
              className="text-sm text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-2 font-medium"
            >
              <UploadCloud className="w-4 h-4" />
              {data.agent.photoUrl ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Your Name"
            value={data.agent.name}
            onChange={(v) => setData({ ...data, agent: { ...data.agent, name: v } })}
            placeholder="e.g., John Smith"
            icon={User}
            required
          />

          <FormInput
            label="Title/Position"
            value={data.agent.title}
            onChange={(v) => setData({ ...data, agent: { ...data.agent, title: v } })}
            placeholder="e.g., Senior Real Estate Agent"
            icon={Briefcase}
          />

          <FormInput
            label="Phone"
            value={data.agent.phone}
            onChange={(v) => setData({ ...data, agent: { ...data.agent, phone: v } })}
            placeholder="e.g., +1 (555) 123-4567"
            icon={Phone}
          />

          <FormInput
            label="Email"
            value={data.agent.email}
            onChange={(v) => setData({ ...data, agent: { ...data.agent, email: v } })}
            placeholder="e.g., john@realestate.com"
            icon={Mail}
            type="email"
          />
        </div>
      </FormSection>
    </div>
  );
};

export default ContactStep;