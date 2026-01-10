
import React, { useState, useRef } from 'react';
import { PropertyData, BrochureStyle, BrochureTemplate } from './types';
import { generateBrochureLayout } from './services/geminiService';
import { GoogleGenAI } from "@google/genai";
import BrochureRenderer from './components/BrochureRenderer';
import { toJpeg } from 'html-to-image';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  LayoutTemplate, 
  Plus, 
  X, 
  Sparkles, 
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  PenTool, 
  ArrowRight,
  User,
  Ruler,
  Calendar,
  Layers,
  Phone,
  Mail,
  Trash2,
  RefreshCw,
  AlertCircle,
  Wand2,
  UploadCloud,
  ChevronRight,
  FileText,
  Database
} from 'lucide-react';

// --- STABLE SUB-COMPONENTS (Defined outside App to prevent focus loss) ---

const SectionHeading = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <h2 className="text-[10px] font-black tracking-[0.4em] uppercase mb-8 text-indigo-500 flex items-center gap-2 border-b border-white/5 pb-2">
    <Icon className="w-3 h-3" /> {children}
  </h2>
);

const InputField = ({ label, value, onChange, icon: Icon, placeholder, type = "text", multiline = false }: any) => (
  <div className="group mb-8">
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 group-focus-within:text-indigo-400 transition-colors">
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-700" />}
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-b border-white/5 focus:border-indigo-500 outline-none transition-all text-white text-sm py-2 min-h-[100px] resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-7' : 'pl-0'} py-2 bg-transparent border-b border-white/5 focus:border-indigo-500 outline-none transition-all text-white text-sm font-medium`}
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
  specs: {
    beds: '',
    baths: '',
    sqft: '',
    yearBuilt: ''
  },
  amenities: [],
  images: [],
  agent: {
    name: '',
    title: '',
    phone: '',
    email: '',
    photoUrl: ''
  }
};

