import React from 'react';
import { PropertyData, BrochureTemplate, LayoutSection } from './types';
import { 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Shield,
  Leaf,
  Sparkles,
  Home
} from 'lucide-react';

interface Props {
  data: PropertyData;
  template: BrochureTemplate;
}

const BrochureRenderer: React.FC<Props> = ({ data, template }) => {
  // Enhanced safety check with default fallbacks
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

  const validSections = (template?.sections || []).filter(s => s && s.type);
  const sortedSections = [...validSections].sort((a, b) => (a.config?.order || 0) - (b.config?.order || 0));

  if (sortedSections.length === 0) {
    return (
      <div className="p-20 text-center text-slate-500 border border-dashed border-white/10">
        No sections defined. Please try regenerating.
      </div>
    );
  }

  // Helper to get first image of specific label or fallback
  const getImageByLabel = (label: string, fallbackIndex: number = 0): string | undefined => {
    const labeledImage = data.images?.find(img => img.label === label);
    if (labeledImage) return labeledImage.url;
    
    // Fallback to ordered images
    return data.images?.[fallbackIndex]?.url;
  };

  // Get cover image
  const coverImage = data.images?.find(img => img.isCover)?.url || getImageByLabel('elevation', 0);

  const renderSection = (section: LayoutSection, index: number) => {
    const { type, variant, config } = section;
    
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
    const isSplit = variant === 'split';
    
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
            className={`relative min-h-[95vh] flex items-center overflow-hidden transition-all duration-1000 ${isSplit ? 'flex-row' : 'flex-col justify-center'}`} 
            style={{ background: palette.gradient || palette.background }}
          >
            {/* Background Text Effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none text-[20vw] font-black uppercase whitespace-nowrap leading-none blur-sm" style={headingStyle}>
              {data.title ? data.title.split(' ')[0] : ''}
            </div>

            <div className={`relative z-20 w-full max-w-7xl mx-auto flex ${isSplit ? 'flex-row' : 'flex-col items-center text-center'}`}>
               <div className={`${isSplit ? 'w-1/2 pr-20' : 'w-full mb-12'}`}>
                  {/* Property Type & Status Badge */}
                  <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest font-bold opacity-60">
                      {data.propertyType} • {data.projectStatus.replace('_', ' ')}
                    </span>
                  </div>

                  <span className="block tracking-[0.5em] uppercase text-[10px] mb-8 opacity-40 font-bold" style={{ fontFamily: typography.label }}>
                    {data.branding?.developerName || 'Premium Living'} / {data.location}
                  </span>
                  
                  <h1 className={`${safeConfig.titleSize} font-bold leading-[0.85] mb-8 uppercase tracking-tighter`} style={headingStyle}>
                    {data.title}
                  </h1>

                  {/* Configuration Badges */}
                  {data.configuration && data.configuration.length > 0 && (
                    <div className="flex items-center gap-3 mb-8 flex-wrap">
                      {data.configuration.map((config, idx) => (
                        <span key={idx} className="px-4 py-2 border border-current/20 rounded text-sm font-medium">
                          {config}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className={`flex items-center gap-8 ${isSplit ? '' : 'justify-center'}`}>
                    <div className="w-16 h-[2px]" style={{ backgroundColor: palette.accent }} />
                    <div className="text-left">
                      <span className="block text-5xl font-light tracking-tighter italic">
                        {data.priceDetails?.startingPrice || 'Price Upon Request'}
                      </span>
                      {data.priceDetails?.priceRange && (
                        <span className="block text-sm opacity-60 mt-1">
                          Range: {data.priceDetails.priceRange.min} - {data.priceDetails.priceRange.max}
                        </span>
                      )}
                      {data.priceDetails?.isAllInclusive && (
                        <span className="inline-block mt-2 text-xs px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
                          All Inclusive
                        </span>
                      )}
                    </div>
                  </div>
               </div>
               
               <div className={`${isSplit ? 'w-1/2 aspect-[4/5]' : 'w-full max-w-4xl aspect-video'} relative overflow-hidden shadow-2xl group bg-slate-100`}>
                  {coverImage ? (
                    <img src={coverImage} alt="Hero" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 uppercase tracking-widest text-[10px]">
                      <Home className="w-16 h-16 opacity-20" />
                    </div>
                  )}
                  {isGlass && <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />}
               </div>
            </div>

            {/* RERA Number Badge (if available) */}
            {data.branding?.reraNumber && (
              <div className="absolute bottom-8 right-8 px-4 py-2 bg-white/10 backdrop-blur-sm rounded text-xs">
                RERA: {data.branding.reraNumber}
              </div>
            )}
          </header>
        );

      case 'specs_grid':
        return (
          <section key={`${type}-${index}`} style={styleObj} className="border-y border-current/5">
             <div className={`max-w-7xl mx-auto`}>
               <h3 className="text-3xl font-bold mb-12 text-center opacity-40 uppercase tracking-widest" style={headingStyle}>
                 Specifications
               </h3>
               
               <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div className={`${isAsymmetric ? 'mt-12' : ''} text-center group`}>
                    <Bed className="w-8 h-8 mx-auto mb-4 opacity-40" />
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">Bedrooms</span>
                    <span className="text-6xl font-extralight tracking-tighter">{data.specs?.beds || '-'}</span>
                  </div>
                  
                  <div className="text-center group">
                    <Bath className="w-8 h-8 mx-auto mb-4 opacity-40" />
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">Bathrooms</span>
                    <span className="text-6xl font-extralight tracking-tighter">{data.specs?.baths || '-'}</span>
                  </div>
                  
                  <div className={`${isAsymmetric ? 'mt-12' : ''} text-center group`}>
                    <Maximize className="w-8 h-8 mx-auto mb-4 opacity-40" />
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">
                      {data.areaDetails?.carpetArea ? 'Carpet Area' : 'Total Area'}
                    </span>
                    <span className="text-6xl font-extralight tracking-tighter">
                      {data.areaDetails?.carpetArea || data.specs?.sqft || '-'}
                    </span>
                  </div>
                  
                  <div className="text-center group">
                    <Calendar className="w-8 h-8 mx-auto mb-4 opacity-40" />
                    <span className="block text-[10px] uppercase tracking-[0.4em] mb-4 opacity-40">Year Built</span>
                    <span className="text-6xl font-extralight tracking-tighter">{data.specs?.yearBuilt || '-'}</span>
                  </div>
               </div>

               {/* Additional Area Details */}
               {(data.areaDetails?.builtUpArea || data.areaDetails?.superBuiltUpArea) && (
                 <div className="mt-12 pt-12 border-t border-current/5 flex justify-center gap-16">
                   {data.areaDetails.builtUpArea && (
                     <div className="text-center">
                       <span className="block text-xs opacity-40 mb-2">Built-up Area</span>
                       <span className="text-2xl font-light">{data.areaDetails.builtUpArea}</span>
                     </div>
                   )}
                   {data.areaDetails.superBuiltUpArea && (
                     <div className="text-center">
                       <span className="block text-xs opacity-40 mb-2">Super Built-up Area</span>
                       <span className="text-2xl font-light">{data.areaDetails.superBuiltUpArea}</span>
                     </div>
                   )}
                 </div>
               )}
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

                  {/* Target Buyers */}
                  {data.salesIntelligence?.targetBuyer && data.salesIntelligence.targetBuyer.length > 0 && (
                    <div className="pt-8">
                      <span className="text-xs uppercase tracking-widest opacity-40 mb-4 block">Ideal For</span>
                      <div className="flex flex-wrap gap-2">
                        {data.salesIntelligence.targetBuyer.map((buyer, idx) => (
                          <span key={idx} className="px-4 py-2 text-sm border border-current/20 rounded-full capitalize">
                            {buyer.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="md:w-1/2 w-full aspect-square overflow-hidden relative bg-slate-100">
                 {getImageByLabel('living_room', 1) ? (
                   <img 
                     src={getImageByLabel('living_room', 1)} 
                     alt="Interior" 
                     className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                   />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-300">
                     <Sparkles className="w-16 h-16 opacity-20" />
                   </div>
                 )}
                 {variant === 'overlap' && (
                   <div className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border-4 border-white z-10 hidden md:block" style={{ backgroundColor: palette.accent }} />
                 )}
              </div>
            </div>
          </section>
        );

      case 'gallery':
        const livingRoom = getImageByLabel('living_room', 0);
        const bedroom = getImageByLabel('bedroom', 1);
        const kitchen = getImageByLabel('kitchen', 2);
        const amenitiesImg = getImageByLabel('amenities', 3);

        return (
          <section key={`${type}-${index}`} className="py-20 px-8" style={{ backgroundColor: palette.background }}>
             <div className="max-w-7xl mx-auto">
               <h3 className="text-4xl font-bold mb-12 text-center opacity-40 uppercase tracking-widest" style={headingStyle}>
                 Visual Gallery
               </h3>
               
               <div className="grid grid-cols-12 gap-8 h-[700px]">
                  <div className="col-span-12 md:col-span-7 overflow-hidden relative group bg-slate-100">
                     {livingRoom ? (
                       <img src={livingRoom} alt="Living Space" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                     )}
                  </div>
                  
                  <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-8">
                    <div className="overflow-hidden relative bg-slate-100">
                      {bedroom ? (
                        <img src={bedroom} alt="Bedroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                      )}
                    </div>
                    <div className="overflow-hidden relative bg-slate-100">
                      {kitchen ? (
                        <img src={kitchen} alt="Kitchen" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">No Image</div>
                      )}
                    </div>
                  </div>
               </div>
             </div>
          </section>
        );

      case 'features':
        const hasProjectAmenities = data.amenities?.projectAmenities && data.amenities.projectAmenities.length > 0;
        const hasApartmentFeatures = data.amenities?.apartmentFeatures && data.amenities.apartmentFeatures.length > 0;
        const hasSecurityFeatures = data.amenities?.securityFeatures && data.amenities.securityFeatures.length > 0;
        const hasSustainability = data.amenities?.sustainability && data.amenities.sustainability.length > 0;

        return (
          <section key={`${type}-${index}`} style={styleObj}>
            <div className="max-w-7xl mx-auto">
              <h3 className="text-5xl font-bold mb-16 text-center uppercase tracking-tight" style={headingStyle}>
                Premium Features & Amenities
              </h3>

              <div className="grid md:grid-cols-2 gap-16">
                {/* Project Amenities */}
                {hasProjectAmenities && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Sparkles className="w-6 h-6" style={{ color: palette.accent }} />
                      <h4 className="text-2xl font-bold uppercase tracking-wide">Project Amenities</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.amenities.projectAmenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg">
                          <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: palette.accent }} />
                          <span className="opacity-80">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Apartment Features */}
                {hasApartmentFeatures && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Home className="w-6 h-6" style={{ color: palette.accent }} />
                      <h4 className="text-2xl font-bold uppercase tracking-wide">Apartment Features</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.amenities.apartmentFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg">
                          <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: palette.accent }} />
                          <span className="opacity-80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Security Features */}
                {hasSecurityFeatures && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Shield className="w-6 h-6" style={{ color: palette.accent }} />
                      <h4 className="text-2xl font-bold uppercase tracking-wide">Security & Safety</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.amenities.securityFeatures.map((security, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg">
                          <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: palette.accent }} />
                          <span className="opacity-80">{security}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Sustainability */}
                {hasSustainability && (
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <Leaf className="w-6 h-6" style={{ color: palette.accent }} />
                      <h4 className="text-2xl font-bold uppercase tracking-wide">Sustainability</h4>
                    </div>
                    <ul className="space-y-4">
                      {data.amenities.sustainability.map((sustain, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-lg">
                          <span className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: palette.accent }} />
                          <span className="opacity-80">{sustain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'map_spotlight':
        return (
          <section key={`${type}-${index}`} style={styleObj}>
            <div className="max-w-7xl mx-auto">
              <h3 className="text-5xl font-bold mb-16 text-center uppercase tracking-tight" style={headingStyle}>
                Prime Location
              </h3>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-8 h-8 flex-shrink-0" style={{ color: palette.accent }} />
                    <div>
                      <h4 className="text-2xl font-bold mb-2">{data.location}</h4>
                      {data.branding?.siteAddress && (
                        <p className="text-lg opacity-60">{data.branding.siteAddress}</p>
                      )}
                    </div>
                  </div>

                  {/* Location Advantages */}
                  {data.salesIntelligence?.locationAdvantages && (
                    <div className="space-y-6 mt-8">
                      {data.salesIntelligence.locationAdvantages.metroDistance && (
                        <div className="pl-12 border-l-2" style={{ borderColor: palette.accent }}>
                          <span className="block text-xs uppercase tracking-widest opacity-40 mb-2">Metro Access</span>
                          <span className="text-xl">{data.salesIntelligence.locationAdvantages.metroDistance}</span>
                        </div>
                      )}

                      {data.salesIntelligence.locationAdvantages.nearbyLandmarks && data.salesIntelligence.locationAdvantages.nearbyLandmarks.length > 0 && (
                        <div className="pl-12 border-l-2" style={{ borderColor: palette.accent }}>
                          <span className="block text-xs uppercase tracking-widest opacity-40 mb-2">Nearby Landmarks</span>
                          <ul className="space-y-2">
                            {data.salesIntelligence.locationAdvantages.nearbyLandmarks.slice(0, 5).map((landmark, idx) => (
                              <li key={idx} className="text-lg opacity-80">{landmark}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="aspect-square bg-slate-200 rounded overflow-hidden">
                  {getImageByLabel('location_map') ? (
                    <img src={getImageByLabel('location_map')} alt="Location Map" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-sm uppercase tracking-widest">Map Placeholder</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'cta':
        return (
          <section key={`${type}-${index}`} style={styleObj} className="relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-8xl font-black mb-8 leading-none tracking-tighter uppercase" style={headingStyle}>
                  Schedule Your Visit
                </h2>
                <p className="text-2xl opacity-60 max-w-2xl mx-auto">
                  Experience {data.title} in person. Our team is ready to show you around.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* Agent Info */}
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-current/10 flex-shrink-0">
                    {data.agent?.photoUrl ? (
                      <img src={data.agent.photoUrl} alt={data.agent.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-4xl font-bold opacity-30">{data.agent?.name?.charAt(0) || 'A'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-3xl font-bold mb-2">{data.agent?.name || 'Sales Team'}</h4>
                    <p className="text-lg opacity-60 mb-4">{data.agent?.title || 'Property Consultant'}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 opacity-40" />
                        <a href={`tel:${data.agent?.phone}`} className="text-lg hover:opacity-70 transition-opacity">
                          {data.agent?.phone || '+91 XXX-XXX-XXXX'}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 opacity-40" />
                        <a href={`mailto:${data.agent?.email}`} className="text-lg hover:opacity-70 transition-opacity">
                          {data.agent?.email || 'contact@property.com'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col gap-4">
                  {/* <button 
                    className="w-full py-6 px-8 text-xl font-bold uppercase tracking-wider border-4 border-current hover:bg-current hover:text-white transition-all duration-300"
                    style={{ borderColor: palette.accent, color: palette.accent }}
                  >
                    Book Site Visit
                  </button> */}
                  
                  {/* <button 
                    className="w-full py-6 px-8 text-xl font-bold uppercase tracking-wider border-2 border-current/20 hover:border-current/40 transition-all duration-300"
                  >
                    Download Brochure
                  </button> */}
                </div>
              </div>

              {/* Developer Info Footer */}
              <div className="mt-20 pt-12 border-t border-current/10 flex justify-between items-center">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-40 mb-2">Developed By</p>
                  <p className="text-2xl font-bold">{data.branding?.developerName || 'Premium Developers'}</p>
                </div>
                
                {data.branding?.reraNumber && (
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest opacity-40 mb-2">RERA Registration</p>
                    <p className="text-xl font-mono">{data.branding.reraNumber}</p>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              {data.branding?.includeDisclaimer && (
                <div className="mt-12 p-6 bg-current/5 rounded text-xs opacity-40 leading-relaxed">
                  *This brochure is for general information only. All specifications, layouts, and amenities are subject to change without notice. 
                  Images are for representational purposes. Please verify all details before making any purchase decision. 
                  {data.branding?.reraNumber && ` RERA Registration: ${data.branding.reraNumber}`}
                </div>
              )}
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
      
      {/* Footer */}
      <footer className="p-12 text-[9px] tracking-[0.5em] uppercase opacity-20 text-center flex flex-col gap-2">
        <span>DreamExProperties • Premium Real Estate Brochures</span>
        <span>{data.location || 'GLOBAL'} • {data.branding?.developerName || 'Exclusive Distribution'}</span>
      </footer>
    </div>
  );
};

export default BrochureRenderer;