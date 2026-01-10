
import React from 'react';
import { PropertyData, BrochureTemplate, LayoutSection } from '../types';

interface Props {
  data: PropertyData;
  template: BrochureTemplate;
}

const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
  // Enhanced safety check with default fallbacks for essential rendering properties
  const palette = template?.palette || {
    background: '#ffffff',
    text: '#000000',
    accent: '#6366f1',
    primary: '#000000',
    secondary: '#f8fafc'
  };

  const typography = template?.typography || {
    heading: 'serif',
    body: 'sans-serif',
    label: 'sans-serif'
  };

  const narrative = template?.narrativeCopy || {
    headline: 'Property Vision',
    vision: 'A unique living experience.',
    story: 'Meticulously crafted for modern life.'
  };

  // Ensure template.sections exists and filter out invalid sections
  const validSections = (template?.sections || []).filter(s => s && s.type);
  const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

  if (sortedSections.length === 0) {
    return (
      <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
        No architectural sections defined. Please try regenerating.
      </div>
    );
  }

  const renderSection = (section: LayoutSection, index: number) => {
    const { type, variant, config } = section;
    
    // Fix: Use a full default object for safeConfig to satisfy TypeScript types and provide consistent fallbacks
    const safeConfig: LayoutSection['config'] = {
      backgroundColor: 'transparent',
      textColor: palette.text,
      padding: '8rem 4rem',
      titleSize: 'text-7xl lg:text-9xl',
      order: index,
      ...config
    };

    const isAsymmetric = variant === 'asymmetric';
    const isGlass = variant === 'glass';
    
    const styleObj = {
      backgroundColor: safeConfig.backgroundColor,
      color: safeConfig.textColor,
      padding: safeConfig.padding,
      fontFamily: typography.body,
    };

    const headingStyle = {
      fontFamily: typography.heading,
      color: safeConfig.textColor,
    };

    switch (type) {
      case 'hero':
        return (
          <header 
            key={`${type}-${index}`} 
            className={`relative min-h-[95vh] flex items-center overflow-hidden transition-all duration-1000 ${variant === 'split' ? 'flex-row' : 'flex-col justify-center'}`} 
            style={{ background: palette.gradient || palette.background }}
          >
            <div className={`absolute inset-0 opacity-10 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap leading-none blur-sm`} style={headingStyle}>
              {data.title ? data.title.split(' ')[0] : ''}
            </div>

            <div className={`relative z-20 w-full max-w-7xl mx-auto flex ${variant === 'split' ? 'flex-row' : 'flex-col items-center text-center'}`}>
               <div className={`${variant === 'split' ? 'w-1/2 pr-20' : 'w-full mb-12'}`}>
                  <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold" style={{ fontFamily: typography.label }}>
                    Fine Living / {data.location || 'Exquisite Address'}
                  </span>
                  <h1 className={`${safeConfig.titleSize} font-bold leading-[0.85] mb-12 uppercase tracking-tighter`} style={headingStyle}>
                    {data.title || 'Architectural Gem'}
                  </h1>
                  <div className={`flex items-center gap-8 ${variant === 'split' ? '' : 'justify-center'}`}>
                    <div className="w-16 h-[2px]" style={{ backgroundColor: palette.accent }} />
                    <span className="text-5xl font-light tracking-tighter italic">{data.price || 'Price Upon Request'}</span>
                  </div>
               </div>
               
               <div className={`${variant === 'split' ? 'w-1/2 aspect-[4/5]' : 'w-full max-w-4xl aspect-video'} relative overflow-hidden shadow-2xl group bg-slate-100`}>
                  {data.images && data.images[0] ? (
                    <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Hero Media</div>
                  )}
                  {isGlass && <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />}
               </div>
            </div>
          </header>
        );

      case 'specs_grid':
        return (
          <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
             <div className={`max-w-7xl mx-auto grid ${isAsymmetric ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4'} gap-12`}>
                {[
                  { label: 'Sleep', val: data.specs?.beds || '-' },
                  { label: 'Baths', val: data.specs?.baths || '-' },
                  { label: 'Surface', val: data.specs?.sqft ? `${data.specs.sqft}ft²` : '-' },
                  { label: 'Era', val: data.specs?.yearBuilt || '-' }
                ].map((s, idx) => (
                  <div key={idx} className={`${isAsymmetric && idx % 2 === 0 ? 'mt-12' : ''} text-center group`}>
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40 group-hover:text-indigo-500 transition-colors">{s.label}</span>
                    <span className="text-6xl font-extralight tracking-tighter">{s.val}</span>
                  </div>
                ))}
             </div>
          </section>
        );

      case 'narrative':
        return (
          <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden">
            <div className={`max-w-7xl mx-auto flex flex-col ${isAsymmetric ? 'md:flex-row-reverse' : 'md:flex-row'} gap-32 items-center`}>
              <div className="md:w-1/2">
                <h2 className="text-6xl font-bold mb-12 leading-none uppercase italic" style={headingStyle}>
                  {narrative.headline}
                </h2>
                <div className="space-y-10">
                  <p className="text-3xl font-light leading-snug opacity-90 border-l-4 pl-12" style={{ borderColor: palette.accent }}>
                    {narrative.vision}
                  </p>
                  <p className="text-xl leading-relaxed opacity-60 font-serif">
                    {narrative.story}
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 w-full aspect-square overflow-hidden relative bg-slate-100">
                 {data.images && (data.images[1] || data.images[0]) ? (
                   <img src={data.images[1] || data.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Media</div>
                 )}
                 {variant === 'overlap' && (
                   <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-white z-10 hidden md:block" style={{ backgroundColor: palette.accent }} />
                 )}
              </div>
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
             <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[700px]">
                <div className="col-span-12 md:col-span-7 overflow-hidden relative group bg-slate-100">
                   {data.images && (data.images[2] || data.images[0]) && (
                     <img src={data.images[2] || data.images[0]} className="w-full h-full object-cover" />
                   )}
                </div>
                <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
                   <div className="flex-1 overflow-hidden bg-slate-100">
                      {data.images && (data.images[3] || data.images[0]) && (
                        <img src={data.images[3] || data.images[0]} className="w-full h-full object-cover" />
                      )}
                   </div>
                   <div className="flex-1 overflow-hidden bg-black/5 flex items-center justify-center p-12 text-center italic opacity-60">
                      "Space is the breath of art."
                   </div>
                </div>
             </div>
          </section>
        );

      case 'features':
        return (
          <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden bg-slate-950">
            <div className="max-w-7xl mx-auto">
               <h3 className="text-xs font-black tracking-[0.6em] uppercase mb-20 text-center opacity-30">The Refined Details</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5">
                {(data.amenities || []).length > 0 ? (data.amenities || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-16 hover:bg-slate-900 transition-all border border-white/5">
                    <span className="text-[10px] font-mono opacity-40 block mb-6">0{idx + 1} //</span>
                    <h3 className="text-3xl font-medium mb-6 uppercase tracking-tight" style={headingStyle}>{item}</h3>
                    <div className="w-8 h-[2px]" style={{ backgroundColor: palette.accent }} />
                  </div>
                )) : (
                  <div className="col-span-full p-20 text-center opacity-30 uppercase tracking-[0.5em] text-[10px]">Custom Features Coming Soon</div>
                )}
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={`${type}-${index}`} className="relative py-48 px-8 overflow-hidden" style={styleObj}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
              <div className="w-48 h-48 rounded-full overflow-hidden grayscale border-2 border-current p-2 bg-slate-50">
                 {data.agent?.photoUrl ? (
                   <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover rounded-full" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">NO PHOTO</div>
                 )}
              </div>
              <div className="flex-1 text-left">
                <h2 className="text-8xl font-black mb-6 leading-none tracking-tighter" style={headingStyle}>
                   {data.agent?.name ? data.agent.name.split(' ')[0] : 'Inquire'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-current/10">
                   <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Representative</p>
                      <p className="text-lg font-bold uppercase tracking-tight">{data.agent?.title || 'Exclusive Agent'}</p>
                   </div>
                   <div className="space-y-2">
                      <p className="font-mono text-sm">{data.agent?.phone || 'Contact Info Protected'}</p>
                      <p className="font-mono text-sm underline opacity-60">{data.agent?.email || 'exclusive@dreamexprop.com'}</p>
                   </div>
                </div>
              </div>
              <button className="px-16 py-8 border-2 border-current font-black uppercase tracking-[0.3em] text-xs hover:bg-current hover:text-white transition-all transform hover:scale-105 active:scale-95">
                Acquire Sanctuary
              </button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="print-area shadow-[0_0_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden" style={{ backgroundColor: palette.background, color: palette.text }}>
      <div className="animate-in fade-in duration-1000">
        {sortedSections.map(renderSection)}
      </div>
      <footer className="p-12 text-[9px] tracking-[0.5em] uppercase opacity-20 text-center flex flex-col gap-2">
        <span>DreamExProperties Architectural Suite</span>
        <span>{data.location || 'GLOBAL'} Exclusive Distribution</span>
      </footer>
    </div>
  );
};

export default BrochureRenderer;
