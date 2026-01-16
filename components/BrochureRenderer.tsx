
// import React from 'react';
// import { PropertyData, BrochureTemplate, LayoutSection } from './types';

// interface Props {
//   data: PropertyData;
//   template: BrochureTemplate;
// }

// const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
//   // Enhanced safety check with default fallbacks for essential rendering properties
//   const palette = template?.palette || {
//     background: '#ffffff',
//     text: '#000000',
//     accent: '#6366f1',
//     primary: '#000000',
//     secondary: '#f8fafc'
//   };

//   const typography = template?.typography || {
//     heading: 'serif',
//     body: 'sans-serif',
//     label: 'sans-serif'
//   };

//   const narrative = template?.narrativeCopy || {
//     headline: 'Property Vision',
//     vision: 'A unique living experience.',
//     story: 'Meticulously crafted for modern life.'
//   };

//   // Ensure template.sections exists and filter out invalid sections
//   const validSections = (template?.sections || []).filter(s => s && s.type);
//   const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

//   if (sortedSections.length === 0) {
//     return (
//       <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
//         No architectural sections defined. Please try regenerating.
//       </div>
//     );
//   }

//   const renderSection = (section: LayoutSection, index: number) => {
//     const { type, variant, config } = section;
    
//     // Fix: Use a full default object for safeConfig to satisfy TypeScript types and provide consistent fallbacks
//     const safeConfig: LayoutSection['config'] = {
//       backgroundColor: 'transparent',
//       textColor: palette.text,
//       padding: '8rem 4rem',
//       titleSize: 'text-7xl lg:text-9xl',
//       order: index,
//       ...config
//     };

//     const isAsymmetric = variant === 'asymmetric';
//     const isGlass = variant === 'glass';
    
//     const styleObj = {
//       backgroundColor: safeConfig.backgroundColor,
//       color: safeConfig.textColor,
//       padding: safeConfig.padding,
//       fontFamily: typography.body,
//     };

//     const headingStyle = {
//       fontFamily: typography.heading,
//       color: safeConfig.textColor,
//     };

//     switch (type) {
//       case 'hero':
//         return (
//           <header 
//             key={`${type}-${index}`} 
//             className={`relative min-h-[95vh] flex items-center overflow-hidden transition-all duration-1000 ${variant === 'split' ? 'flex-row' : 'flex-col justify-center'}`} 
//             style={{ background: palette.gradient || palette.background }}
//           >
//             <div className={`absolute inset-0 opacity-10 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap leading-none blur-sm`} style={headingStyle}>
//               {data.title ? data.title.split(' ')[0] : ''}
//             </div>

//             <div className={`relative z-20 w-full max-w-7xl mx-auto flex ${variant === 'split' ? 'flex-row' : 'flex-col items-center text-center'}`}>
//                <div className={`${variant === 'split' ? 'w-1/2 pr-20' : 'w-full mb-12'}`}>
//                   <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold" style={{ fontFamily: typography.label }}>
//                     Fine Living / {data.location || 'Exquisite Address'}
//                   </span>
//                   <h1 className={`${safeConfig.titleSize} font-bold leading-[0.85] mb-12 uppercase tracking-tighter`} style={headingStyle}>
//                     {data.title || 'Architectural Gem'}
//                   </h1>
//                   <div className={`flex items-center gap-8 ${variant === 'split' ? '' : 'justify-center'}`}>
//                     <div className="w-16 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                     <span className="text-5xl font-light tracking-tighter italic">{data.price || 'Price Upon Request'}</span>
//                   </div>
//                </div>
               
//                <div className={`${variant === 'split' ? 'w-1/2 aspect-[4/5]' : 'w-full max-w-4xl aspect-video'} relative overflow-hidden shadow-2xl group bg-slate-100`}>
//                   {data.images && data.images[0] ? (
//                     <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Hero Media</div>
//                   )}
//                   {isGlass && <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />}
//                </div>
//             </div>
//           </header>
//         );

//       case 'specs_grid':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
//              <div className={`max-w-7xl mx-auto grid ${isAsymmetric ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4'} gap-12`}>
//                 {[
//                   { label: 'Sleep', val: data.specs?.beds || '-' },
//                   { label: 'Baths', val: data.specs?.baths || '-' },
//                   { label: 'Surface', val: data.specs?.sqft ? `${data.specs.sqft}ft²` : '-' },
//                   { label: 'Era', val: data.specs?.yearBuilt || '-' }
//                 ].map((s, idx) => (
//                   <div key={idx} className={`${isAsymmetric && idx % 2 === 0 ? 'mt-12' : ''} text-center group`}>
//                     <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40 group-hover:text-indigo-500 transition-colors">{s.label}</span>
//                     <span className="text-6xl font-extralight tracking-tighter">{s.val}</span>
//                   </div>
//                 ))}
//              </div>
//           </section>
//         );

//       case 'narrative':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden">
//             <div className={`max-w-7xl mx-auto flex flex-col ${isAsymmetric ? 'md:flex-row-reverse' : 'md:flex-row'} gap-32 items-center`}>
//               <div className="md:w-1/2">
//                 <h2 className="text-6xl font-bold mb-12 leading-none uppercase italic" style={headingStyle}>
//                   {narrative.headline}
//                 </h2>
//                 <div className="space-y-10">
//                   <p className="text-3xl font-light leading-snug opacity-90 border-l-4 pl-12" style={{ borderColor: palette.accent }}>
//                     {narrative.vision}
//                   </p>
//                   <p className="text-xl leading-relaxed opacity-60 font-serif">
//                     {narrative.story}
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 w-full aspect-square overflow-hidden relative bg-slate-100">
//                  {data.images && (data.images[1] || data.images[0]) ? (
//                    <img src={data.images[1] || data.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Media</div>
//                  )}
//                  {variant === 'overlap' && (
//                    <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-white z-10 hidden md:block" style={{ backgroundColor: palette.accent }} />
//                  )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'gallery':
//         return (
//           <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
//              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[700px]">
//                 <div className="col-span-12 md:col-span-7 overflow-hidden relative group bg-slate-100">
//                    {data.images && (data.images[2] || data.images[0]) && (
//                      <img src={data.images[2] || data.images[0]} className="w-full h-full object-cover" />
//                    )}
//                 </div>
//                 <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
//                    <div className="flex-1 overflow-hidden bg-slate-100">
//                       {data.images && (data.images[3] || data.images[0]) && (
//                         <img src={data.images[3] || data.images[0]} className="w-full h-full object-cover" />
//                       )}
//                    </div>
//                    <div className="flex-1 overflow-hidden bg-black/5 flex items-center justify-center p-12 text-center italic opacity-60">
//                       "Space is the breath of art."
//                    </div>
//                 </div>
//              </div>
//           </section>
//         );

