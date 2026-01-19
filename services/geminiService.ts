
// import { GoogleGenAI, Type } from "@google/genai";
// import { PropertyData, BrochureStyle, BrochureTemplate } from "../types";

// export const generateBrochureLayout = async (
//   property: PropertyData,
//   style: BrochureStyle
// ): Promise<BrochureTemplate> => {
//   // Correctly initialized with the API key from environment variables.
//   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
//   const seed = Date.now();

//   const prompt = `
//     You are a world-class Avant-Garde Design Director. 
//     Mission: Architect a ONE-OF-A-KIND property brochure for "${property.title}".
    
//     Property DNA:
//     - Location: ${property.location}
//     - Price: ${property.price}
//     - Specs: ${property.specs.beds} Beds, ${property.specs.baths} Baths, ${property.specs.sqft} sqft
//     - Build: ${property.specs.yearBuilt}
//     - Style Context: ${style}
//     - Core Features: ${property.amenities.join(', ')}

//     ARCHITECTURAL RULES FOR THIS UNIQUE GENERATION (Seed: ${seed}):
//     1. AVOID FORMULAIC DESIGNS. Do not always put the hero first. 
//     2. UNIQUE PALETTE: Create a sophisticated color palette. Today's mood: ${seed % 2 === 0 ? 'Deep Obsidian and Copper' : 'Muted Sand and Sage'}.
//     3. NARRATIVE: Write a soul-stirring "Narrative Headline" and "Vision". Use a different "Voice" than usual (e.g., more poetic, or more minimalist-luxury).
//     4. SECTIONS: Provide at least 7 sections. Mix up types like 'hero', 'narrative', 'gallery', 'specs_grid', 'features', 'cta'. 
//     5. VARIANTS: Randomly assign 'overlap', 'asymmetric', 'glass', or 'split' to sections to break the boxy grid.
    
//     You MUST return a valid JSON object following the structure provided.
//   `;

