// import React, { useRef } from 'react';
// import { PropertyData } from '.././types';
// import { FormSection } from '../FormComponents';
// import { UploadCloud, X, ImageIcon } from 'lucide-react';

// interface VisualsStepProps {
//   data: PropertyData;
//   setData: React.Dispatch<React.SetStateAction<PropertyData>>;
// }

// const VisualsStep: React.FC<VisualsStepProps> = ({ data, setData }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     Array.from(files).forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const result = event.target?.result;
//         if (typeof result === 'string') {
//           setData((prev) => ({
//             ...prev,
//             images: [...prev.images, result]
//           }));
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeImage = (index: number) => {
//     setData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index)
//     }));
//   };

//   return (
//     <div className="space-y-8">
//       <FormSection 
//         title="Property Images" 
//         description="Upload high-quality images of your property"
//       >
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//         />

//         <button
//           onClick={() => fileInputRef.current?.click()}
//           className="w-full py-16 border-2 border-dashed border-gray-300 hover:border-[#10B981] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-emerald-50 transition-all group"
//         >
//           <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
//             <UploadCloud className="w-8 h-8 text-[#10B981] group-hover:text-white transition-colors" />
//           </div>
//           <div className="text-center">
//             <p className="text-gray-900 font-medium mb-1">Click to upload images</p>
//             <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
//           </div>
//         </button>

//         {data.images.length > 0 && (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
//             {data.images.map((img, i) => (
//               <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
//                 <img 
//                   src={img} 
//                   alt={`Property ${i + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   onClick={() => removeImage(i)}
//                   className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
//                 >
//                   <X className="w-4 h-4 text-white" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {data.images.length === 0 && (
//           <div className="text-center py-8">
//             <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//             <p className="text-gray-500 text-sm">No images uploaded yet</p>
//           </div>
//         )}
//       </FormSection>
//     </div>
//   );
// };

// export default VisualsStep;
import React, { useRef, useState } from 'react';
import { PropertyData, ImageLabel, LabeledImage } from '../types';
import { FormSection } from '../FormComponents';
import { UploadCloud, X, Image as ImageIcon, Star } from 'lucide-react';

interface VisualsStepProps {
  data: PropertyData;
  setData: React.Dispatch<React.SetStateAction<PropertyData>>;
}

const VisualsStep: React.FC<VisualsStepProps> = ({ data, setData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedLabel, setSelectedLabel] = useState<ImageLabel>('exterior');

  const imageLabels: { value: ImageLabel; label: string }[] = [
    { value: 'elevation', label: 'Elevation' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'living_room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'balcony', label: 'Balcony' },
    { value: 'lobby', label: 'Lobby' },
    { value: 'amenities', label: 'Amenities' },
    { value: 'floor_plan', label: 'Floor Plan' },
    { value: 'location_map', label: 'Location Map' },
    { value: 'other', label: 'Other' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          const newImage: LabeledImage = {
            url: result,
            label: selectedLabel,
            order: data.images.length,
            isCover: data.images.length === 0, // First image is cover
            caption: ''
          };
          
          setData((prev) => ({
            ...prev,
            images: [...prev.images, newImage]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index).map((img, i) => ({
        ...img,
        order: i,
        isCover: i === 0 // Update cover status
      }))
    }));
  };

  const setCoverImage = (index: number) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isCover: i === index
      }))
    }));
  };

  const updateImageLabel = (index: number, label: ImageLabel) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, label } : img
      )
    }));
  };

  const updateImageCaption = (index: number, caption: string) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, caption } : img
      )
    }));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const newImages = [...data.images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    
    setData(prev => ({
      ...prev,
      images: newImages.map((img, i) => ({
        ...img,
        order: i,
        isCover: i === 0
      }))
    }));
  };

  return (
    <div className="space-y-8">
      <FormSection 
        title="Property Images" 
        description="Upload and organize high-quality images of your property"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 min-w-[120px]">
              Image Category:
            </label>
            <select
              value={selectedLabel}
              onChange={(e) => setSelectedLabel(e.target.value as ImageLabel)}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100 transition-all"
            >
              {imageLabels.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

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
            className="w-full py-12 border-2 border-dashed border-gray-300 hover:border-[#10B981] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-emerald-50 transition-all group"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-[#10B981] transition-colors">
              <UploadCloud className="w-8 h-8 text-[#10B981] group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <p className="text-gray-900 font-medium mb-1">
                Click to upload {imageLabels.find(l => l.value === selectedLabel)?.label} images
              </p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
            </div>
          </button>
        </div>

        {data.images.length > 0 && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                {data.images.length} image{data.images.length !== 1 ? 's' : ''} uploaded
              </p>
              <p className="text-xs text-gray-500">
                First image will be the cover photo
              </p>
            </div>

            <div className="space-y-3">
              {data.images.map((img, i) => (
                <div key={i} className="relative group bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-all">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img 
                        src={img.url} 
                        alt={`Property ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {img.isCover && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 rounded-md flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3 text-yellow-900" fill="currentColor" />
                          <span className="text-xs font-bold text-yellow-900">Cover</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="text-xs text-gray-600 mb-1 block">Image Type</label>
                          <select
                            value={img.label}
                            onChange={(e) => updateImageLabel(i, e.target.value as ImageLabel)}
                            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-emerald-100"
                          >
                            {imageLabels.map(({ value, label }) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex gap-2 items-end">
                          <button
                            onClick={() => moveImage(i, 'up')}
                            disabled={i === 0}
                            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveImage(i, 'down')}
                            disabled={i === data.images.length - 1}
                            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            ↓
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-gray-600 mb-1 block">Caption (Optional)</label>
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => updateImageCaption(i, e.target.value)}
                          placeholder="Add a caption for this image..."
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-emerald-100"
                        />
                      </div>

                      <div className="flex gap-2">
                        {!img.isCover && (
                          <button
                            onClick={() => setCoverImage(i)}
                            className="px-3 py-1.5 text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-all flex items-center gap-1"
                          >
                            <Star className="w-3 h-3" />
                            Set as Cover
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-2 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.images.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm mb-2">No images uploaded yet</p>
            <p className="text-gray-400 text-xs">Upload images to showcase your property</p>
          </div>
        )}
      </FormSection>
    </div>
  );
};

export default VisualsStep;