// import React, { useRef } from 'react';
// import { PropertyData } from '.././types';
// import { FormInput, FormSection } from '../FormComponents';
// import { User, Phone, Mail, Briefcase, UploadCloud, X } from 'lucide-react';

// interface ContactStepProps {
//   data: PropertyData;
//   setData: React.Dispatch<React.SetStateAction<PropertyData>>;
// }

// const ContactStep: React.FC<ContactStepProps> = ({ data, setData }) => {
//   const photoInputRef = useRef<HTMLInputElement>(null);

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const result = event.target?.result;
//       if (typeof result === 'string') {
//         setData((prev) => ({
//           ...prev,
//           agent: { ...prev.agent, photoUrl: result }
//         }));
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const removePhoto = () => {
//     setData((prev) => ({
//       ...prev,
//       agent: { ...prev.agent, photoUrl: '' }
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       <FormSection 
//         title="Contact & Branding" 
//         description="Add your contact details and branding for a professional finish"
//       >
//         <div className="flex items-center gap-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             ref={photoInputRef}
//             onChange={handlePhotoUpload}
//           />
          
//           <div className="relative group">
//             <button
//               onClick={() => photoInputRef.current?.click()}
//               className="w-24 h-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#10B981] transition-all"
//             >
//               {data.agent.photoUrl ? (
//                 <img 
//                   src={data.agent.photoUrl} 
//                   alt="Agent" 
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <User className="w-10 h-10 text-gray-400" />
//               )}
//             </button>
//             {data.agent.photoUrl && (
//               <button
//                 onClick={removePhoto}
//                 className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
//               >
//                 <X className="w-3 h-3 text-white" />
//               </button>
//             )}
//           </div>

//           <div className="flex-1">
//             <p className="text-sm text-gray-600 mb-1 font-medium">Agent Photo</p>
//             <button
//               onClick={() => photoInputRef.current?.click()}
//               className="text-sm text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-2 font-medium"
//             >
//               <UploadCloud className="w-4 h-4" />
//               {data.agent.photoUrl ? 'Change Photo' : 'Upload Photo'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormInput
//             label="Your Name"
//             value={data.agent.name}
//             onChange={(v) => setData({ ...data, agent: { ...data.agent, name: v } })}
//             placeholder="e.g., John Smith"
//             icon={User}
//             required
//           />

//           <FormInput
//             label="Title/Position"
//             value={data.agent.title}
//             onChange={(v) => setData({ ...data, agent: { ...data.agent, title: v } })}
//             placeholder="e.g., Senior Real Estate Agent"
//             icon={Briefcase}
//           />

//           <FormInput
//             label="Phone"
//             value={data.agent.phone}
//             onChange={(v) => setData({ ...data, agent: { ...data.agent, phone: v } })}
//             placeholder="e.g., +1 (555) 123-4567"
//             icon={Phone}
//           />

//           <FormInput
//             label="Email"
//             value={data.agent.email}
//             onChange={(v) => setData({ ...data, agent: { ...data.agent, email: v } })}
//             placeholder="e.g., john@realestate.com"
//             icon={Mail}
//             type="email"
//           />
//         </div>
//       </FormSection>
//     </div>
//   );
// };

// export default ContactStep;
import React, { useRef } from 'react';
import { PropertyData } from '../types';
import { FormInput, FormSection } from '../FormComponents';
import { User, Phone, Mail, Briefcase, UploadCloud, X, Building2, MapPin, Award, FileText } from 'lucide-react';

interface ContactStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const ContactStep: React.FC<ContactStepProps> = ({ data, setData }) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setData((prev) => ({
          ...prev,
          branding: { ...prev.branding, logoUrl: result }
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

  const removeLogo = () => {
    setData((prev) => ({
      ...prev,
      branding: { ...prev.branding, logoUrl: '' }
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Agent/Contact Information" 
        description="Add your contact details for the brochure"
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
            placeholder="e.g., +91 98765 43210"
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

      <FormSection 
        title="Branding & Legal Information" 
        description="Add developer information and legal compliance details"
      >
        <div className="flex items-center gap-6 p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={logoInputRef}
            onChange={handleLogoUpload}
          />
          
          <div className="relative group">
            <button
              onClick={() => logoInputRef.current?.click()}
              className="w-24 h-24 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center overflow-hidden hover:border-[#10B981] transition-all p-2"
            >
              {data.branding.logoUrl ? (
                <img 
                  src={data.branding.logoUrl} 
                  alt="Company Logo" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <Building2 className="w-10 h-10 text-gray-400" />
              )}
            </button>
            {data.branding.logoUrl && (
              <button
                onClick={removeLogo}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1 font-medium">Company Logo (Optional)</p>
            <button
              onClick={() => logoInputRef.current?.click()}
              className="text-sm text-[#10B981] hover:text-[#059669] transition-colors flex items-center gap-2 font-medium"
            >
              <UploadCloud className="w-4 h-4" />
              {data.branding.logoUrl ? 'Change Logo' : 'Upload Logo'}
            </button>
          </div>
        </div>

        <FormInput
          label="Developer/Company Name"
          value={data.branding.developerName}
          onChange={(v) => setData({ 
            ...data, 
            branding: { ...data.branding, developerName: v } 
          })}
          placeholder="e.g., ABC Developers Pvt. Ltd."
          icon={Building2}
          required
        />

        <FormInput
          label="Project Site Address"
          value={data.branding.siteAddress}
          onChange={(v) => setData({ 
            ...data, 
            branding: { ...data.branding, siteAddress: v } 
          })}
          placeholder="e.g., Plot No. 123, Sector 45, Pimpri"
          icon={MapPin}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="RERA Number (Optional)"
            value={data.branding.reraNumber || ''}
            onChange={(v) => setData({ 
              ...data, 
              branding: { ...data.branding, reraNumber: v } 
            })}
            placeholder="e.g., P52100012345"
            icon={Award}
          />

          <FormInput
            label="Website URL (Optional)"
            value={data.branding.websiteUrl || ''}
            onChange={(v) => setData({ 
              ...data, 
              branding: { ...data.branding, websiteUrl: v } 
            })}
            placeholder="e.g., www.yourwebsite.com"
            icon={FileText}
          />
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <input
            type="checkbox"
            id="includeDisclaimer"
            checked={data.branding.includeDisclaimer}
            onChange={(e) => setData({ 
              ...data, 
              branding: { ...data.branding, includeDisclaimer: e.target.checked } 
            })}
            className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
          />
          <label htmlFor="includeDisclaimer" className="text-sm text-gray-700">
            Include legal disclaimer (Recommended for compliance)
          </label>
        </div>
      </FormSection>

      <FormSection 
        title="Advanced Options" 
        description="Customize what appears in your brochure"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'includeFloorPlan', label: 'Include Floor Plan Section' },
            { key: 'includeAmenitiesPage', label: 'Include Amenities Page' },
            { key: 'includeLocationMap', label: 'Include Location Map' },
            { key: 'includePriceDisclaimer', label: 'Include Price Disclaimer' },
            { key: 'includeQRCode', label: 'Include QR Code' },
            { key: 'includePaymentPlan', label: 'Include Payment Plan' },
            { key: 'includeSpecifications', label: 'Include Specifications' }
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id={key}
                checked={Boolean(data.advancedOptions?.[key as keyof typeof data.advancedOptions] || false)}
                onChange={(e) => setData({ 
                  ...data, 
                  advancedOptions: { 
                    ...data.advancedOptions,
                    [key]: e.target.checked 
                  } 
                })}
                className="w-4 h-4 text-[#10B981] border-gray-300 rounded focus:ring-[#10B981]"
              />
              <label htmlFor={key} className="text-sm text-gray-700 font-medium flex-1">
                {label}
              </label>
            </div>
          ))}
        </div>

        {data.advancedOptions?.includeQRCode && (
          <FormInput
            label="QR Code URL"
            value={data.advancedOptions.qrCodeUrl || ''}
            onChange={(v) => setData({ 
              ...data, 
              advancedOptions: { 
                ...data.advancedOptions,
                qrCodeUrl: v 
              } 
            })}
            placeholder="e.g., https://virtualtour.com/property123"
            icon={FileText}
          />
        )}
      </FormSection>
    </div>
  );
};

export default ContactStep;