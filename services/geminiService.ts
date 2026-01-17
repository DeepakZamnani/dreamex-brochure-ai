
import { GoogleGenAI, Type } from "@google/genai";
import { PropertyData, BrochureStyle, BrochureTemplate } from "../types";

export const generateBrochureLayout = async (
  property: PropertyData,
  style: BrochureStyle
): Promise<BrochureTemplate> => {
  // Correctly initialized with the API key from environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const seed = Date.now();

  const prompt = `
    You are a world-class Avant-Garde Design Director. 
    Mission: Architect a ONE-OF-A-KIND property brochure for "${property.title}".
    
    Property DNA:
    - Location: ${property.location}
    - Price: ${property.price}
    - Specs: ${property.specs.beds} Beds, ${property.specs.baths} Baths, ${property.specs.sqft} sqft
    - Build: ${property.specs.yearBuilt}
    - Style Context: ${style}
    - Core Features: ${property.amenities.join(', ')}

    ARCHITECTURAL RULES FOR THIS UNIQUE GENERATION (Seed: ${seed}):
    1. AVOID FORMULAIC DESIGNS. Do not always put the hero first. 
    2. UNIQUE PALETTE: Create a sophisticated color palette. Today's mood: ${seed % 2 === 0 ? 'Deep Obsidian and Copper' : 'Muted Sand and Sage'}.
    3. NARRATIVE: Write a soul-stirring "Narrative Headline" and "Vision". Use a different "Voice" than usual (e.g., more poetic, or more minimalist-luxury).
    4. SECTIONS: Provide at least 7 sections. Mix up types like 'hero', 'narrative', 'gallery', 'specs_grid', 'features', 'cta'. 
    5. VARIANTS: Randomly assign 'overlap', 'asymmetric', 'glass', or 'split' to sections to break the boxy grid.
    
    You MUST return a valid JSON object following the structure provided.
  `;

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
                  type: { type: Type.STRING, description: "hero, narrative, gallery, features, cta, or specs_grid" },
                  variant: { type: Type.STRING, description: "split, overlap, asymmetric, glass, or full" },
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
        temperature: 1.0,
      }
    });

    let text = response.text;
    // Strip markdown formatting if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};
// import { GoogleGenAI, Type } from "@google/genai";
// import { PropertyData, BrochureStyle, BrochureTemplate, PropertyContext } from "../components/types";

// // ============================================================================
// // CONTEXT ANALYSIS - Analyzes property to inform design decisions
// // ============================================================================

// const analyzePropertyContext = (property: PropertyData): PropertyContext => {
//   // Price analysis
//   const priceNum = parseFloat(property.price.replace(/[^0-9.]/g, ''));
//   let pricePoint: PropertyContext['pricePoint'] = 'standard';
//   if (priceNum > 10000000) pricePoint = 'ultra_luxury';
//   else if (priceNum > 5000000) pricePoint = 'luxury';
//   else if (priceNum > 1000000) pricePoint = 'premium';

//   // Age analysis
//   const year = parseInt(property.specs.yearBuilt || '2020');
//   let propertyAge: PropertyContext['propertyAge'] = 'modern';
//   if (year < 1930) propertyAge = 'historic';
//   else if (year < 1980) propertyAge = 'classic';
//   else if (year < 2000) propertyAge = 'contemporary';
//   else if (year >= 2020) propertyAge = 'ultra_modern';

//   // Space analysis
//   const sqft = parseFloat((property.specs.sqft || '0').replace(/,/g, ''));
//   let spaceScale: PropertyContext['spaceScale'] = 'comfortable';
//   if (sqft > 10000) spaceScale = 'estate';
//   else if (sqft > 5000) spaceScale = 'expansive';
//   else if (sqft > 3000) spaceScale = 'spacious';
//   else if (sqft < 1500) spaceScale = 'compact';

//   // Location vibe (simplified heuristic)
//   const location = property.location.toLowerCase();
//   let locationVibe: PropertyContext['locationVibe'] = 'suburban';
//   if (location.includes('beach') || location.includes('coast') || location.includes('ocean')) locationVibe = 'coastal';
//   else if (location.includes('mountain') || location.includes('hill')) locationVibe = 'mountain';
//   else if (location.includes('downtown') || location.includes('city')) locationVibe = 'urban';
//   else if (location.includes('ranch') || location.includes('farm')) locationVibe = 'rural';

//   return { pricePoint, propertyAge, spaceScale, locationVibe };
// };

// // ============================================================================
// // DESIGN DIRECTIVES - Context-aware prompting
// // ============================================================================

// const getDesignDirective = (context: PropertyContext, style: BrochureStyle): string => {
//   let directive = "";

