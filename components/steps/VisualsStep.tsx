import React, { useRef } from 'react';
import { PropertyData } from '.././types';
import { FormSection } from '../FormComponents';
import { UploadCloud, X, ImageIcon } from 'lucide-react';

interface VisualsStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const VisualsStep: React.FC<VisualsStepProps> = ({ data, setData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setData((prev) => ({
            ...prev,
            images: [...prev.images, result]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Images" 
        description="Upload high-quality images of your property"
      >
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-16 border-2 border-dashed border-gray-300 hover:border-[#10B981] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-emerald-50 transition-all group"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
            <UploadCloud className="w-8 h-8 text-[#10B981] group-hover:text-white transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-gray-900 font-medium mb-1">Click to upload images</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
          </div>
        </button>

        {data.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {data.images.map((img, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={img} 
                  alt={`Property ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {data.images.length === 0 && (
          <div className="text-center py-8">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No images uploaded yet</p>
          </div>
        )}
      </FormSection>
    </div>
  );
};

export default VisualsStep;