const DUMMY_DATA: PropertyData = {
  title: 'The Obsidian Pavilion',
  location: '12800 Bel Air Crest, Los Angeles',
  price: '$28,500,000',
  description: 'A triumph of brutalist elegance and modern luxury. This architectural masterpiece features seamless indoor-outdoor living, a cantilevered glass pool, and rare black marble imported from the heart of Italy. Every corner of this residence has been meticulously curated for the world\'s most discerning collector.',
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

const App: React.FC = () => {
  const [data, setData] = useState<PropertyData>(EMPTY_DATA);
  const [style, setStyle] = useState<BrochureStyle>(BrochureStyle.ARCHITECTURAL);
  const [template, setTemplate] = useState<BrochureTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [magicText, setMagicText] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const agentPhotoRef = useRef<HTMLInputElement>(null);
  const brochureRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    if (!data.title) return "Property name is required.";
    if (!data.location) return "Location is required.";
    if (!data.images || data.images.length === 0) return "Provide at least one hero image.";
    if (!data.agent || !data.agent.name) return "Agent name is required.";
    return null;
  };

  const handleMagicImport = async () => {
    if (!magicText.trim()) return;
    setIsParsing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `EXTRACT AND REFINE: Read the following messy property text and extract core data into a CLEAN JSON object.
        "${magicText}"
        JSON structure: {title, location, price, description, specs: {beds, baths, sqft, yearBuilt}, amenities: string[]}.`,
        config: { responseMimeType: "application/json" }
      });
      
      let text = response.text;
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(text);
      setData(prev => ({ 
        ...prev, 
        ...parsed,
        specs: { ...prev.specs, ...parsed.specs },
        amenities: parsed.amenities || prev.amenities
      }));
      setMagicText('');
    } catch (error) {
      console.error('Magic Import failed:', error);
      alert("AI failed to parse text. Please ensure the listing details are clear.");
    } finally {
      setIsParsing(false);
    }
  };

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

  const handleGenerate = async () => {
    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    setIsGenerating(true);
    try {
      const generatedTemplate = await generateBrochureLayout(data, style);
      setTemplate(generatedTemplate);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Architectural synthesis failed. Please try again or check your data.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportImage = async () => {
    if (!brochureRef.current) return;
    setIsExporting(true);
    try {
      // Ensure fonts are loaded before capturing
      if (document.fonts) {
        await document.fonts.ready;
      }

      // html-to-image toJpeg with CORS-friendly options
      const dataUrl = await toJpeg(brochureRef.current, { 
        quality: 0.95, 
        pixelRatio: 2,
        backgroundColor: template?.palette?.background || '#ffffff',
        cacheBust: true,
        // filter function to skip problematic stylesheets if any (though crossorigin should fix it)
        filter: (node) => {
          if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
            const href = (node as HTMLLinkElement).href;
            // Only skip if it's truly broken, but we'll try to keep all
            return true;
          }
          return true;
        }
      });

      const link = document.createElement('a');
      link.download = `${(data.title || 'Property').replace(/\s+/g, '_')}_Editorial.jpg`;
      link.href = dataUrl;
      link.click();
    } catch (error: any) {
      console.error('Export failed:', error);
      alert(`High-res export failed: ${error.message || 'Check console for details'}. Please try using PDF (Print) instead.`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (confirm("Clear workspace and start new architecture?")) {
      setData(EMPTY_DATA);
      setTemplate(null);
      setValidationError(null);
    }
  };

  const handleLoadSample = () => {
    setData(DUMMY_DATA);
    setValidationError(null);
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setData(prev => ({ ...prev, amenities: [...(prev.amenities || []), newAmenity.trim()] }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (idx: number) => {
    setData(prev => ({ ...prev, amenities: (prev.amenities || []).filter((_, i) => i !== idx) }));
  };

  const removeImage = (idx: number) => {
    setData(prev => ({ ...prev, images: (prev.images || []).filter((_, i) => i !== idx) }));
  };

  const updateSpec = (key: keyof typeof data.specs, val: string) => {
    setData(prev => ({ ...prev, specs: { ...prev.specs, [key]: val } }));
  };

  const updateAgent = (key: keyof typeof data.agent, val: string) => {
    setData(prev => ({ ...prev, agent: { ...prev.agent, [key]: val } }));
  };

  return (
    <div className="min-h-screen bg-[#060608] text-slate-300">
      <nav className="no-print sticky top-0 z-50 bg-[#060608]/90 backdrop-blur-xl border-b border-white/5 px-10 py-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-sm shadow-lg shadow-indigo-600/20">
            <Sparkles className="text-white w-4 h-4" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">DreamExProperties AI Studio</h1>
        </div>
        <div className="flex gap-6 items-center">
          <button onClick={handleLoadSample} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-xs font-bold uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
            <Database className="w-3.5 h-3.5" /> Load Sample
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <RefreshCw className="w-3.5 h-3.5" /> Clear
          </button>
          <button 
            onClick={handleGenerate} 
            disabled={isGenerating} 
            className="group flex items-center gap-3 bg-white hover:bg-indigo-600 text-black hover:text-white px-10 py-3 rounded-sm font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50 shadow-xl"
          >
            {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
            {template ? 'Regenerate' : 'Create'}
          </button>
        </div>
      </nav>

      <main className="mx-auto flex flex-col lg:flex-row h-[calc(100vh-85px)] overflow-hidden">
        <aside className="no-print w-full lg:w-[480px] border-r border-white/5 overflow-y-auto bg-[#09090b] p-10 space-y-16 custom-scrollbar">
          
          <section className="bg-indigo-600/10 border border-indigo-500/30 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <h3 className="text-[10px] font-black tracking-[0.5em] text-indigo-400 mb-6 flex items-center gap-2 uppercase">
              <Wand2 className="w-4 h-4" /> Magic Sync
            </h3>
            <textarea 
              value={magicText}
              onChange={(e) => setMagicText(e.target.value)}
              placeholder="Paste raw listing or notes..."
              className="w-full h-32 bg-black/60 border border-white/5 rounded-sm p-4 text-xs outline-none focus:border-indigo-500 mb-4 font-mono leading-relaxed"
            />
            <button 
              onClick={handleMagicImport}
              disabled={isParsing || !magicText}
              className="w-full py-4 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500 disabled:opacity-30 transition-all flex items-center justify-center gap-3"
            >
              {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Auto-Fill Studio
            </button>
          </section>

          {validationError && (
            <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-sm flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-xs text-red-200 font-bold uppercase tracking-widest">{validationError}</p>
            </div>
          )}

          <section>
            <SectionHeading icon={Building2}>Property DNA</SectionHeading>
            <InputField label="Name" value={data.title} onChange={(v: string) => setData({...data, title: v})} placeholder="e.g. Skyline Pavilion" />
            <InputField label="Location" icon={MapPin} value={data.location} onChange={(v: string) => setData({...data, location: v})} />
            <InputField label="Valuation" icon={DollarSign} value={data.price} onChange={(v: string) => setData({...data, price: v})} />
            <InputField label="Narrative" value={data.description} onChange={(v: string) => setData({...data, description: v})} multiline />
          </section>

          <section>
            <SectionHeading icon={Layers}>Specs</SectionHeading>
            <div className="grid grid-cols-2 gap-x-12">
              <InputField label="Beds" value={data.specs.beds} onChange={(v: string) => updateSpec('beds', v)} />
              <InputField label="Baths" value={data.specs.baths} onChange={(v: string) => updateSpec('baths', v)} />
              <InputField label="Area" icon={Ruler} value={data.specs.sqft} onChange={(v: string) => updateSpec('sqft', v)} />
              <InputField label="Built" icon={Calendar} value={data.specs.yearBuilt} onChange={(v: string) => updateSpec('yearBuilt', v)} />
            </div>
          </section>

          <section>
            <SectionHeading icon={Plus}>Features</SectionHeading>
            <div className="flex gap-4 mb-6">
               <input 
                type="text" 
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addAmenity()}
                placeholder="Add luxury feature..."
                className="flex-1 bg-transparent border-b border-white/5 px-2 py-3 text-sm outline-none focus:border-indigo-500"
               />
               <button onClick={addAmenity} className="p-3 bg-white/5 hover:bg-white/10">
                  <Plus className="w-5 h-5" />
               </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {(data.amenities || []).map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 pl-4 pr-2 py-2 rounded-sm text-[10px] font-black uppercase tracking-[0.2em]">
                   {a}
                   <button onClick={() => removeAmenity(i)} className="p-1 hover:text-red-500"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading icon={ImageIcon}>Media</SectionHeading>
            <div className="space-y-6">
              <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'property')} />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-12 border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-sm flex flex-col items-center justify-center gap-4 hover:bg-indigo-500/5 transition-all group"
              >
                <UploadCloud className="w-8 h-8 text-indigo-500" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Import Photos</span>
              </button>
              <div className="grid grid-cols-3 gap-3">
                {(data.images || []).map((img, i) => (
                  <div key={i} className="relative aspect-square group border border-white/10 overflow-hidden">
                    <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    <button onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-black/80 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionHeading icon={User}>Identity</SectionHeading>
            <input type="file" accept="image/*" className="hidden" ref={agentPhotoRef} onChange={(e) => handleFileUpload(e, 'agent')} />
            <div className="flex items-center gap-8 mb-10 p-6 bg-white/5 border border-white/5">
               <div 
                onClick={() => agentPhotoRef.current?.click()}
                className="w-24 h-24 rounded-full bg-black border border-indigo-500/30 flex items-center justify-center cursor-pointer overflow-hidden group hover:scale-105 transition-all shadow-2xl"
               >
                 {data.agent.photoUrl ? (
                   <img src={data.agent.photoUrl} className="w-full h-full object-cover" />
                 ) : (
                   <User className="text-indigo-500 w-10 h-10" />
                 )}
               </div>
               <div className="flex-1">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Agent Headshot</p>
               </div>
            </div>
            <InputField label="Name" value={data.agent.name} onChange={(v: string) => updateAgent('name', v)} />
            <InputField label="Title" value={data.agent.title} onChange={(v: string) => updateAgent('title', v)} />
            <InputField label="Phone" icon={Phone} value={data.agent.phone} onChange={(v: string) => updateAgent('phone', v)} />
            <InputField label="Email" icon={Mail} value={data.agent.email} onChange={(v: string) => updateAgent('email', v)} />
          </section>

          <section>
            <SectionHeading icon={LayoutTemplate}>Design Style</SectionHeading>
            <div className="grid grid-cols-1 gap-4">
              {Object.values(BrochureStyle).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`flex items-center justify-between px-8 py-6 rounded-sm border-2 transition-all ${
                    style === s ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-white/5 border-white/5 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">{s.replace('-', ' ')}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${style === s ? 'translate-x-0' : '-translate-x-4 opacity-0'}`} />
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className="flex-1 h-full overflow-y-auto bg-[#060608] p-16 custom-scrollbar relative">
          {!template && !isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              <div className="relative mb-20 scale-125">
                <div className="absolute inset-0 bg-indigo-500 blur-[150px] opacity-20 animate-pulse" />
                <div className="relative z-10 p-12 bg-[#09090b] border border-white/5 backdrop-blur-3xl rounded-[4rem] shadow-2xl">
                  <Sparkles className="w-24 h-24 text-indigo-500/80" strokeWidth={0.5} />
                </div>
              </div>
              <h2 className="text-6xl font-black text-white mb-8 tracking-tighter uppercase italic">Ready to architect.</h2>
              <button 
                onClick={handleGenerate} 
                className="group flex items-center gap-6 bg-white text-black px-16 py-8 rounded-sm font-black text-sm uppercase tracking-[0.4em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl"
              >
                Synthesize Draft <ArrowRight className="w-6 h-6 group-hover:translate-x-4 transition-transform" />
              </button>
            </div>
          ) : isGenerating ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-12">
                 <div className="absolute inset-0 border-4 border-indigo-500/10 rounded-full animate-ping" />
                 <Loader2 className="w-full h-full text-indigo-500 animate-spin" strokeWidth={1} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-[0.5em] animate-pulse italic text-center">Architecting Space</h3>
              <p className="text-indigo-500 font-mono text-xs uppercase tracking-[0.6em]">Spatial Logic / Typographic Flow</p>
            </div>
          ) : template ? (
            <div className="w-full max-w-[1050px] mx-auto pb-48 animate-in fade-in zoom-in-95 duration-1000">
              <div className="flex items-center justify-between mb-12 bg-white/5 p-6 rounded-sm border border-white/5 backdrop-blur-md sticky top-0 z-40">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-indigo-500 uppercase tracking-[0.5em]">{data.title}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Experimental {style} Grid</span>
                 </div>
                 <div className="flex gap-4">
                    <button 
                      onClick={handleExportImage} 
                      disabled={isExporting}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10"
                    >
                      {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                      Export Image
                    </button>
                    <button 
                      onClick={() => window.print()} 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      PDF
                    </button>
                    <button 
                      onClick={handleGenerate} 
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] shadow-xl"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      New Variation
                    </button>
                 </div>
              </div>
              <div ref={brochureRef}>
                <BrochureRenderer data={data} template={template} />
              </div>
            </div>
          ) : null}
        </section>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(79, 70, 229, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(79, 70, 229, 0.4); }
      `}</style>
    </div>
  );
};

export default App;