//   try {
//     const response = await ai.models.generateContent({
//       model: 'gemini-3-flash-preview',
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: {
//           type: Type.OBJECT,
//           properties: {
//             palette: {
//               type: Type.OBJECT,
//               properties: {
//                 primary: { type: Type.STRING },
//                 secondary: { type: Type.STRING },
//                 accent: { type: Type.STRING },
//                 background: { type: Type.STRING },
//                 text: { type: Type.STRING },
//                 gradient: { type: Type.STRING },
//               },
//               required: ["primary", "secondary", "accent", "background", "text"]
//             },
//             typography: {
//               type: Type.OBJECT,
//               properties: {
//                 heading: { type: Type.STRING },
//                 body: { type: Type.STRING },
//                 label: { type: Type.STRING },
//               },
//               required: ["heading", "body", "label"]
//             },
//             narrativeCopy: {
//               type: Type.OBJECT,
//               properties: {
//                 headline: { type: Type.STRING },
//                 story: { type: Type.STRING },
//                 vision: { type: Type.STRING },
//               },
//               required: ["headline", "story", "vision"]
//             },
//             sections: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.OBJECT,
//                 properties: {
//                   type: { type: Type.STRING, description: "hero, narrative, gallery, features, cta, or specs_grid" },
//                   variant: { type: Type.STRING, description: "split, overlap, asymmetric, glass, or full" },
//                   config: {
//                     type: Type.OBJECT,
//                     properties: {
//                       backgroundColor: { type: Type.STRING },
//                       textColor: { type: Type.STRING },
//                       padding: { type: Type.STRING },
//                       order: { type: Type.NUMBER },
//                       titleSize: { type: Type.STRING },
//                     },
//                     required: ["order"]
//                   }
//                 },
//                 required: ["type", "variant", "config"]
//               }
//             }
//           },
//           required: ["palette", "typography", "narrativeCopy", "sections"]
//         },
//         temperature: 1.0,
//       }
//     });

//     let text = response.text;
//     // Strip markdown formatting if present
//     text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
//     return JSON.parse(text);
//   } catch (error) {
//     console.error("Gemini Service Error:", error);
//     throw error;
//   }
// };
import { GoogleGenAI, Type } from "@google/genai";
import { PropertyData, BrochureStyle, BrochureTemplate } from "../components/types";

/**
 * Enhanced Gemini Service for Property Brochure Generation
 * Now uses comprehensive property data for context-aware design
 */
export const generateBrochureLayout = async (
  property: PropertyData,
  style: BrochureStyle
): Promise<BrochureTemplate> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const seed = Date.now();

  // ============================================================================
  // EXTRACT RICH CONTEXT FROM NEW PROPERTY DATA
  // ============================================================================

  // Property Type & Status Context
  const propertyTypeContext = property.propertyType || 'apartment';
  const projectStatusContext = property.projectStatus || 'ready_to_move';
  const configurations = property.configuration?.join(', ') || 'Not specified';

  // Price Context - Extract starting price or range
  const priceContext = property.priceDetails?.startingPrice 
    ? `Starting from ${property.priceDetails.startingPrice}${property.priceDetails.priceRange ? ` (Range: ${property.priceDetails.priceRange.min} - ${property.priceDetails.priceRange.max})` : ''}`
    : 'Price on request';
  
  const priceInclusive = property.priceDetails?.isAllInclusive ? 'All-inclusive pricing' : 'Basic price (taxes extra)';

  // Area Context - Use new detailed area breakdown
  const areaContext = property.areaDetails?.carpetArea 
    ? `Carpet: ${property.areaDetails.carpetArea}${property.areaDetails.builtUpArea ? `, Built-up: ${property.areaDetails.builtUpArea}` : ''}${property.areaDetails.superBuiltUpArea ? `, Super Built-up: ${property.areaDetails.superBuiltUpArea}` : ''}`
    : `${property.specs?.sqft || 'Area not specified'}`;

  // Amenities Context - Use grouped amenities
  const projectAmenities = property.amenities?.projectAmenities?.join(', ') || 'Standard amenities';
  const apartmentFeatures = property.amenities?.apartmentFeatures?.join(', ') || 'Quality finishes';
  const securityFeatures = property.amenities?.securityFeatures?.join(', ') || 'Basic security';
  const sustainabilityFeatures = property.amenities?.sustainability?.join(', ') || 'Eco-friendly features';

  // Sales Intelligence - Use structured insights
  const targetBuyers = property.salesIntelligence?.targetBuyer?.join(', ') || 'General buyers';
  const sellingPoint1 = property.salesIntelligence?.keySellingPoints?.[0] || 'Prime location';
  const sellingPoint2 = property.salesIntelligence?.keySellingPoints?.[1] || 'Modern design';
  const sellingPoint3 = property.salesIntelligence?.keySellingPoints?.[2] || 'Great amenities';

  // Location Advantages
  const nearbyLandmarks = property.salesIntelligence?.locationAdvantages?.nearbyLandmarks?.join(', ') || 'Well-connected area';
  const metroDistance = property.salesIntelligence?.locationAdvantages?.metroDistance || '';
  const connectivity = property.salesIntelligence?.locationAdvantages?.connectivity || '';

  // Branding Context
  const developerName = property.branding?.developerName || 'Premium Developer';
  const reraNumber = property.branding?.reraNumber || '';

  // Usage Intent - Adjust design based on how it will be used
  const usageIntent = property.usageIntent || 'email';
  const usageOptimization = getUsageOptimization(usageIntent);

  // Image Context - Know what types of images are available
  const availableImageTypes = property.images?.map(img => img.label).join(', ') || 'General property images';
  const coverImageLabel = property.images?.find(img => img.isCover)?.label || 'elevation';

  // ============================================================================
  // ENHANCED PROMPT WITH RICH CONTEXT
  // ============================================================================

  const prompt = `
    You are an elite real estate brochure designer with deep expertise in Indian property marketing.
    
    === MISSION ===
    Create a UNIQUE, CONTEXT-AWARE brochure design for "${property.title}" that converts ${targetBuyers} into buyers.
    
    === PROPERTY PROFILE ===
    🏠 Type: ${propertyTypeContext.toUpperCase()} (${projectStatusContext})
    📍 Location: ${property.location}
    💰 Pricing: ${priceContext} (${priceInclusive})
    🏗️ Configurations: ${configurations}
    📐 Area: ${areaContext}
    👷 Developer: ${developerName}${reraNumber ? ` (RERA: ${reraNumber})` : ''}
    
    === TARGET AUDIENCE ===
    Primary Buyers: ${targetBuyers}
    This influences tone, visual weight, and messaging style.
    
    === KEY SELLING PROPOSITIONS ===
    1. ${sellingPoint1}
    2. ${sellingPoint2}
    3. ${sellingPoint3}
    
    === LOCATION ADVANTAGES ===
    Nearby: ${nearbyLandmarks}
    ${metroDistance ? `Metro Access: ${metroDistance}` : ''}
    ${connectivity ? `Connectivity: ${connectivity}` : ''}
    
    === AMENITIES BREAKDOWN ===
    🏊 Project Amenities: ${projectAmenities}
    🏡 Apartment Features: ${apartmentFeatures}
    🔒 Security: ${securityFeatures}
    🌱 Sustainability: ${sustainabilityFeatures}
    
    === AVAILABLE VISUAL ASSETS ===
    Cover Image Type: ${coverImageLabel}
    Other Images: ${availableImageTypes}
    
    === USAGE OPTIMIZATION ===
    Distribution Channel: ${usageIntent.toUpperCase()}
    ${usageOptimization}
    
    === DESIGN PHILOSOPHY ===
    Style Preference: ${style}
    Creative Seed: ${seed}
    
    === DESIGN DIRECTIVES ===
    
    CONTEXT-BASED CUSTOMIZATION:
    ${getPropertyTypeDirective(propertyTypeContext)}
    ${getProjectStatusDirective(projectStatusContext)}
    ${getTargetBuyerDirective(targetBuyers)}
    
    VISUAL STRATEGY:
    1. COLOR PALETTE: Create a sophisticated palette that reflects ${propertyTypeContext} elegance and appeals to ${targetBuyers}.
       ${getPaletteGuidance(propertyTypeContext, style, seed)}
    
    2. TYPOGRAPHY: Choose fonts that communicate ${style} while remaining readable for ${usageIntent}.
       ${getTypographyGuidance(style, usageIntent)}
    
    3. NARRATIVE VOICE: Write compelling copy that speaks directly to ${targetBuyers}.
       - Headline: Should emphasize "${sellingPoint1}"
       - Story: Weave in location advantages (${nearbyLandmarks})
       - Vision: Paint an aspirational picture of living here
    
    4. SECTION COMPOSITION: Create ${getSectionCount(usageIntent)} sections that tell a complete story.
       Required sections based on available data:
       - Hero section (use ${coverImageLabel} imagery)
       - Specs grid (showcase ${configurations})
       ${projectAmenities !== 'Standard amenities' ? '- Amenities showcase (highlight project amenities)' : ''}
       ${apartmentFeatures !== 'Quality finishes' ? '- Apartment features section' : ''}
       ${nearbyLandmarks !== 'Well-connected area' ? '- Location spotlight section' : ''}
       - Call-to-action section
       ${property.advancedOptions?.includeFloorPlan ? '- Floor plan section' : ''}
       ${property.advancedOptions?.includeLocationMap ? '- Location map section' : ''}
    
    5. LAYOUT VARIANTS: Use strategic variants to create visual interest.
       - NOT all sections should be 'full' width
       - Mix 'split', 'asymmetric', 'overlap' variants
       - Consider ${usageIntent === 'whatsapp' ? 'mobile-first layouts' : 'balanced desktop + mobile'}
    
    === ANTI-PATTERNS (AVOID THESE) ===
    ❌ Don't use generic "luxury" language if targeting investors
    ❌ Don't create cramped layouts for ${usageIntent} distribution
    ❌ Don't ignore the ${projectStatusContext} status in messaging
    ❌ Don't use dark themes for family-oriented properties
    ❌ Don't place specs immediately after hero (build intrigue first)
    
    === OUTPUT REQUIREMENTS ===
    Return a JSON object with:
    - palette: Colors that match ${propertyTypeContext} + ${style} aesthetic
    - typography: Font choices optimized for ${usageIntent}
    - narrativeCopy: Compelling headlines/story/vision targeting ${targetBuyers}
    - sections: ${getSectionCount(usageIntent)} strategically ordered sections
    
    Make this brochure ARCHITECTURALLY DISTINCT and CONVERSION-FOCUSED.
  `;

  // ============================================================================
  // API CALL WITH ENHANCED CONFIGURATION
  // ============================================================================

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            palette: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                accent: { type: Type.STRING },
                background: { type: Type.STRING },
                text: { type: Type.STRING },
                gradient: { type: Type.STRING },
              },
              required: ["primary", "secondary", "accent", "background", "text"]
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                heading: { type: Type.STRING },
                body: { type: Type.STRING },
                label: { type: Type.STRING },
              },
              required: ["heading", "body", "label"]
            },
            narrativeCopy: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING },
                story: { type: Type.STRING },
                vision: { type: Type.STRING },
              },
              required: ["headline", "story", "vision"]
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { 
                    type: Type.STRING, 
                    description: "hero, narrative, gallery, features, map_spotlight, cta, or specs_grid" 
                  },
                  variant: { 
                    type: Type.STRING, 
                    description: "split, overlap, asymmetric, glass, or full" 
                  },
                  config: {
                    type: Type.OBJECT,
                    properties: {
                      backgroundColor: { type: Type.STRING },
                      textColor: { type: Type.STRING },
                      padding: { type: Type.STRING },
                      order: { type: Type.NUMBER },
                      titleSize: { type: Type.STRING },
                    },
                    required: ["order"]
                  }
                },
                required: ["type", "variant", "config"]
              }
            }
          },
          required: ["palette", "typography", "narrativeCopy", "sections"]
        },
        temperature: 1.2, // Increased for more creative variation
      }
    });

    let text = response.text;
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};