//       case 'features':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden bg-slate-950">
//             <div className="max-w-7xl mx-auto">
//                <h3 className="text-xs font-black tracking-[0.6em] uppercase mb-20 text-center opacity-30">The Refined Details</h3>
//                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5">
//                 {(data.amenities || []).length > 0 ? (data.amenities || []).map((item, idx) => (
//                   <div key={idx} className="bg-slate-950 p-16 hover:bg-slate-900 transition-all border border-white/5">
//                     <span className="text-[10px] font-mono opacity-40 block mb-6">0{idx + 1} //</span>
//                     <h3 className="text-3xl font-medium mb-6 uppercase tracking-tight" style={headingStyle}>{item}</h3>
//                     <div className="w-8 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                   </div>
//                 )) : (
//                   <div className="col-span-full p-20 text-center opacity-30 uppercase tracking-[0.5em] text-[10px]">Custom Features Coming Soon</div>
//                 )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'cta':
//         return (
//           <section key={`${type}-${index}`} className="relative py-48 px-8 overflow-hidden" style={styleObj}>
//             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
//               <div className="w-48 h-48 rounded-full overflow-hidden grayscale border-2 border-current p-2 bg-slate-50">
//                  {data.agent?.photoUrl ? (
//                    <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover rounded-full" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">NO PHOTO</div>
//                  )}
//               </div>
//               <div className="flex-1 text-left">
//                 <h2 className="text-8xl font-black mb-6 leading-none tracking-tighter" style={headingStyle}>
//                    {data.agent?.name ? data.agent.name.split(' ')[0] : 'Inquire'}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-current/10">
//                    <div>
//                       <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Representative</p>
//                       <p className="text-lg font-bold uppercase tracking-tight">{data.agent?.title || 'Exclusive Agent'}</p>
//                    </div>
//                    <div className="space-y-2">
//                       <p className="font-mono text-sm">{data.agent?.phone || 'Contact Info Protected'}</p>
//                       <p className="font-mono text-sm underline opacity-60">{data.agent?.email || 'exclusive@dreamexprop.com'}</p>
//                    </div>
//                 </div>
//               </div>
//               <button className="px-16 py-8 border-2 border-current font-black uppercase tracking-[0.3em] text-xs hover:bg-current hover:text-white transition-all transform hover:scale-105 active:scale-95">
//                 Acquire Sanctuary
//               </button>
//             </div>
//           </section>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="print-area shadow-[0_0_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden" style={{ backgroundColor: palette.background, color: palette.text }}>
//       <div className="animate-in fade-in duration-1000">
//         {sortedSections.map(renderSection)}
//       </div>
//       <footer className="p-12 text-[9px] tracking-[0.5em] uppercase opacity-20 text-center flex flex-col gap-2">
//         <span>DreamExProperties Architectural Suite</span>
//         <span>{data.location || 'GLOBAL'} Exclusive Distribution</span>
//       </footer>
//     </div>
//   );
// };

// export default BrochureRenderer;

// import React from 'react';
// import { PropertyData, BrochureTemplate, LayoutSection } from './types';

// interface Props {
//   data: PropertyData;
//   template: BrochureTemplate;
// }

// const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
//   // Enhanced safety check with default fallbacks for essential rendering properties
//   const palette = template?.palette || {
//     background: '#ffffff',
//     text: '#000000',
//     accent: '#6366f1',
//     primary: '#000000',
//     secondary: '#f8fafc'
//   };

//   const typography = template?.typography || {
//     heading: 'serif',
//     body: 'sans-serif',
//     label: 'sans-serif'
//   };

//   const narrative = template?.narrativeCopy || {
//     headline: 'Property Vision',
//     vision: 'A unique living experience.',
//     story: 'Meticulously crafted for modern life.'
//   };

//   // Ensure template.sections exists and filter out invalid sections
//   const validSections = (template?.sections || []).filter(s => s && s.type);
//   const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

//   if (sortedSections.length === 0) {
//     return (
//       <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
//         No architectural sections defined. Please try regenerating.
//       </div>
//     );
//   }

//   const renderSection = (section: LayoutSection, index: number) => {
//     const { type, variant, config } = section;
    
//     // Fix: Use a full default object for safeConfig to satisfy TypeScript types and provide consistent fallbacks
//     const safeConfig: LayoutSection['config'] = {
//       backgroundColor: 'transparent',
//       textColor: palette.text,
//       padding: '8rem 4rem',
//       titleSize: 'text-7xl lg:text-9xl',
//       order: index,
//       ...config
//     };

//     const isAsymmetric = variant === 'asymmetric';
//     const isGlass = variant === 'glass';
    
//     const styleObj = {
//       backgroundColor: safeConfig.backgroundColor,
//       color: safeConfig.textColor,
//       padding: safeConfig.padding,
//       fontFamily: typography.body,
//     };

//     const headingStyle = {
//       fontFamily: typography.heading,
//       color: safeConfig.textColor,
//     };

//     switch (type) {
//       case 'hero':
//         return (
//           <header 
//             key={`${type}-${index}`} 
//             className={`relative min-h-[95vh] flex items-center overflow-hidden transition-all duration-1000 ${variant === 'split' ? 'flex-row' : 'flex-col justify-center'}`} 
//             style={{ background: palette.gradient || palette.background }}
//           >
//             <div className={`absolute inset-0 opacity-10 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap leading-none blur-sm`} style={headingStyle}>
//               {data.title ? data.title.split(' ')[0] : ''}
//             </div>

//             <div className={`relative z-20 w-full max-w-7xl mx-auto flex ${variant === 'split' ? 'flex-row' : 'flex-col items-center text-center'}`}>
//                <div className={`${variant === 'split' ? 'w-1/2 pr-20' : 'w-full mb-12'}`}>
//                   <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold" style={{ fontFamily: typography.label }}>
//                     Fine Living / {data.location || 'Exquisite Address'}
//                   </span>
//                   <h1 className={`${safeConfig.titleSize} font-bold leading-[0.85] mb-12 uppercase tracking-tighter`} style={headingStyle}>
//                     {data.title || 'Architectural Gem'}
//                   </h1>
//                   <div className={`flex items-center gap-8 ${variant === 'split' ? '' : 'justify-center'}`}>
//                     <div className="w-16 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                     <span className="text-5xl font-light tracking-tighter italic">{data.price || 'Price Upon Request'}</span>
//                   </div>
//                </div>
               