//   // Price-based directives
//   if (context.pricePoint === 'ultra_luxury') {
//     directive += "ULTRA-LUXURY MANDATE: Use extreme minimalism, abundant white space, rare materials aesthetic. Typography: Ultra-thin serifs or modern geometric. Palette: Monochromatic with ONE accent. ";
//   } else if (context.pricePoint === 'luxury') {
//     directive += "LUXURY APPROACH: Sophisticated balance, refined typography, elegant color harmonies. Use premium feel without being sparse. ";
//   } else {
//     directive += "APPROACHABLE PREMIUM: Modern and aspirational, accessible luxury feel. Balanced layouts, inviting colors. ";
//   }

//   // Age-based directives
//   if (context.propertyAge === 'historic') {
//     directive += "HERITAGE CONTEXT: Classical typography, vintage-inspired palettes, traditional proportions. Respect architectural legacy. ";
//   } else if (context.propertyAge === 'ultra_modern') {
//     directive += "CONTEMPORARY EDGE: Bold geometric layouts, modern sans-serifs, experimental asymmetry. Embrace innovation. ";
//   }

//   // Space-based directives
//   if (context.spaceScale === 'estate') {
//     directive += "EXPANSIVE SCALE: Grand layouts, dramatic hero sections, multiple galleries to showcase scope. ";
//   } else if (context.spaceScale === 'compact') {
//     directive += "EFFICIENT LUXURY: Tight, focused layouts. Emphasize quality over quantity. Smart use of space. ";
//   }

//   // Location-based directives
//   if (context.locationVibe === 'coastal') {
//     directive += "COASTAL ESSENCE: Light, airy palettes (blues, whites, sand tones). Organic flow, relaxed rhythm. ";
//   } else if (context.locationVibe === 'urban') {
//     directive += "URBAN SOPHISTICATION: Bold contrasts, architectural lines, metropolitan energy. ";
//   }

//   return directive;
// };

// // ============================================================================
// // SECTION TYPE POOL - Available section types with descriptions
// // ============================================================================

// const SECTION_TYPE_POOL = {
//   hero: ['hero_fullscreen', 'hero_split', 'hero_minimal', 'hero_magazine', 'hero_cinematic', 'hero_asymmetric', 'hero_floating', 'hero_diagonal'],
//   narrative: ['narrative_standard', 'narrative_timeline', 'narrative_quote', 'narrative_split', 'narrative_minimal', 'narrative_editorial'],
//   gallery: ['gallery_masonry', 'gallery_grid', 'gallery_asymmetric', 'gallery_fullbleed', 'gallery_scattered', 'gallery_triptych', 'gallery_panoramic'],
//   specs: ['specs_grid', 'specs_cards', 'specs_horizontal', 'specs_minimal'],
//   features: ['features_grid', 'features_list', 'features_cards', 'features_minimal', 'features_icons'],
//   special: ['location_map', 'timeline_story', 'testimonial', 'stats_showcase', 'quote_block', 'cta_contact']
// };

// // ============================================================================
// // MAIN GENERATION FUNCTION
// // ============================================================================

// export const generateBrochureLayout = async (
//   property: PropertyData,
//   style: BrochureStyle
// ): Promise<BrochureTemplate> => {
//   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
//   // Analyze property context
//   const context = analyzePropertyContext(property);
//   const designDirective = getDesignDirective(context, style);
  
//   // Unique seed for this generation
//   const seed = Date.now();
//   const randomPhilosophy = seed % 10;

//   const prompt = `
//     You are an AVANT-GARDE LAYOUT ARCHITECT with a PhD in Design Systems.
    
//     === PROPERTY INTEL ===
//     Title: ${property.title}
//     Location: ${property.location}
//     Price: ${property.price}
//     Specs: ${property.specs.beds} Beds | ${property.specs.baths} Baths | ${property.specs.sqft} sqft | Built ${property.specs.yearBuilt}
//     Features: ${property.amenities.slice(0, 3).join(', ')}
    
//     === CONTEXT ANALYSIS ===
//     Price Point: ${context.pricePoint.toUpperCase()}
//     Property Age: ${context.propertyAge}
//     Space Scale: ${context.spaceScale}
//     Location: ${context.locationVibe}
//     User Style Preference: ${style}
    
//     === DESIGN DIRECTIVE ===
//     ${designDirective}
    
//     === YOUR MISSION (Seed: ${seed}) ===
//     Design a COMPLETELY UNIQUE brochure layout. This must be ARCHITECTURALLY DISTINCT from any previous generation.
    
//     **LAYOUT DNA RULES:**
//     1. Choose a layout philosophy from: ${randomPhilosophy % 2 === 0 ? 'brutalist_luxury, asymmetric_tension, or avant_garde' : 'soft_minimalism, balanced_harmony, or swiss_modernism'}
//     2. Select between 7-12 sections (NEVER the same count twice)
//     3. Pick a flow pattern: ${seed % 3 === 0 ? 'z_path' : seed % 3 === 1 ? 'spiral' : 'diagonal'}
//     4. Density: ${context.pricePoint === 'ultra_luxury' ? 'sparse' : 'balanced'}
    