// ============================================================================
// CONTEXT-AWARE HELPER FUNCTIONS
// ============================================================================

/**
 * Get usage-specific optimization guidance
 */
function getUsageOptimization(intent: string): string {
  const optimizations: Record<string, string> = {
    whatsapp: `
      - Optimize for mobile viewing (vertical layouts preferred)
      - Use larger fonts (minimum 14px for body)
      - Ensure images load fast (compressed but clear)
      - Keep total page count under 4 pages
      - Use bright, thumb-stopping colors`,
    
    email: `
      - Design for inbox preview (strong hero section)
      - Balance text and visuals
      - Include clear CTAs
      - Optimize for desktop + mobile
      - Professional, trustworthy aesthetic`,
    
    print: `
      - High-resolution ready (300 DPI mindset)
      - Use print-friendly colors (avoid pure black #000)
      - Ensure text is readable at A4 size
      - Include bleed-safe margins
      - Rich, textured color palettes`,
    
    presentation: `
      - Bold, presentation-worthy visuals
      - Large, readable text from distance
      - High contrast for projector visibility
      - Minimal text per section
      - Impactful imagery`,
    
    website: `
      - Web-optimized color palette
      - Responsive layout considerations
      - Fast-loading optimized images
      - Accessibility-friendly contrast ratios
      - Interactive-ready design`
  };

  return optimizations[intent] || optimizations.email;
}