//                <div className={`${variant === 'split' ? 'w-1/2 aspect-[4/5]' : 'w-full max-w-4xl aspect-video'} relative overflow-hidden shadow-2xl group bg-slate-100`}>
//                   {data.images && data.images[0] ? (
//                     <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Hero Media</div>
//                   )}
//                   {isGlass && <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />}
//                </div>
//             </div>
//           </header>
//         );

//       case 'specs_grid':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
//              <div className={`max-w-7xl mx-auto grid ${isAsymmetric ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4'} gap-12`}>
//                 {[
//                   { label: 'Sleep', val: data.specs?.beds || '-' },
//                   { label: 'Baths', val: data.specs?.baths || '-' },
//                   { label: 'Surface', val: data.specs?.sqft ? `${data.specs.sqft}ft²` : '-' },
//                   { label: 'Era', val: data.specs?.yearBuilt || '-' }
//                 ].map((s, idx) => (
//                   <div key={idx} className={`${isAsymmetric && idx % 2 === 0 ? 'mt-12' : ''} text-center group`}>
//                     <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40 group-hover:text-indigo-500 transition-colors">{s.label}</span>
//                     <span className="text-6xl font-extralight tracking-tighter">{s.val}</span>
//                   </div>
//                 ))}
//              </div>
//           </section>
//         );

//       case 'narrative':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden">
//             <div className={`max-w-7xl mx-auto flex flex-col ${isAsymmetric ? 'md:flex-row-reverse' : 'md:flex-row'} gap-32 items-center`}>
//               <div className="md:w-1/2">
//                 <h2 className="text-6xl font-bold mb-12 leading-none uppercase italic" style={headingStyle}>
//                   {narrative.headline}
//                 </h2>
//                 <div className="space-y-10">
//                   <p className="text-3xl font-light leading-snug opacity-90 border-l-4 pl-12" style={{ borderColor: palette.accent }}>
//                     {narrative.vision}
//                   </p>
//                   <p className="text-xl leading-relaxed opacity-60 font-serif">
//                     {narrative.story}
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 w-full aspect-square overflow-hidden relative bg-slate-100">
//                  {data.images && (data.images[1] || data.images[0]) ? (
//                    <img src={data.images[1] || data.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Media</div>
//                  )}
//                  {variant === 'overlap' && (
//                    <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-white z-10 hidden md:block" style={{ backgroundColor: palette.accent }} />
//                  )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'gallery':
//         return (
//           <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
//              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[700px]">
//                 <div className="col-span-12 md:col-span-7 overflow-hidden relative group bg-slate-100">
//                    {data.images && (data.images[2] || data.images[0]) && (
//                      <img src={data.images[2] || data.images[0]} className="w-full h-full object-cover" />
//                    )}
//                 </div>
//                 <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
//                    <div className="flex-1 overflow-hidden bg-slate-100">
//                       {data.images && (data.images[3] || data.images[0]) && (
//                         <img src={data.images[3] || data.images[0]} className="w-full h-full object-cover" />
//                       )}
//                    </div>
//                    <div className="flex-1 overflow-hidden bg-black/5 flex items-center justify-center p-12 text-center italic opacity-60">
//                       "Space is the breath of art."
//                    </div>
//                 </div>
//              </div>
//           </section>
//         );

//       case 'features':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden bg-slate-950">
//             <div className="max-w-7xl mx-auto">
//                <h3 className="text-xs font-black tracking-[0.6em] uppercase mb-20 text-center opacity-30">The Refined Details</h3>
//                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5">
//                 {(data.amenities || []).length > 0 ? (data.amenities || []).map((item, idx) => (
//                   <div key={idx} className="bg-slate-950 p-16 hover:bg-slate-900 transition-all border border-white/5">
//                     <span className="text-[10px] font-mono opacity-40 block mb-6">0{idx + 1} //</span>
//                     <h3 className="text-3xl font-medium mb-6 uppercase tracking-tight" style={headingStyle}>{item}</h3>
//                     <div className="w-8 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                   </div>
//                 )) : (
//                   <div className="col-span-full p-20 text-center opacity-30 uppercase tracking-[0.5em] text-[10px]">Custom Features Coming Soon</div>
//                 )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'cta':
//         return (
//           <section key={`${type}-${index}`} className="relative py-48 px-8 overflow-hidden" style={styleObj}>
//             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
//               <div className="w-48 h-48 rounded-full overflow-hidden grayscale border-2 border-current p-2 bg-slate-50">
//                  {data.agent?.photoUrl ? (
//                    <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover rounded-full" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">NO PHOTO</div>
//                  )}
//               </div>
//               <div className="flex-1 text-left">
//                 <h2 className="text-8xl font-black mb-6 leading-none tracking-tighter" style={headingStyle}>
//                    {data.agent?.name ? data.agent.name.split(' ')[0] : 'Inquire'}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-current/10">
//                    <div>
//                       <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Representative</p>
//                       <p className="text-lg font-bold uppercase tracking-tight">{data.agent?.title || 'Exclusive Agent'}</p>
//                    </div>
//                    <div className="space-y-2">
//                       <p className="font-mono text-sm">{data.agent?.phone || 'Contact Info Protected'}</p>
//                       <p className="font-mono text-sm underline opacity-60">{data.agent?.email || 'exclusive@dreamexprop.com'}</p>
//                    </div>
//                 </div>
//               </div>
//               <button className="px-16 py-8 border-2 border-current font-black uppercase tracking-[0.3em] text-xs hover:bg-current hover:text-white transition-all transform hover:scale-105 active:scale-95">
//                 Acquire Sanctuary
//               </button>
//             </div>
//           </section>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="print-area shadow-[0_0_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden" style={{ backgroundColor: palette.background, color: palette.text }}>
//       <div className="animate-in fade-in duration-1000">
//         {sortedSections.map(renderSection)}
//       </div>
//       <footer className="p-12 text-[9px] tracking-[0.5em] uppercase opacity-20 text-center flex flex-col gap-2">
//         <span>DreamExProperties Architectural Suite</span>
//         <span>{data.location || 'GLOBAL'} Exclusive Distribution</span>
//       </footer>
//     </div>
//   );
// };

// export default BrochureRenderer;

// import React from 'react';
// import { PropertyData, BrochureTemplate, LayoutSection } from './types';