//     **SECTION SELECTION STRATEGY:**
//     - REQUIRED: 1 hero variant, 1 narrative variant, 1 CTA
//     - CHOOSE 4-9 MORE from: galleries, specs, features, special sections
//     - AVAILABLE TYPES:
//       * Heroes: hero_fullscreen, hero_split, hero_minimal, hero_magazine, hero_cinematic, hero_asymmetric, hero_floating, hero_diagonal
//       * Narratives: narrative_standard, narrative_timeline, narrative_quote, narrative_split, narrative_minimal, narrative_editorial
//       * Galleries: gallery_masonry, gallery_grid, gallery_asymmetric, gallery_fullbleed, gallery_scattered, gallery_triptych, gallery_panoramic
//       * Specs: specs_grid, specs_cards, specs_horizontal, specs_minimal
//       * Features: features_grid, features_list, features_cards, features_minimal, features_icons
//       * Special: location_map, timeline_story, testimonial, stats_showcase, quote_block, cta_contact
    
//     **UNIQUENESS MANDATES:**
//     - DO NOT use predictable hero-specs-gallery-features-cta order
//     - MIX section types unexpectedly (e.g., hero → quote_block → gallery → stats → narrative)
//     - VARY section variants (split, overlap, asymmetric, glass, compact, expanded)
//     - Use ${seed % 2 === 0 ? 'ODD' : 'EVEN'} section counts to break patterns
    
//     **COLOR STRATEGY:**
//     Today's mood: ${seed % 4 === 0 ? 'Deep Charcoal & Gold' : seed % 4 === 1 ? 'Ivory & Forest Green' : seed % 4 === 2 ? 'Navy & Copper' : 'Slate & Burgundy'}
//     Create a sophisticated palette that matches the property context.
    
//     **NARRATIVE VOICE:**
//     Write in a ${seed % 3 === 0 ? 'poetic, flowing style' : seed % 3 === 1 ? 'crisp, architectural language' : 'editorial, magazine-quality prose'}.
    
//     Return ONLY valid JSON matching the schema.
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
//             // Layout DNA
//             layoutDNA: {
//               type: Type.OBJECT,
//               properties: {
//                 philosophy: { 
//                   type: Type.STRING,
//                   description: "Layout philosophy: brutalist_luxury, soft_minimalism, magazine_editorial, art_deco_revival, swiss_modernism, asymmetric_tension, balanced_harmony, organic_flow, geometric_precision, avant_garde"
//                 },
//                 gridSystem: { 
//                   type: Type.STRING,
//                   description: "Grid system: standard_12, custom_16, golden_ratio, fibonacci, fluid_adaptive"
//                 },
//                 flowPattern: { 
//                   type: Type.STRING,
//                   description: "Flow pattern: linear, z_path, spiral, diagonal, scattered, modular"
//                 },
//                 sectionCount: { type: Type.NUMBER },
//                 density: { type: Type.STRING },
//                 rhythm: { type: Type.STRING },
//                 visualWeight: { type: Type.STRING }
//               },
//               required: ["philosophy", "gridSystem", "flowPattern", "sectionCount", "density", "rhythm", "visualWeight"]
//             },
            
//             // Property Context
//             propertyContext: {
//               type: Type.OBJECT,
//               properties: {
//                 pricePoint: { type: Type.STRING },
//                 propertyAge: { type: Type.STRING },
//                 spaceScale: { type: Type.STRING },
//                 locationVibe: { type: Type.STRING }
//               },
//               required: ["pricePoint", "propertyAge", "spaceScale", "locationVibe"]
//             },
            
//             // Design System
//             palette: {
//               type: Type.OBJECT,
//               properties: {
//                 primary: { type: Type.STRING },
//                 secondary: { type: Type.STRING },
//                 accent: { type: Type.STRING },
//                 background: { type: Type.STRING },
//                 text: { type: Type.STRING },
//                 gradient: { type: Type.STRING },
//                 surface: { type: Type.STRING }
//               },
//               required: ["primary", "secondary", "accent", "background", "text"]
//             },
            
//             typography: {
//               type: Type.OBJECT,
//               properties: {
//                 heading: { type: Type.STRING },
//                 subheading: { type: Type.STRING },
//                 body: { type: Type.STRING },
//                 label: { type: Type.STRING },
//                 accent: { type: Type.STRING }
//               },
//               required: ["heading", "body", "label"]
//             },
            
//             // Narrative
//             narrativeCopy: {
//               type: Type.OBJECT,
//               properties: {
//                 headline: { type: Type.STRING },
//                 story: { type: Type.STRING },
//                 vision: { type: Type.STRING },
//                 tagline: { type: Type.STRING }
//               },
//               required: ["headline", "story", "vision"]
//             },
            