/**
 * Get property type-specific design directive
 */
function getPropertyTypeDirective(type: string): string {
  const directives: Record<string, string> = {
    apartment: '🏢 Apartment Design: Emphasize community living, amenities, and urban convenience. Use modern, clean aesthetics.',
    villa: '🏡 Villa Design: Focus on exclusivity, space, and luxury. Use expansive imagery and premium color palettes.',
    rowhouse: '🏘️ Rowhouse Design: Highlight privacy + community balance. Use warm, family-oriented visuals.',
    plot: '🌳 Plot Design: Emphasize location, investment potential, and future vision. Use open, aspirational imagery.',
    commercial: '🏢 Commercial Design: Professional, ROI-focused. Use bold, business-appropriate aesthetics.'
  };

  return directives[type] || directives.apartment;
}

/**
 * Get project status-specific messaging directive
 */
function getProjectStatusDirective(status: string): string {
  const directives: Record<string, string> = {
    under_construction: '🏗️ Under Construction: Emphasize pre-launch benefits, payment plans, appreciation potential. Show progress/renders.',
    ready_to_move: '✅ Ready to Move: Highlight immediate possession, actual photos, move-in ready state. Build urgency.',
    new_launch: '🆕 New Launch: Create excitement, early-bird benefits, exclusive first-mover advantages.',
    resale: '♻️ Resale: Focus on established neighborhood, proven track record, immediate availability.'
  };

  return directives[status] || directives.ready_to_move;
}