// interface Props {
//   data: PropertyData;
//   template: BrochureTemplate;
// }

// const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
//   // Enhanced safety check with default fallbacks for essential rendering properties
//   const palette = template?.palette || {
//     background: '#ffffff',
//     text: '#000000',
//     accent: '#6366f1',
//     primary: '#000000',
//     secondary: '#f8fafc'
//   };

//   const typography = template?.typography || {
//     heading: 'serif',
//     body: 'sans-serif',
//     label: 'sans-serif'
//   };

//   const narrative = template?.narrativeCopy || {
//     headline: 'Property Vision',
//     vision: 'A unique living experience.',
//     story: 'Meticulously crafted for modern life.'
//   };

//   // Ensure template.sections exists and filter out invalid sections
//   const validSections = (template?.sections || []).filter(s => s && s.type);
//   const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

//   if (sortedSections.length === 0) {
//     return (
//       <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
//         No architectural sections defined. Please try regenerating.
//       </div>
//     );
//   }

//   const renderSection = (section: LayoutSection, index: number) => {
//     const { type, variant, config } = section;
    
//     // Fix: Use a full default object for safeConfig to satisfy TypeScript types and provide consistent fallbacks
//     const safeConfig: LayoutSection['config'] = {
//       backgroundColor: 'transparent',
//       textColor: palette.text,
//       padding: '8rem 4rem',
//       titleSize: 'text-7xl lg:text-9xl',
//       order: index,
//       ...config
//     };

//     const isAsymmetric = variant === 'asymmetric';
//     const isGlass = variant === 'glass';
    
//     const styleObj = {
//       backgroundColor: safeConfig.backgroundColor,
//       color: safeConfig.textColor,
//       padding: safeConfig.padding,
//       fontFamily: typography.body,
//     };

//     const headingStyle = {
//       fontFamily: typography.heading,
//       color: safeConfig.textColor,
//     };

//     switch (type) {
//       case 'hero':
//         return (
//           <header 
//             key={`${type}-${index}`} 
//             className={`relative min-h-[95vh] flex items-center overflow-hidden transition-all duration-1000 ${variant === 'split' ? 'flex-row' : 'flex-col justify-center'}`} 
//             style={{ background: palette.gradient || palette.background }}
//           >
//             <div className={`absolute inset-0 opacity-10 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap leading-none blur-sm`} style={headingStyle}>
//               {data.title ? data.title.split(' ')[0] : ''}
//             </div>

//             <div className={`relative z-20 w-full max-w-7xl mx-auto flex ${variant === 'split' ? 'flex-row' : 'flex-col items-center text-center'}`}>
//                <div className={`${variant === 'split' ? 'w-1/2 pr-20' : 'w-full mb-12'}`}>
//                   <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold" style={{ fontFamily: typography.label }}>
//                     Fine Living / {data.location || 'Exquisite Address'}
//                   </span>
//                   <h1 className={`${safeConfig.titleSize} font-bold leading-[0.85] mb-12 uppercase tracking-tighter`} style={headingStyle}>
//                     {data.title || 'Architectural Gem'}
//                   </h1>
//                   <div className={`flex items-center gap-8 ${variant === 'split' ? '' : 'justify-center'}`}>
//                     <div className="w-16 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                     <span className="text-5xl font-light tracking-tighter italic">{data.price || 'Price Upon Request'}</span>
//                   </div>
//                </div>
               
//                <div className={`${variant === 'split' ? 'w-1/2 aspect-[4/5]' : 'w-full max-w-4xl aspect-video'} relative overflow-hidden shadow-2xl group bg-slate-100`}>
//                   {data.images && data.images[0] ? (
//                     <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Hero Media</div>
//                   )}
//                   {isGlass && <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />}
//                </div>
//             </div>
//           </header>
//         );

//       case 'specs_grid':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
//              <div className={`max-w-7xl mx-auto grid ${isAsymmetric ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-4'} gap-12`}>
//                 {[
//                   { label: 'Sleep', val: data.specs?.beds || '-' },
//                   { label: 'Baths', val: data.specs?.baths || '-' },
//                   { label: 'Surface', val: data.specs?.sqft ? `${data.specs.sqft}ft²` : '-' },
//                   { label: 'Era', val: data.specs?.yearBuilt || '-' }
//                 ].map((s, idx) => (
//                   <div key={idx} className={`${isAsymmetric && idx % 2 === 0 ? 'mt-12' : ''} text-center group`}>
//                     <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40 group-hover:text-indigo-500 transition-colors">{s.label}</span>
//                     <span className="text-6xl font-extralight tracking-tighter">{s.val}</span>
//                   </div>
//                 ))}
//              </div>
//           </section>
//         );

//       case 'narrative':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden">
//             <div className={`max-w-7xl mx-auto flex flex-col ${isAsymmetric ? 'md:flex-row-reverse' : 'md:flex-row'} gap-32 items-center`}>
//               <div className="md:w-1/2">
//                 <h2 className="text-6xl font-bold mb-12 leading-none uppercase italic" style={headingStyle}>
//                   {narrative.headline}
//                 </h2>
//                 <div className="space-y-10">
//                   <p className="text-3xl font-light leading-snug opacity-90 border-l-4 pl-12" style={{ borderColor: palette.accent }}>
//                     {narrative.vision}
//                   </p>
//                   <p className="text-xl leading-relaxed opacity-60 font-serif">
//                     {narrative.story}
//                   </p>
//                 </div>
//               </div>
//               <div className="md:w-1/2 w-full aspect-square overflow-hidden relative bg-slate-100">
//                  {data.images && (data.images[1] || data.images[0]) ? (
//                    <img src={data.images[1] || data.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">No Media</div>
//                  )}
//                  {variant === 'overlap' && (
//                    <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-white z-10 hidden md:block" style={{ backgroundColor: palette.accent }} />
//                  )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'gallery':
//         return (
//           <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
//              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[700px]">
//                 <div className="col-span-12 md:col-span-7 overflow-hidden relative group bg-slate-100">
//                    {data.images && (data.images[2] || data.images[0]) && (
//                      <img src={data.images[2] || data.images[0]} className="w-full h-full object-cover" />
//                    )}
//                 </div>
//                 <div className="col-span-12 md:col-span-5 flex flex-col gap-8">
//                    <div className="flex-1 overflow-hidden bg-slate-100">
//                       {data.images && (data.images[3] || data.images[0]) && (
//                         <img src={data.images[3] || data.images[0]} className="w-full h-full object-cover" />
//                       )}
//                    </div>
//                    <div className="flex-1 overflow-hidden bg-black/5 flex items-center justify-center p-12 text-center italic opacity-60">
//                       "Space is the breath of art."
//                    </div>
//                 </div>
//              </div>
//           </section>
//         );