//             // Dynamic Sections
//             sections: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.OBJECT,
//                 properties: {
//                   type: { 
//                     type: Type.STRING,
//                     description: "Section type from available pool"
//                   },
//                   variant: { 
//                     type: Type.STRING,
//                     description: "default, split, overlap, asymmetric, glass, full, compact, expanded"
//                   },
//                   config: {
//                     type: Type.OBJECT,
//                     properties: {
//                       backgroundColor: { type: Type.STRING },
//                       textColor: { type: Type.STRING },
//                       padding: { type: Type.STRING },
//                       order: { type: Type.NUMBER },
//                       titleSize: { type: Type.STRING },
//                       spacing: { type: Type.STRING },
//                       alignment: { type: Type.STRING },
//                       imageCount: { type: Type.NUMBER },
//                       layout: { type: Type.STRING }
//                     },
//                     required: ["order"]
//                   }
//                 },
//                 required: ["type", "variant", "config"]
//               }
//             },
            
//             // Optional Animations
//             animations: {
//               type: Type.OBJECT,
//               properties: {
//                 heroEntry: { type: Type.STRING },
//                 scrollEffect: { type: Type.STRING },
//                 imageHover: { type: Type.STRING },
//                 sectionTransition: { type: Type.STRING }
//               }
//             }
//           },
//           required: ["layoutDNA", "propertyContext", "palette", "typography", "narrativeCopy", "sections"]
//         },
//         temperature: 1.2,  // Increased for more variation
//       }
//     });

//     let text = response.text;
//     text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
//     return JSON.parse(text);
//   } catch (error) {
//     console.error("Gemini Layout Generation Error:", error);
//     throw error;
//   }
// };
// import { GoogleGenAI, Type } from "@google/genai";
// import { PropertyData, BrochureStyle, BrochureTemplate, PropertyContext } from "../components/types";

// // ============================================================================
// // LAYOUT FINGERPRINT STORAGE - Prevents exact duplicates
// // ============================================================================

// interface LayoutFingerprint {
//   sectionTypes: string;
//   sectionCount: number;
//   philosophy: string;
//   flowPattern: string;
//   timestamp: number;
// }

// // In-memory store (use localStorage/database in production)
// const LAYOUT_HISTORY: LayoutFingerprint[] = [];
// const MAX_HISTORY = 100; // Keep last 100 generations

// const generateFingerprint = (sections: any[], philosophy: string, flowPattern: string): string => {
//   const sectionString = sections.map(s => s.type).sort().join(',');
//   return `${sectionString}|${sections.length}|${philosophy}|${flowPattern}`;
// };

// const isDuplicate = (fingerprint: string): boolean => {
//   return LAYOUT_HISTORY.some(h => 
//     `${h.sectionTypes}|${h.sectionCount}|${h.philosophy}|${h.flowPattern}` === fingerprint
//   );
// };

// const saveFingerprint = (sections: any[], philosophy: string, flowPattern: string) => {
//   const fingerprint: LayoutFingerprint = {
//     sectionTypes: sections.map(s => s.type).sort().join(','),
//     sectionCount: sections.length,
//     philosophy,
//     flowPattern,
//     timestamp: Date.now()
//   };
  
//   LAYOUT_HISTORY.push(fingerprint);
  
//   // Keep only recent history
//   if (LAYOUT_HISTORY.length > MAX_HISTORY) {
//     LAYOUT_HISTORY.shift();
//   }
// };

// // ============================================================================
// // TRUE RANDOMNESS GENERATORS
// // ============================================================================

// const getRandomInt = (min: number, max: number): number => {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// const getRandomElement = <T,>(array: T[]): T => {
//   return array[Math.floor(Math.random() * array.length)];
// };

// const shuffleArray = <T,>(array: T[]): T[] => {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// };

// // ============================================================================
// // CONTEXT ANALYSIS
// // ============================================================================

// const analyzePropertyContext = (property: PropertyData): PropertyContext => {
//   const priceNum = parseFloat(property.price.replace(/[^0-9.]/g, ''));
//   let pricePoint: PropertyContext['pricePoint'] = 'standard';
//   if (priceNum > 10000000) pricePoint = 'ultra_luxury';
//   else if (priceNum > 5000000) pricePoint = 'luxury';
//   else if (priceNum > 1000000) pricePoint = 'premium';

//   const year = parseInt(property.specs.yearBuilt || '2020');
//   let propertyAge: PropertyContext['propertyAge'] = 'modern';
//   if (year < 1930) propertyAge = 'historic';
//   else if (year < 1980) propertyAge = 'classic';
//   else if (year < 2000) propertyAge = 'contemporary';
//   else if (year >= 2020) propertyAge = 'ultra_modern';

