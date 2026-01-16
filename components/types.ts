// ============================================================================
// CORE TYPES
// ============================================================================

export interface PropertyData {
  title: string;
  location: string;
  price: string;
  description: string;
  specs: {
    beds: string;
    baths: string;
    sqft: string;
    yearBuilt: string;
  };
  amenities: string[];
  images: string[];
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
    photoUrl: string;
  };
}

export enum BrochureStyle {
  ARCHITECTURAL = 'architectural',
  LUXURY_MODERN = 'luxury-modern',
  MINIMALIST = 'minimalist',
  EDITORIAL = 'editorial',
  BRUTALIST = 'brutalist'
}

// ============================================================================
// EXPANDED SECTION TYPES (20+ variations)
// ============================================================================

export type SectionType = 
  // Hero Variants (8 types)
  | 'hero_fullscreen'
  | 'hero_split'
  | 'hero_minimal'
  | 'hero_magazine'
  | 'hero_cinematic'
  | 'hero_asymmetric'
  | 'hero_floating'
  | 'hero_diagonal'
  
  // Narrative Variants (6 types)
  | 'narrative_standard'
  | 'narrative_timeline'
  | 'narrative_quote'
  | 'narrative_split'
  | 'narrative_minimal'
  | 'narrative_editorial'
  
  // Gallery Variants (7 types)
  | 'gallery_masonry'
  | 'gallery_grid'
  | 'gallery_asymmetric'
  | 'gallery_fullbleed'
  | 'gallery_scattered'
  | 'gallery_triptych'
  | 'gallery_panoramic'
  
  // Specs Variants (4 types)
  | 'specs_grid'
  | 'specs_cards'
  | 'specs_horizontal'
  | 'specs_minimal'
  
  // Features Variants (5 types)
  | 'features_grid'
  | 'features_list'
  | 'features_cards'
  | 'features_minimal'
  | 'features_icons'
  
  // New Section Types (8 types)
  | 'location_map'
  | 'timeline_story'
  | 'testimonial'
  | 'comparison_table'
  | 'video_embed'
  | 'stats_showcase'
  | 'quote_block'
  | 'cta_contact';

export type SectionVariant = 
  | 'default'
  | 'split'
  | 'overlap'
  | 'asymmetric'
  | 'glass'
  | 'full'
  | 'compact'
  | 'expanded';

// ============================================================================
// LAYOUT DNA SYSTEM
// ============================================================================

export type LayoutPhilosophy = 
  | 'brutalist_luxury'
  | 'soft_minimalism'
  | 'magazine_editorial'
  | 'art_deco_revival'
  | 'swiss_modernism'
  | 'asymmetric_tension'
  | 'balanced_harmony'
  | 'organic_flow'
  | 'geometric_precision'
  | 'avant_garde';

export type GridSystem = 
  | 'standard_12'
  | 'custom_16'
  | 'golden_ratio'
  | 'fibonacci'
  | 'fluid_adaptive';

export type FlowPattern = 
  | 'linear'
  | 'z_path'
  | 'spiral'
  | 'diagonal'
  | 'scattered'
  | 'modular';

export interface LayoutDNA {
  philosophy: LayoutPhilosophy;
  gridSystem: GridSystem;
  flowPattern: FlowPattern;
  sectionCount: number;
  density: 'sparse' | 'balanced' | 'dense';
  rhythm: 'consistent' | 'alternating' | 'crescendo' | 'staccato';
  visualWeight: 'top_heavy' | 'balanced' | 'bottom_anchored';
}

// ============================================================================
// PROPERTY CONTEXT ANALYSIS
// ============================================================================

export interface PropertyContext {
  pricePoint: 'ultra_luxury' | 'luxury' | 'premium' | 'standard';
  propertyAge: 'historic' | 'classic' | 'contemporary' | 'modern' | 'ultra_modern';
  spaceScale: 'compact' | 'comfortable' | 'spacious' | 'expansive' | 'estate';
  locationVibe: 'urban' | 'suburban' | 'coastal' | 'mountain' | 'rural';
}

// ============================================================================
// SECTION CONFIGURATION
// ============================================================================

export interface SectionConfig {
  backgroundColor?: string;
  textColor?: string;
  padding?: string;
  order: number;
  titleSize?: string;
  spacing?: string;
  alignment?: 'left' | 'center' | 'right';
  imageCount?: number;
  layout?: 'vertical' | 'horizontal' | 'grid';
}

export interface LayoutSection {
  type: SectionType;
  variant: SectionVariant;
  config: SectionConfig;
}

// ============================================================================
// ENHANCED BROCHURE TEMPLATE
// ============================================================================

export interface BrochureTemplate {
  // Layout Intelligence
  layoutDNA: LayoutDNA;
  propertyContext: PropertyContext;
  
  // Design System
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    gradient?: string;
    surface?: string;
  };
  
  typography: {
    heading: string;
    subheading?: string;
    body: string;
    label: string;
    accent?: string;
  };
  
  // Narrative Content
  narrativeCopy: {
    headline: string;
    story: string;
    vision: string;
    tagline?: string;
  };
  
  // Dynamic Sections
  sections: LayoutSection[];
  
  // Optional: Animation preferences
  animations?: {
    heroEntry?: string;
    scrollEffect?: string;
    imageHover?: string;
    sectionTransition?: string;
  };
}

// ============================================================================
// DESIGN PHILOSOPHY PROFILES
// ============================================================================

export interface DesignPhilosophy {
  name: LayoutPhilosophy;
  whitespace: 'minimal' | 'balanced' | 'abundant' | 'aggressive';
  borders: 'none' | 'hairline' | 'medium' | 'thick' | 'decorative';
  typography: 'condensed_bold' | 'light_serif' | 'modern_sans' | 'editorial_mixed';
  imagery: 'high_contrast_bw' | 'muted_pastels' | 'vibrant_saturated' | 'natural_tones';
  layout: 'grid_strict' | 'asymmetric_free' | 'modular_blocks' | 'organic_flow';
}