//       case 'features':
//         return (
//           <section key={`${type}-${index}`} style={styleObj} className="relative overflow-hidden bg-slate-950">
//             <div className="max-w-7xl mx-auto">
//                <h3 className="text-xs font-black tracking-[0.6em] uppercase mb-20 text-center opacity-30">The Refined Details</h3>
//                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5">
//                 {(data.amenities || []).length > 0 ? (data.amenities || []).map((item, idx) => (
//                   <div key={idx} className="bg-slate-950 p-16 hover:bg-slate-900 transition-all border border-white/5">
//                     <span className="text-[10px] font-mono opacity-40 block mb-6">0{idx + 1} //</span>
//                     <h3 className="text-3xl font-medium mb-6 uppercase tracking-tight" style={headingStyle}>{item}</h3>
//                     <div className="w-8 h-[2px]" style={{ backgroundColor: palette.accent }} />
//                   </div>
//                 )) : (
//                   <div className="col-span-full p-20 text-center opacity-30 uppercase tracking-[0.5em] text-[10px]">Custom Features Coming Soon</div>
//                 )}
//               </div>
//             </div>
//           </section>
//         );

//       case 'cta':
//         return (
//           <section key={`${type}-${index}`} className="relative py-48 px-8 overflow-hidden" style={styleObj}>
//             <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
//               <div className="w-48 h-48 rounded-full overflow-hidden grayscale border-2 border-current p-2 bg-slate-50">
//                  {data.agent?.photoUrl ? (
//                    <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover rounded-full" />
//                  ) : (
//                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-300">NO PHOTO</div>
//                  )}
//               </div>
//               <div className="flex-1 text-left">
//                 <h2 className="text-8xl font-black mb-6 leading-none tracking-tighter" style={headingStyle}>
//                    {data.agent?.name ? data.agent.name.split(' ')[0] : 'Inquire'}
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 pt-12 border-t border-current/10">
//                    <div>
//                       <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Representative</p>
//                       <p className="text-lg font-bold uppercase tracking-tight">{data.agent?.title || 'Exclusive Agent'}</p>
//                    </div>
//                    <div className="space-y-2">
//                       <p className="font-mono text-sm">{data.agent?.phone || 'Contact Info Protected'}</p>
//                       <p className="font-mono text-sm underline opacity-60">{data.agent?.email || 'exclusive@dreamexprop.com'}</p>
//                    </div>
//                 </div>
//               </div>
//               <button className="px-16 py-8 border-2 border-current font-black uppercase tracking-[0.3em] text-xs hover:bg-current hover:text-white transition-all transform hover:scale-105 active:scale-95">
//                 Acquire Sanctuary
//               </button>
//             </div>
//           </section>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="print-area shadow-[0_0_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden" style={{ backgroundColor: palette.background, color: palette.text }}>
//       <div className="animate-in fade-in duration-1000">
//         {sortedSections.map(renderSection)}
//       </div>
//       <footer className="p-12 text-[9px] tracking-[0.5em] uppercase opacity-20 text-center flex flex-col gap-2">
//         <span>DreamExProperties Architectural Suite</span>
//         <span>{data.location || 'GLOBAL'} Exclusive Distribution</span>
//       </footer>
//     </div>
//   );
// };

// export default BrochureRenderer;

import React from 'react';
import { PropertyData, BrochureTemplate, LayoutSection } from './types';
import { MapPin, Calendar, TrendingUp, Award, Phone, Mail } from 'lucide-react';

interface Props {
  data: PropertyData;
  template: BrochureTemplate;
}