//   const sqft = parseFloat((property.specs.sqft || '0').replace(/,/g, ''));
//   let spaceScale: PropertyContext['spaceScale'] = 'comfortable';
//   if (sqft > 10000) spaceScale = 'estate';
//   else if (sqft > 5000) spaceScale = 'expansive';
//   else if (sqft > 3000) spaceScale = 'spacious';
//   else if (sqft < 1500) spaceScale = 'compact';

//   const location = property.location.toLowerCase();
//   let locationVibe: PropertyContext['locationVibe'] = 'suburban';
//   if (location.includes('beach') || location.includes('coast') || location.includes('ocean')) locationVibe = 'coastal';
//   else if (location.includes('mountain') || location.includes('hill')) locationVibe = 'mountain';
//   else if (location.includes('downtown') || location.includes('city')) locationVibe = 'urban';
//   else if (location.includes('ranch') || location.includes('farm')) locationVibe = 'rural';

//   return { pricePoint, propertyAge, spaceScale, locationVibe };
// };

// // ============================================================================
// // DYNAMIC SECTION POOL - Changes based on context
// // ============================================================================

// const getSectionPool = (context: PropertyContext) => {
//   const basePool = {
//     hero: ['hero_fullscreen', 'hero_split', 'hero_minimal', 'hero_magazine', 'hero_cinematic', 'hero_asymmetric', 'hero_floating', 'hero_diagonal'],
//     narrative: ['narrative_standard', 'narrative_timeline', 'narrative_quote', 'narrative_split', 'narrative_minimal', 'narrative_editorial'],
//     gallery: ['gallery_masonry', 'gallery_grid', 'gallery_asymmetric', 'gallery_fullbleed', 'gallery_scattered', 'gallery_triptych', 'gallery_panoramic'],
//     specs: ['specs_grid', 'specs_cards', 'specs_horizontal', 'specs_minimal'],
//     features: ['features_grid', 'features_list', 'features_cards', 'features_minimal', 'features_icons'],
//     special: ['location_map', 'timeline_story', 'testimonial', 'stats_showcase', 'quote_block', 'cta_contact']
//   };

//   // Context-based filtering
//   if (context.pricePoint === 'ultra_luxury') {
//     // Ultra-luxury prefers minimal, cinematic styles
//     basePool.hero = ['hero_minimal', 'hero_cinematic', 'hero_floating'];
//     basePool.narrative = ['narrative_minimal', 'narrative_quote'];
//     basePool.specs = ['specs_minimal', 'specs_horizontal'];
//   } else if (context.pricePoint === 'standard') {
//     // Standard properties prefer accessible layouts
//     basePool.hero = ['hero_split', 'hero_magazine', 'hero_fullscreen'];
//     basePool.gallery = ['gallery_grid', 'gallery_masonry'];
//   }

//   if (context.propertyAge === 'historic') {
//     basePool.special.push('timeline_story'); // Emphasize history
//   }

//   if (context.locationVibe === 'coastal') {
//     basePool.gallery = [...basePool.gallery, 'gallery_panoramic']; // More panoramic views
//   }

//   return basePool;
// };

// // ============================================================================
// // UNIQUENESS ENGINE - Generates truly unique layout specs
// // ============================================================================

// const generateUniqueLayoutSpec = (context: PropertyContext, excludedFingerprints: string[]) => {
//   const philosophies = ['brutalist_luxury', 'soft_minimalism', 'magazine_editorial', 'art_deco_revival', 'swiss_modernism', 'asymmetric_tension', 'balanced_harmony', 'organic_flow', 'geometric_precision', 'avant_garde'];
//   const flowPatterns = ['linear', 'z_path', 'spiral', 'diagonal', 'scattered', 'modular'];
//   const densities = ['sparse', 'balanced', 'dense'];
//   const rhythms = ['consistent', 'alternating', 'crescendo', 'staccato'];
//   const visualWeights = ['top_heavy', 'balanced', 'bottom_anchored'];

//   const sectionPool = getSectionPool(context);
  
//   let attempts = 0;
//   const maxAttempts = 50;

//   while (attempts < maxAttempts) {
//     attempts++;

//     // 1. Random section count (7-12)
//     const sectionCount = getRandomInt(7, 12);

//     // 2. Random philosophy and flow
//     const philosophy = getRandomElement(philosophies);
//     const flowPattern = getRandomElement(flowPatterns);

//     // 3. Build section list with guaranteed variety
//     const sections: any[] = [];

//     // REQUIRED: 1 hero (random variant)
//     const heroType = getRandomElement(sectionPool.hero);
//     sections.push(heroType);

//     // REQUIRED: 1 narrative (random variant)
//     const narrativeType = getRandomElement(sectionPool.narrative);
//     sections.push(narrativeType);