/**
 * Get target buyer-specific tone directive
 */
function getTargetBuyerDirective(buyers: string): string {
  if (buyers.includes('luxury_buyers') || buyers.includes('nri_buyers')) {
    return '💎 Luxury/NRI Tone: Ultra-premium language, international standards, exclusive positioning. Minimal text, maximum impact.';
  } else if (buyers.includes('investors')) {
    return '📈 Investor Tone: ROI-focused, data-driven, appreciation potential, rental yields. Use numbers and facts.';
  } else if (buyers.includes('families')) {
    return '👨‍👩‍👧‍👦 Family Tone: Safety, education, community, lifestyle. Warm, trustworthy, aspirational messaging.';
  } else if (buyers.includes('working_professionals')) {
    return '💼 Professional Tone: Convenience, connectivity, modern amenities, work-life balance. Efficient, smart design.';
  }
  return '🎯 Balanced Tone: Appeal to broad audience with versatile, professional approach.';
}

/**
 * Get palette guidance based on property type and style
 */
function getPaletteGuidance(propertyType: string, style: string, seed: number): string {
  const moods = [
    'Deep charcoal with warm gold accents',
    'Soft ivory with sage green touches',
    'Rich navy with copper highlights',
    'Muted sand with terracotta accents',
    'Elegant black with champagne details',
    'Cool gray with vibrant teal pops',
    'Warm beige with burgundy accents',
    'Modern slate with rose gold touches'
  ];

  const selectedMood = moods[seed % moods.length];

  if (propertyType === 'villa' || propertyType === 'plot') {
    return `Suggested mood: ${selectedMood}. Use luxurious, nature-inspired tones.`;
  } else if (propertyType === 'commercial') {
    return `Suggested mood: Professional blues, grays, with confidence-inspiring accents.`;
  } else {
    return `Suggested mood: ${selectedMood}. Reflect ${style} style principles.`;
  }
}

/**
 * Get typography guidance based on style and usage
 */
function getTypographyGuidance(style: string, usage: string): string {
  if (usage === 'whatsapp' || usage === 'presentation') {
    return 'Use bold, highly legible sans-serifs. Prioritize readability over elegance.';
  }
  
  if (style === 'luxury') {
    return 'Elegant serifs for headings (Playfair, Crimson), refined sans-serifs for body (Inter, Outfit).';
  } else if (style === 'minimalist') {
    return 'Clean geometric sans-serifs throughout (Helvetica, Inter, Satoshi). Consistent weight hierarchy.';
  } else if (style === 'editorial') {
    return 'Editorial serif for headings (Georgia, Spectral), readable sans-serif for body (Source Sans).';
  }
  
  return 'Balanced pairing: Serif headings + Sans-serif body for timeless appeal.';
}

/**
 * Get recommended section count based on usage
 */
function getSectionCount(usage: string): string {
  const counts: Record<string, string> = {
    whatsapp: '5-6',
    email: '6-8',
    print: '8-10',
    presentation: '5-7',
    website: '7-9'
  };

  return counts[usage] || '7-8';
}