const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
  // Safety fallbacks
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

  const layoutDNA = template?.layoutDNA;
  const validSections = (template?.sections || []).filter(s => s && s.type);
  const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

  if (sortedSections.length === 0) {
    return (
      <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
        No architectural sections defined. Please regenerate.
      </div>
    );
  }

  // =========================================================================
  // SECTION RENDERERS
  // =========================================================================

  const renderSection = (section: LayoutSection, index: number) => {
    const { type, variant, config } = section;
    
    const safeConfig: LayoutSection['config'] = {
      backgroundColor: 'transparent',
      textColor: palette.text,
      padding: '8rem 4rem',
      titleSize: 'text-7xl lg:text-9xl',
      order: index,
      alignment: 'left',
      spacing: 'normal',
      ...config
    };

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

    // =======================================================================
    // HERO VARIANTS (8 types)
    // =======================================================================

    if (type === 'hero_fullscreen') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: palette.gradient || palette.background }}>
          {data.images && data.images[0] && (
            <div className="absolute inset-0 opacity-20">
              <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="relative z-10 text-center max-w-6xl px-8">
            <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold">{data.location}</span>
            <h1 className="text-9xl font-bold leading-[0.85] mb-12 uppercase tracking-tighter" style={headingStyle}>{data.title}</h1>
            <div className="text-6xl font-light tracking-tighter italic">{data.price}</div>
          </div>
        </header>
      );
    }

    if (type === 'hero_split') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-screen flex flex-row" style={{ background: palette.background }}>
          <div className="w-1/2 flex items-center justify-center p-20" style={{ backgroundColor: palette.primary, color: palette.background }}>
            <div>
              <span className="inline-block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-60 font-bold">{data.location}</span>
              <h1 className="text-8xl font-bold leading-[0.85] mb-12 uppercase tracking-tighter" style={headingStyle}>{data.title}</h1>
              <div className="text-5xl font-light tracking-tighter italic">{data.price}</div>
            </div>
          </div>
          <div className="w-1/2 relative">
            {data.images && data.images[0] && (
              <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover" />
            )}
          </div>
        </header>
      );
    }

    if (type === 'hero_minimal') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-[70vh] flex items-end p-20" style={{ backgroundColor: palette.background }}>
          <div className="max-w-4xl">
            <h1 className="text-7xl font-light leading-[1.1] mb-8 tracking-tight" style={headingStyle}>{data.title}</h1>
            <div className="flex items-center gap-12 text-sm opacity-60">
              <span>{data.location}</span>
              <span>•</span>
              <span>{data.price}</span>
            </div>
          </div>
        </header>
      );
    }

    if (type === 'hero_magazine') {
      return (
        <header key={`${type}-${index}`} className="relative grid grid-cols-12 gap-0 min-h-screen">
          <div className="col-span-7 relative overflow-hidden">
            {data.images && data.images[0] && (
              <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="col-span-5 flex flex-col justify-center p-16" style={{ backgroundColor: palette.surface || palette.secondary }}>
            <span className="text-xs uppercase tracking-[0.3em] mb-6 opacity-50">Featured Property</span>
            <h1 className="text-6xl font-bold leading-[0.95] mb-10 tracking-tight" style={headingStyle}>{data.title}</h1>
            <p className="text-lg leading-relaxed opacity-70 mb-12">{data.description?.slice(0, 150)}...</p>
            <div className="text-4xl font-light italic">{data.price}</div>
          </div>
        </header>
      );
    }

    if (type === 'hero_cinematic') {
      return (
        <header key={`${type}-${index}`} className="relative" style={{ height: '60vh' }}>
          <div className="absolute inset-0 overflow-hidden">
            {data.images && data.images[0] && (
              <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover filter brightness-75" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-20 text-white">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-8xl font-bold leading-[0.9] mb-6 uppercase tracking-tighter">{data.title}</h1>
              <div className="flex items-center gap-8 text-xl">
                <span>{data.location}</span>
                <span className="w-2 h-2 rounded-full bg-white opacity-50" />
                <span className="text-3xl font-light italic">{data.price}</span>
              </div>
            </div>
          </div>
        </header>
      );
    }

    if (type === 'hero_asymmetric') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-screen grid grid-cols-12 gap-8 p-8" style={{ backgroundColor: palette.background }}>
          <div className="col-span-5 flex items-center p-12">
            <div>
              <h1 className="text-7xl font-bold leading-[0.9] mb-8 tracking-tight" style={headingStyle}>{data.title}</h1>
              <p className="text-lg opacity-70 mb-8">{data.location}</p>
              <div className="text-5xl font-light italic" style={{ color: palette.accent }}>{data.price}</div>
            </div>
          </div>
          <div className="col-span-7 grid grid-rows-3 gap-8">
            <div className="row-span-2 overflow-hidden">
              {data.images && data.images[0] && <img src={data.images[0]} className="w-full h-full object-cover" />}
            </div>
            <div className="grid grid-cols-2 gap-8">
              {data.images && data.images[1] && (
                <div className="overflow-hidden">
                  <img src={data.images[1]} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-center text-center p-8" style={{ backgroundColor: palette.accent, color: palette.background }}>
                <div className="text-sm font-bold uppercase tracking-wider">{narrative.tagline || 'Exclusive Offering'}</div>
              </div>
            </div>
          </div>
        </header>
      );
    }

    if (type === 'hero_floating') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: palette.background }}>
          <div className="relative z-10 text-center max-w-4xl">
            <h1 className="text-9xl font-thin leading-[0.85] mb-16 tracking-tighter" style={headingStyle}>{data.title}</h1>
            {data.images && data.images[0] && (
              <div className="relative w-full aspect-[16/9] overflow-hidden shadow-2xl mb-16">
                <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex items-center justify-center gap-12 text-lg">
              <span className="opacity-60">{data.location}</span>
              <div className="w-1 h-1 rounded-full bg-current opacity-30" />
              <span className="text-3xl font-light italic">{data.price}</span>
            </div>
          </div>
        </header>
      );
    }

    if (type === 'hero_diagonal') {
      return (
        <header key={`${type}-${index}`} className="relative min-h-screen overflow-hidden" style={{ backgroundColor: palette.background }}>
          <div className="absolute inset-0 transform rotate-6 scale-150 origin-center">
            {data.images && data.images[0] && (
              <img src={data.images[0]} alt="Hero" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="relative z-10 h-screen flex items-center justify-center">
            <div className="bg-white/95 backdrop-blur-md p-20 shadow-2xl" style={{ maxWidth: '600px' }}>
              <h1 className="text-7xl font-bold leading-[0.9] mb-8 tracking-tight" style={headingStyle}>{data.title}</h1>
              <p className="text-lg opacity-70 mb-6">{data.location}</p>
              <div className="text-5xl font-light italic" style={{ color: palette.accent }}>{data.price}</div>
            </div>
          </div>
        </header>
      );
    }

    // =======================================================================
    // NARRATIVE VARIANTS (6 types)
    // =======================================================================

    if (type === 'narrative_standard') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-32 items-center">
            <div className="md:w-1/2">
              <h2 className="text-6xl font-bold mb-12 leading-none uppercase italic" style={headingStyle}>{narrative.headline}</h2>
              <div className="space-y-10">
                <p className="text-3xl font-light leading-snug opacity-90 border-l-4 pl-12" style={{ borderColor: palette.accent }}>{narrative.vision}</p>
                <p className="text-xl leading-relaxed opacity-60">{narrative.story}</p>
              </div>
            </div>
            <div className="md:w-1/2 w-full aspect-square overflow-hidden relative">
              {data.images && (data.images[1] || data.images[0]) && (
                <img src={data.images[1] || data.images[0]} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Narrative" />
              )}
            </div>
          </div>
        </section>
      );
    }

    if (type === 'narrative_timeline') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-bold mb-20 text-center uppercase tracking-tight" style={headingStyle}>{narrative.headline}</h2>
            <div className="space-y-16 border-l-2 pl-12" style={{ borderColor: palette.accent }}>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-40 mb-4">Chapter One</div>
                <p className="text-2xl leading-relaxed">{narrative.vision}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-40 mb-4">The Vision</div>
                <p className="text-xl leading-relaxed opacity-70">{narrative.story}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-widest opacity-40 mb-4">Today</div>
                <p className="text-lg opacity-60">{data.description?.slice(0, 120) || 'A masterpiece realized.'}</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (type === 'narrative_quote') {
      return (
        <section key={`${type}-${index}`} className="relative py-40" style={{ backgroundColor: palette.primary || palette.accent, color: palette.background }}>
          <div className="max-w-4xl mx-auto text-center px-8">
            <div className="text-8xl font-serif leading-[0.8] mb-8 opacity-10 absolute top-20 left-1/2 transform -translate-x-1/2">"</div>
            <blockquote className="text-5xl font-light leading-snug mb-12 italic relative z-10">{narrative.vision}</blockquote>
            <cite className="text-sm uppercase tracking-[0.3em] not-italic opacity-60">— {data.agent.name || 'The Developer'}</cite>
          </div>
        </section>
      );
    }

    if (type === 'narrative_split') {
      return (
        <section key={`${type}-${index}`} style={styleObj} className="grid grid-cols-2">
          <div className="flex items-center p-20" style={{ backgroundColor: palette.surface || palette.secondary }}>
            <div>
              <h2 className="text-5xl font-bold mb-10 leading-tight" style={headingStyle}>{narrative.headline}</h2>
              <p className="text-xl leading-relaxed opacity-70">{narrative.vision}</p>
            </div>
          </div>
          <div className="flex items-center p-20">
            <p className="text-lg leading-loose opacity-60">{narrative.story}</p>
          </div>
        </section>
      );
    }

    if (type === 'narrative_minimal') {
      return (
        <section key={`${type}-${index}`} className="py-32" style={{ backgroundColor: palette.background }}>
          <div className="max-w-3xl mx-auto text-center px-8">
            <h2 className="text-4xl font-light mb-16 tracking-wide" style={headingStyle}>{narrative.headline}</h2>
            <p className="text-2xl leading-relaxed opacity-70 font-light">{narrative.vision}</p>
          </div>
        </section>
      );
    }

    if (type === 'narrative_editorial') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-6xl mx-auto grid grid-cols-12 gap-16">
            <div className="col-span-4">
              <h2 className="text-3xl font-bold mb-6 uppercase tracking-tight" style={headingStyle}>{narrative.headline}</h2>
              <div className="w-16 h-1" style={{ backgroundColor: palette.accent }} />
            </div>
            <div className="col-span-8">
              <p className="text-2xl leading-relaxed mb-10">{narrative.vision}</p>
              <p className="text-lg leading-loose opacity-60">{narrative.story}</p>
            </div>
          </div>
        </section>
      );
    }

    // =======================================================================
    // GALLERY VARIANTS (7 types)
    // =======================================================================

    if (type === 'gallery_masonry') {
      return (
        <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
          <div className="max-w-7xl mx-auto columns-3 gap-8">
            {(data.images || []).slice(0, 6).map((img, i) => (
              <div key={i} className="break-inside-avoid mb-8 overflow-hidden">
                <img src={img} className="w-full object-cover" alt={`Gallery ${i}`} />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'gallery_grid') {
      return (
        <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4">
            {(data.images || []).slice(0, 6).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Gallery ${i}`} />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'gallery_asymmetric') {
      return (
        <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 h-[700px]">
            <div className="col-span-7 overflow-hidden">
              {data.images && data.images[0] && <img src={data.images[0]} className="w-full h-full object-cover" alt="Large" />}
            </div>
            <div className="col-span-5 flex flex-col gap-8">
              <div className="flex-1 overflow-hidden">
                {data.images && data.images[1] && <img src={data.images[1]} className="w-full h-full object-cover" alt="Small 1" />}
              </div>
              <div className="flex-1 overflow-hidden">
                {data.images && data.images[2] && <img src={data.images[2]} className="w-full h-full object-cover" alt="Small 2" />}
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (type === 'gallery_fullbleed') {
      return (
        <section key={`${type}-${index}`} className="relative h-screen overflow-hidden">
          {data.images && data.images[0] && (
            <img src={data.images[0]} className="w-full h-full object-cover" alt="Fullbleed" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-16 bg-gradient-to-t from-black/80 to-transparent text-white">
            <p className="text-lg font-light italic max-w-2xl">{narrative.tagline || 'Architectural Excellence'}</p>
          </div>
        </section>
      );
    }

    if (type === 'gallery_scattered') {
      return (
        <section key={`${type}-${index}`} className="relative py-40 px-8" style={{ backgroundColor: palette.background }}>
          <div className="max-w-7xl mx-auto relative" style={{ height: '800px' }}>
            {(data.images || []).slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="absolute overflow-hidden shadow-2xl"
                style={{
                  width: i % 2 === 0 ? '400px' : '300px',
                  height: i % 2 === 0 ? '300px' : '400px',
                  top: `${i * 150}px`,
                  left: i % 2 === 0 ? '10%' : '60%',
                  transform: `rotate(${(i - 2) * 5}deg)`,
                  zIndex: 4 - i
                }}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Scattered ${i}`} />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'gallery_triptych') {
      return (
        <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2">
            {(data.images || []).slice(0, 3).map((img, i) => (
              <div key={i} className="aspect-[3/4] overflow-hidden">
                <img src={img} className="w-full h-full object-cover grayscale" alt={`Triptych ${i}`} />
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'gallery_panoramic') {
      return (
        <section key={`${type}-${index}`} className="relative h-[60vh] overflow-hidden">
          {data.images && data.images[0] && (
            <img src={data.images[0]} className="w-full h-full object-cover object-center" alt="Panoramic" />
          )}
        </section>
      );
    }

    // =======================================================================
    // SPECS VARIANTS (4 types)
    // =======================================================================

    if (type === 'specs_grid') {
      return (
        <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12">
            {[
              { label: 'Bedrooms', val: data.specs?.beds || '-' },
              { label: 'Bathrooms', val: data.specs?.baths || '-' },
              { label: 'Square Feet', val: data.specs?.sqft || '-' },
              { label: 'Year Built', val: data.specs?.yearBuilt || '-' }
            ].map((s, idx) => (
              <div key={idx} className="text-center group">
                <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">{s.label}</span>
                <span className="text-6xl font-extralight tracking-tighter">{s.val}</span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'specs_cards') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
            {[
              { label: 'Beds', val: data.specs?.beds, icon: '🛏️' },
              { label: 'Baths', val: data.specs?.baths, icon: '🚿' },
              { label: 'Sq Ft', val: data.specs?.sqft, icon: '📐' },
              { label: 'Built', val: data.specs?.yearBuilt, icon: '📅' }
            ].map((s, idx) => (
              <div key={idx} className="p-8 border border-current/10 hover:border-current/30 transition-all">
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-4xl font-bold mb-2">{s.val}</div>
                <div className="text-sm uppercase tracking-widest opacity-50">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'specs_horizontal') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {[
              { label: 'Bedrooms', val: data.specs?.beds },
              { label: 'Bathrooms', val: data.specs?.baths },
              { label: 'Square Feet', val: data.specs?.sqft },
              { label: 'Year Built', val: data.specs?.yearBuilt }
            ].map((s, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-light mb-3">{s.val}</div>
                <div className="text-xs uppercase tracking-[0.3em] opacity-40">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'specs_minimal') {
      return (
        <section key={`${type}-${index}`} className="py-20" style={{ backgroundColor: palette.background }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center gap-16 text-2xl">
              <span>{data.specs?.beds} Beds</span>
              <span className="opacity-30">•</span>
              <span>{data.specs?.baths} Baths</span>
              <span className="opacity-30">•</span>
              <span>{data.specs?.sqft} SF</span>
            </div>
          </div>
        </section>
      );
    }

    // =======================================================================
    // FEATURES VARIANTS (5 types)
    // =======================================================================

    if (type === 'features_grid') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xs font-black tracking-[0.6em] uppercase mb-20 text-center opacity-30">Refined Details</h3>
            <div className="grid grid-cols-3 gap-1">
              {(data.amenities || []).map((item, idx) => (
                <div key={idx} className="p-16 hover:bg-white/5 transition-all border border-current/5">
                  <span className="text-[10px] font-mono opacity-40 block mb-6">0{idx + 1}</span>
                  <h3 className="text-3xl font-medium uppercase tracking-tight" style={headingStyle}>{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === 'features_list') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-16 uppercase" style={headingStyle}>Amenities</h3>
            <div className="space-y-6">
              {(data.amenities || []).map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 py-6 border-b border-current/10">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.accent }} />
                  <span className="text-xl">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === 'features_cards') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-8">
            {(data.amenities || []).map((item, idx) => (
              <div key={idx} className="p-12 border-2 border-current/10 hover:border-current/30 transition-all">
                <h3 className="text-2xl font-bold mb-4" style={headingStyle}>{item}</h3>
                <p className="text-sm opacity-60">Premium feature included</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'features_minimal') {
      return (
        <section key={`${type}-${index}`} className="py-32" style={{ backgroundColor: palette.background }}>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-8">
              {(data.amenities || []).map((item, idx) => (
                <span key={idx} className="text-sm uppercase tracking-widest opacity-60">{item}</span>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === 'features_icons') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-12">
            {(data.amenities || []).slice(0, 8).map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: palette.accent + '20' }}>
                  <Award className="w-10 h-10" style={{ color: palette.accent }} />
                </div>
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    // =======================================================================
    // SPECIAL SECTIONS (8 types)
    // =======================================================================

    if (type === 'location_map') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-16">
            <div className="flex items-center">
              <div>
                <h3 className="text-4xl font-bold mb-8" style={headingStyle}>Prime Location</h3>
                <p className="text-xl mb-6 flex items-center gap-3">
                  <MapPin className="w-5 h-5" style={{ color: palette.accent }} />
                  {data.location}
                </p>
                <p className="text-lg opacity-60 leading-relaxed">
                  Situated in one of the most sought-after neighborhoods, offering unparalleled access to luxury amenities and cultural landmarks.
                </p>
              </div>
            </div>
            <div className="aspect-square bg-slate-200 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-sm uppercase tracking-widest">Map Visualization</p>
              </div>
            </div>
          </div>
        </section>
      );
    }

    if (type === 'timeline_story') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl font-bold mb-16 text-center" style={headingStyle}>Property Journey</h3>
            <div className="space-y-12">
              {[
                { year: data.specs.yearBuilt, event: 'Construction Completed' },
                { year: '2022', event: 'Premium Renovation' },
                { year: 'Present', event: 'Your Legacy Begins' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-8">
                  <div className="w-24 flex-shrink-0">
                    <div className="text-2xl font-bold" style={{ color: palette.accent }}>{item.year}</div>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-px" style={{ backgroundColor: palette.accent + '30' }} />
                    <p className="text-xl mt-4">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (type === 'testimonial') {
      return (
        <section key={`${type}-${index}`} className="py-32" style={{ backgroundColor: palette.surface || palette.secondary }}>
          <div className="max-w-3xl mx-auto text-center px-8">
            <blockquote className="text-3xl font-light leading-relaxed mb-10 italic">
              "An architectural masterpiece that redefines luxury living. Every detail has been meticulously crafted."
            </blockquote>
            <cite className="text-sm uppercase tracking-[0.3em] not-italic opacity-60">— Architectural Digest</cite>
          </div>
        </section>
      );
    }

    if (type === 'stats_showcase') {
      return (
        <section key={`${type}-${index}`} style={styleObj}>
          <div className="max-w-6xl mx-auto grid grid-cols-3 gap-16">
            {[
              { label: 'Ceiling Height', value: '14', unit: 'Feet' },
              { label: 'Private Terraces', value: '3', unit: 'Spaces' },
              { label: 'Smart Features', value: '200+', unit: 'Integrated' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-7xl font-thin mb-4">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.4em] opacity-40">{stat.unit}</div>
                <div className="text-lg mt-4 opacity-70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (type === 'quote_block') {
      return (
        <section key={`${type}-${index}`} className="py-40" style={{ backgroundColor: palette.primary, color: palette.background }}>
          <div className="max-w-4xl mx-auto text-center px-8">
            <p className="text-5xl font-light leading-snug italic">{narrative.vision}</p>
          </div>
        </section>
      );
    }

    if (type === 'cta_contact') {
      return (
        <section key={`${type}-${index}`} className="relative py-48 px-8" style={styleObj}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-24">
            <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-current p-2">
              {data.agent?.photoUrl ? (
                <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-400 text-xs">No Photo</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-8xl font-black mb-6 leading-none tracking-tighter" style={headingStyle}>
                {data.agent?.name || 'Contact Us'}
              </h2>
              <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-current/10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Agent</p>
                  <p className="text-lg font-bold uppercase tracking-tight">{data.agent?.title || 'Exclusive Representative'}</p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-mono text-sm">{data.agent?.phone || 'Contact Protected'}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-mono text-sm underline opacity-60">{data.agent?.email || 'info@property.com'}</span>
                  </p>
                </div>
              </div>
            </div>
            <button className="px-16 py-8 border-2 border-current font-black uppercase tracking-[0.3em] text-xs hover:bg-current hover:text-white transition-all">
              Schedule Viewing
            </button>
          </div>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="print-area shadow-[0_0_100px_rgba(0,0,0,0.5)] mx-auto overflow-hidden" style={{ backgroundColor: palette.background, color: palette.text }}>
      {/* Layout DNA Debug Info (optional - remove in production) */}
      {layoutDNA && (
        <div className="p-4 bg-black/90 text-white text-[10px] font-mono border-b border-white/10">
          <span className="opacity-50">Layout DNA:</span> {layoutDNA.philosophy} | {layoutDNA.flowPattern} | {layoutDNA.sectionCount} sections | {layoutDNA.rhythm} rhythm
        </div>
      )}
      
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