//     // REQUIRED: 1 CTA
//     sections.push('cta_contact');

//     // FILL remaining slots randomly from all pools
//     const remainingSlots = sectionCount - 3;
//     const allOtherTypes = [
//       ...sectionPool.gallery,
//       ...sectionPool.specs,
//       ...sectionPool.features,
//       ...sectionPool.special.filter(s => s !== 'cta_contact')
//     ];

//     // Shuffle and pick random types
//     const shuffledTypes = shuffleArray(allOtherTypes);
//     for (let i = 0; i < remainingSlots && i < shuffledTypes.length; i++) {
//       sections.push(shuffledTypes[i]);
//     }

//     // 4. Generate fingerprint
//     const fingerprint = generateFingerprint(
//       sections.map(type => ({ type })),
//       philosophy,
//       flowPattern
//     );

//     // 5. Check if unique
//     if (!isDuplicate(fingerprint) && !excludedFingerprints.includes(fingerprint)) {
//       return {
//         sectionCount,
//         philosophy,
//         flowPattern,
//         density: getRandomElement(densities),
//         rhythm: getRandomElement(rhythms),
//         visualWeight: getRandomElement(visualWeights),
//         sections,
//         fingerprint
//       };
//     }
//   }

//   // Fallback: force unique by adding random timestamp
//   const forcedSectionCount = getRandomInt(7, 12);
//   const forcedSections = [
//     getRandomElement(sectionPool.hero),
//     getRandomElement(sectionPool.narrative),
//     ...shuffleArray([...sectionPool.gallery, ...sectionPool.specs, ...sectionPool.features]).slice(0, forcedSectionCount - 3),
//     'cta_contact'
//   ];

//   return {
//     sectionCount: forcedSectionCount,
//     philosophy: getRandomElement(philosophies),
//     flowPattern: getRandomElement(flowPatterns),
//     density: getRandomElement(densities),
//     rhythm: getRandomElement(rhythms),
//     visualWeight: getRandomElement(visualWeights),
//     sections: forcedSections,
//     fingerprint: `forced_unique_${Date.now()}_${Math.random()}`
//   };
// };

// // ============================================================================
// // DESIGN DIRECTIVE GENERATOR
// // ============================================================================

// const getDesignDirective = (context: PropertyContext, layoutSpec: any): string => {
//   let directive = "";

//   if (context.pricePoint === 'ultra_luxury') {
//     directive += "ULTRA-LUXURY: Extreme minimalism, abundant white space, rare materials aesthetic. Typography: Ultra-thin serifs. Palette: Monochromatic with ONE subtle accent. ";
//   } else if (context.pricePoint === 'luxury') {
//     directive += "LUXURY: Sophisticated balance, refined typography, elegant harmonies. Premium feel without being sparse. ";
//   } else {
//     directive += "APPROACHABLE PREMIUM: Modern and aspirational, accessible luxury. Balanced layouts, inviting colors. ";
//   }

//   if (context.propertyAge === 'historic') {
//     directive += "HERITAGE: Classical typography, vintage palettes, traditional proportions. ";
//   } else if (context.propertyAge === 'ultra_modern') {
//     directive += "CONTEMPORARY: Bold geometric layouts, modern sans-serifs, experimental asymmetry. ";
//   }

//   if (context.spaceScale === 'estate') {
//     directive += "EXPANSIVE: Grand layouts, dramatic hero sections, multiple galleries. ";
//   } else if (context.spaceScale === 'compact') {
//     directive += "EFFICIENT: Tight, focused layouts. Emphasize quality over quantity. ";
//   }

//   if (context.locationVibe === 'coastal') {
//     directive += "COASTAL: Light, airy palettes (blues, whites, sand). Organic flow, relaxed rhythm. ";
//   } else if (context.locationVibe === 'urban') {
//     directive += "URBAN: Bold contrasts, architectural lines, metropolitan energy. ";
//   }

//   // Add layout-specific directives
//   directive += `\nLAYOUT MANDATE: Use ${layoutSpec.philosophy} philosophy with ${layoutSpec.flowPattern} flow. `;
//   directive += `Rhythm: ${layoutSpec.rhythm}. Visual weight: ${layoutSpec.visualWeight}. Density: ${layoutSpec.density}. `;

//   return directive;
// };

// // ============================================================================
// // CREATIVE VARIATION INJECTORS
// // ============================================================================

// const getColorMoodVariation = (): string => {
//   const moods = [
//     'Deep Charcoal & Burnished Gold',
//     'Ivory & Forest Green',
//     'Midnight Navy & Copper',
//     'Warm Slate & Burgundy',
//     'Cool Gray & Amber',
//     'Off-White & Sage',
//     'Black & Rose Gold',
//     'Cream & Teal',
//     'Graphite & Silver',
//     'Sand & Terracotta'
//   ];
//   return getRandomElement(moods);
// };

