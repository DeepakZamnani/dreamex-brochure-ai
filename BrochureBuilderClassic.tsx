import React, { useState, useRef } from 'react';
import { PropertyData, BrochureStyle, BrochureTemplate } from './types';
import { generateBrochureLayout } from './services/geminiService';
import BrochureRenderer from './components/BrochureRenderer';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  LayoutTemplate, 
  Plus, 
  X, 
  Sparkles, 
  Image as ImageIcon,
  Loader2,
  ArrowRight,
  User,
  Ruler,
  Calendar,
  Bed,
  Bath,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  FileText,
  UploadCloud,
  ChevronRight,
  Wand2,
  Database
} from 'lucide-react';

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <h2 className="text-xs font-bold tracking-wider uppercase mb-4 text-[#10B981] flex items-center gap-2">
    <Icon className="w-3.5 h-3.5" /> {children}
  </h2>
);

const InputField = ({ label, value, onChange, icon: Icon, placeholder, type = "text", multiline = false }: any) => (
  <div className="mb-5">
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-gray-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all text-gray-900 text-sm py-2.5 px-3 rounded-lg min-h-[100px] resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 bg-white border border-gray-200 focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none transition-all text-gray-900 text-sm rounded-lg`}
        />
      )}
    </div>
  </div>
);

const EMPTY_DATA: PropertyData = {
  title: '',
  location: '',
  price: '',
  description: '',
  specs: { beds: '', baths: '', sqft: '', yearBuilt: '' },
  amenities: [],
  images: [],
  agent: { name: '', title: '', phone: '', email: '', photoUrl: '' }
};

const DUMMY_DATA: PropertyData = {
  title: 'The Obsidian Pavilion',
  location: '12800 Bel Air Crest, Los Angeles',
  price: '$28,500,000',
  description: 'A triumph of brutalist elegance and modern luxury. This architectural masterpiece features seamless indoor-outdoor living, a cantilevered glass pool, and rare black marble imported from the heart of Italy.',
  specs: {
    beds: '6',
    baths: '8.5',
    sqft: '12,400',
    yearBuilt: '2024'
  },
  amenities: [
    'Cantilevered Infinity Pool',
    '3,000 sqft Wellness Center',
    '15-Seat Dolby Cinema',
    'Black Marble Gallery',
    'Smart Ecosystem Integration',
    '24/7 Monitored Security'
  ],
  images: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600607687940-4e524cb35a36?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
  ],
  agent: {
    name: 'ABC XYZ',
    title: 'Senior Portfolio Director',
    phone: '+1 (310) 555-0199',
    email: 'j.vael@mail.com',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
  }
};

const BrochureBuilderClassic: React.FC = () => {
  const [data, setData] = useState<PropertyData>(EMPTY_DATA);
  const [style, setStyle] = useState<BrochureStyle>(BrochureStyle.ARCHITECTURAL);
  const [template, setTemplate] = useState<BrochureTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const agentPhotoRef = useRef<HTMLInputElement>(null);
  const brochureRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'property' | 'agent') => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (target === 'property') {
          setData(prev => ({ ...prev, images: [...prev.images, base64String] }));
        } else {
          setData(prev => ({ ...prev, agent: { ...prev.agent, photoUrl: base64String } }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setData(prev => ({ ...prev, amenities: [...prev.amenities, newAmenity.trim()] }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setData(prev => ({ ...prev, amenities: prev.amenities.filter((_, i) => i !== index) }));
  };

  const updateAgent = (field: string, value: string) => {
    setData(prev => ({ ...prev, agent: { ...prev.agent, [field]: value } }));
  };

  const loadDummyData = () => {
    setData(DUMMY_DATA);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generatedTemplate = await generateBrochureLayout(data, style);
      setTemplate(generatedTemplate);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate brochure. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportImage = () => {
    alert('Export feature - integrate with html-to-image library');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">DreamExProp</h1>
          </div>
          <button
            onClick={loadDummyData}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Database className="w-4 h-4" />
            Load Demo Data
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 flex gap-6">
        {/* Sidebar - Form */}
        <aside className="w-96 bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24 overflow-y-auto max-h-[calc(100vh-120px)]">
          <section className="mb-8">
            <SectionHeading icon={Building2}>Property Details</SectionHeading>
            <InputField label="Property Name" value={data.title} onChange={(v: string) => setData({ ...data, title: v })} icon={Building2} placeholder="Luxury Villa in Beverly Hills" />
            <InputField label="Location" value={data.location} onChange={(v: string) => setData({ ...data, location: v })} icon={MapPin} placeholder="123 Main St, Los Angeles, CA" />
            <InputField label="Price" value={data.price} onChange={(v: string) => setData({ ...data, price: v })} icon={DollarSign} placeholder="$5,500,000" />
            <InputField label="Description" value={data.description} onChange={(v: string) => setData({ ...data, description: v })} placeholder="Describe the property..." multiline />
          </section>

          <section className="mb-8">
            <SectionHeading icon={Ruler}>Specifications</SectionHeading>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Beds" value={data.specs.beds} onChange={(v: string) => setData({ ...data, specs: { ...data.specs, beds: v } })} icon={Bed} placeholder="5" />
              <InputField label="Baths" value={data.specs.baths} onChange={(v: string) => setData({ ...data, specs: { ...data.specs, baths: v } })} icon={Bath} placeholder="4.5" />
              <InputField label="Sq Ft" value={data.specs.sqft} onChange={(v: string) => setData({ ...data, specs: { ...data.specs, sqft: v } })} icon={Ruler} placeholder="6,500" />
              <InputField label="Year" value={data.specs.yearBuilt} onChange={(v: string) => setData({ ...data, specs: { ...data.specs, yearBuilt: v } })} icon={Calendar} placeholder="2024" />
            </div>
          </section>

          <section className="mb-8">
            <SectionHeading icon={Sparkles}>Features</SectionHeading>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addAmenity()}
                placeholder="Add feature..."
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
              />
              <button onClick={addAmenity} className="p-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669]">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-900">
                  {a}
                  <button onClick={() => removeAmenity(i)} className="hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <SectionHeading icon={ImageIcon}>Photos</SectionHeading>
            <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'property')} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-[#10B981] hover:bg-emerald-50 transition-all group"
            >
              <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-[#10B981]" />
              <span className="text-xs text-gray-600">Upload Images</span>
            </button>
            <div className="grid grid-cols-3 gap-2 mt-4">
              {data.images.map((img, i) => (
                <div key={i} className="relative aspect-square group">
                  <img src={img} className="w-full h-full object-cover rounded-lg" />
                  <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-500 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <SectionHeading icon={User}>Agent Info</SectionHeading>
            <input type="file" accept="image/*" className="hidden" ref={agentPhotoRef} onChange={(e) => handleFileUpload(e, 'agent')} />
            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div onClick={() => agentPhotoRef.current?.click()} className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden">
                {data.agent.photoUrl ? (
                  <img src={data.agent.photoUrl} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-gray-400 w-8 h-8" />
                )}
              </div>
              <div className="text-xs text-gray-500">Click to upload photo</div>
            </div>
            <InputField label="Name" value={data.agent.name} onChange={(v: string) => updateAgent('name', v)} />
            <InputField label="Title" value={data.agent.title} onChange={(v: string) => updateAgent('title', v)} />
            <InputField label="Phone" icon={Phone} value={data.agent.phone} onChange={(v: string) => updateAgent('phone', v)} />
            <InputField label="Email" icon={Mail} value={data.agent.email} onChange={(v: string) => updateAgent('email', v)} />
          </section>

          <section className="mb-6">
            <SectionHeading icon={LayoutTemplate}>Style</SectionHeading>
            <div className="space-y-2">
              {Object.values(BrochureStyle).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all text-sm ${
                    style === s ? 'bg-emerald-50 border-[#10B981] text-emerald-900' : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{s.replace('-', ' ').toUpperCase()}</span>
                  {style === s && <ChevronRight className="w-4 h-4 text-[#10B981]" />}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Preview Area */}
        <section className="flex-1">
          {!template && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center bg-white rounded-xl border border-gray-200 p-16">
              <div className="mb-12">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-12 h-12 text-[#10B981]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create</h2>
                <p className="text-gray-600 mb-8 max-w-md">Fill in the property details and generate your professional brochure</p>
              </div>
              <button 
                onClick={handleGenerate} 
                className="flex items-center gap-3 bg-[#10B981] text-white px-8 py-4 rounded-lg font-semibold text-sm hover:bg-[#059669] transition-colors shadow-lg shadow-emerald-500/25"
              >
                <Wand2 className="w-5 h-5" />
                Generate Brochure
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-16 h-16 text-[#10B981] animate-spin mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Generating Your Brochure</h3>
              <p className="text-gray-600 text-sm">Creating unique layout with AI...</p>
            </div>
          ) : template ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="text-sm font-medium text-gray-900">{data.title}</div>
                <div className="flex gap-2">
                  <button onClick={handleExportImage} className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <ImageIcon className="w-4 h-4" />
                    Export
                  </button>
                  <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button onClick={handleGenerate} className="flex items-center gap-2 px-4 py-2 text-sm bg-[#10B981] text-white rounded-lg hover:bg-[#059669]">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                </div>
              </div>
              <div ref={brochureRef} className="overflow-auto max-h-[calc(100vh-180px)]">
                <BrochureRenderer data={data} template={template} />
              </div>
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
};

export default BrochureBuilderClassic;
