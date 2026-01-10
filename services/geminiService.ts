
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