// const getNarrativeVoice = (): string => {
//   const voices = [
//     'poetic, flowing, lyrical style',
//     'crisp, architectural, precise language',
//     'editorial, magazine-quality prose',
//     'minimalist, zen-like brevity',
//     'dramatic, cinematic storytelling',
//     'conversational, warm, inviting tone'
//   ];
//   return getRandomElement(voices);
// };

// const getTypographyDirection = (): string => {
//   const directions = [
//     'Ultra-modern geometric sans-serifs with extreme letter-spacing',
//     'Classic serif with contemporary proportions',
//     'Mixed serif headings with clean sans body text',
//     'Condensed display fonts with generous white space',
//     'Wide, open letterforms with minimal line-height',
//     'Elegant thin fonts with dramatic size contrasts'
//   ];
//   return getRandomElement(directions);
// };

// // ============================================================================
// // MAIN GENERATION FUNCTION
// // ============================================================================

// export const generateBrochureLayout = async (
//   property: PropertyData,
//   style: BrochureStyle
// ): Promise<BrochureTemplate> => {
//   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
//   // 1. Analyze context
//   const context = analyzePropertyContext(property);
  
//   // 2. Generate unique layout specification
//   const excludedFingerprints = LAYOUT_HISTORY.map(h => 
//     `${h.sectionTypes}|${h.sectionCount}|${h.philosophy}|${h.flowPattern}`
//   );
//   const layoutSpec = generateUniqueLayoutSpec(context, excludedFingerprints);
  
//   // 3. Get design directive
//   const designDirective = getDesignDirective(context, layoutSpec);
  
//   // 4. Add creative variations
//   const colorMood = getColorMoodVariation();
//   const narrativeVoice = getNarrativeVoice();
//   const typographyDirection = getTypographyDirection();
  
//   // 5. Generate truly random variants for each section
//   const variants = ['default', 'split', 'overlap', 'asymmetric', 'glass', 'full', 'compact', 'expanded'];
//   const sectionsWithVariants = layoutSpec.sections.map((sectionType: string, index: number) => ({
//     type: sectionType,
//     variant: getRandomElement(variants),
//     suggestedOrder: index + 1
//   }));

//   // 6. Shuffle section order randomly (except hero must be first, CTA must be last)
//   const heroSection = sectionsWithVariants[0];
//   const ctaSection = sectionsWithVariants[sectionsWithVariants.length - 1];
//   const middleSections = shuffleArray(sectionsWithVariants.slice(1, -1));
//   const randomOrderSections = [heroSection, ...middleSections, ctaSection];

//   // 7. Build uniqueness-focused prompt
//   const prompt = `
//     You are a GENERATIVE LAYOUT ARCHITECT creating a NEVER-BEFORE-SEEN brochure design.
    
//     === PROPERTY ===
//     ${property.title} | ${property.location} | ${property.price}
//     ${property.specs.beds} Beds | ${property.specs.baths} Baths | ${property.specs.sqft} sqft | Built ${property.specs.yearBuilt}
    
//     === CONTEXT ===
//     Price: ${context.pricePoint} | Age: ${context.propertyAge} | Scale: ${context.spaceScale} | Vibe: ${context.locationVibe}
    
//     === MANDATORY LAYOUT DNA ===
//     Philosophy: ${layoutSpec.philosophy}
//     Grid System: Use a ${getRandomInt(10, 16)}-column grid (NOT standard 12-column)
//     Flow Pattern: ${layoutSpec.flowPattern}
//     Section Count: EXACTLY ${layoutSpec.sectionCount} sections
//     Density: ${layoutSpec.density}
//     Rhythm: ${layoutSpec.rhythm}
//     Visual Weight: ${layoutSpec.visualWeight}
    
//     === REQUIRED SECTIONS (IN THIS EXACT ORDER) ===
//     ${randomOrderSections.map((s, i) => `${i + 1}. ${s.type} (variant: ${s.variant})`).join('\n    ')}
    
//     === DESIGN DIRECTIVES ===
//     ${designDirective}
    
//     === CREATIVE SPECIFICATIONS ===
//     COLOR MOOD: ${colorMood}
//     NARRATIVE VOICE: ${narrativeVoice}
//     TYPOGRAPHY: ${typographyDirection}
    
//     === UNIQUENESS CONSTRAINTS ===
//     - This EXACT combination of sections has NEVER been generated before
//     - Use UNEXPECTED color combinations within the mood
//     - Write narrative copy in a voice that is DISTINCTIVE to this property
//     - Apply variants that CREATE VISUAL TENSION and BREAK EXPECTATIONS
//     - Ensure NO section looks "templated" or "formulaic"
    
//     === ANTI-PATTERN RULES ===
//     - DO NOT use symmetric layouts for asymmetric_tension philosophy
//     - DO NOT use bright colors for brutalist_luxury
//     - DO NOT use multiple galleries back-to-back
//     - DO NOT place specs immediately after hero
//     - DO NOT use predictable typography pairings (e.g., Playfair + Montserrat)
    
//     Return ONLY valid JSON matching the schema. This design must be ARCHITECTURALLY DISTINCT.
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
//             layoutDNA: {
//               type: Type.OBJECT,
//               properties: {
//                 philosophy: { type: Type.STRING },
//                 gridSystem: { type: Type.STRING },
//                 flowPattern: { type: Type.STRING },
//                 sectionCount: { type: Type.NUMBER },
//                 density: { type: Type.STRING },
//                 rhythm: { type: Type.STRING },
//                 visualWeight: { type: Type.STRING }
//               },
//               required: ["philosophy", "gridSystem", "flowPattern", "sectionCount", "density", "rhythm", "visualWeight"]
//             },
//             propertyContext: {
//               type: Type.OBJECT,
//               properties: {
//                 pricePoint: { type: Type.STRING },
//                 propertyAge: { type: Type.STRING },
//                 spaceScale: { type: Type.STRING },
//                 locationVibe: { type: Type.STRING }
//               },
//               required: ["pricePoint", "propertyAge", "spaceScale", "locationVibe"]
//             },
//             palette: {
//               type: Type.OBJECT,
//               properties: {
//                 primary: { type: Type.STRING },
//                 secondary: { type: Type.STRING },
//                 accent: { type: Type.STRING },
//                 background: { type: Type.STRING },
//                 text: { type: Type.STRING },
//                 gradient: { type: Type.STRING },
//                 surface: { type: Type.STRING }
//               },
//               required: ["primary", "secondary", "accent", "background", "text"]
//             },
//             typography: {
//               type: Type.OBJECT,
//               properties: {
//                 heading: { type: Type.STRING },
//                 subheading: { type: Type.STRING },
//                 body: { type: Type.STRING },
//                 label: { type: Type.STRING },
//                 accent: { type: Type.STRING }
//               },
//               required: ["heading", "body", "label"]
//             },
//             narrativeCopy: {
//               type: Type.OBJECT,
//               properties: {
//                 headline: { type: Type.STRING },
//                 story: { type: Type.STRING },
//                 vision: { type: Type.STRING },
//                 tagline: { type: Type.STRING }
//               },
//               required: ["headline", "story", "vision"]
//             },
//             sections: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.OBJECT,
//                 properties: {
//                   type: { type: Type.STRING },
//                   variant: { type: Type.STRING },
//                   config: {
//                     type: Type.OBJECT,
//                     properties: {
//                       backgroundColor: { type: Type.STRING },
//                       textColor: { type: Type.STRING },
//                       padding: { type: Type.STRING },
//                       order: { type: Type.NUMBER },
//                       titleSize: { type: Type.STRING },
//                       spacing: { type: Type.STRING },
//                       alignment: { type: Type.STRING },
//                       imageCount: { type: Type.NUMBER },
//                       layout: { type: Type.STRING }
//                     },
//                     required: ["order"]
//                   }
//                 },
//                 required: ["type", "variant", "config"]
//               }
//             },
//             animations: {
//               type: Type.OBJECT,
//               properties: {
//                 heroEntry: { type: Type.STRING },
//                 scrollEffect: { type: Type.STRING },
//                 imageHover: { type: Type.STRING },
//                 sectionTransition: { type: Type.STRING }
//               }
//             }
//           },
//           required: ["layoutDNA", "propertyContext", "palette", "typography", "narrativeCopy", "sections"]
//         },
//         temperature: 1.5,  // MAXIMUM creativity for uniqueness
//         topP: 0.95,        // High diversity
//         topK: 40           // Wide sampling
//       }
//     });

//     let text = response.text;
//     text = text.replace(/```json/g, '').replace(/```/g, '').trim();
//     const result = JSON.parse(text);

//     // Save fingerprint to prevent future duplicates
//     saveFingerprint(result.sections, result.layoutDNA.philosophy, result.layoutDNA.flowPattern);

//     console.log('🎨 Generated unique layout:', layoutSpec.fingerprint);
//     console.log('📊 History size:', LAYOUT_HISTORY.length);

//     return result;
//   } catch (error) {
//     console.error("Gemini Layout Generation Error:", error);
//     throw error;
//   }
// };

// // ============================================================================
// // UTILITY: Clear history (for testing)
// // ============================================================================

// export const clearLayoutHistory = () => {
//   LAYOUT_HISTORY.length = 0;
//   console.log('🗑️ Layout history cleared');
// };

// export const getLayoutHistory = () => {
//   return [...LAYOUT_HISTORY];
// };
