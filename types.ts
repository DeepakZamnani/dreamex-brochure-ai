
// export interface AgentData {
//   name: string;
//   title: string;
//   phone: string;
//   email: string;
//   photoUrl: string;
// }

// export interface PropertySpecs {
//   beds: string;
//   baths: string;
//   sqft: string;
//   yearBuilt: string;
// }

// export interface PropertyData {
//   title: string;
//   location: string;
//   price: string;
//   description: string;
//   specs: PropertySpecs;
//   amenities: string[];
//   images: string[];
//   agent: AgentData;
// }

// export enum BrochureStyle {
//   LUXURY = 'luxury',
//   MINIMALIST = 'minimalist',
//   AVANT_GARDE = 'avant-garde',
//   ARCHITECTURAL = 'architectural',
//   EDITORIAL = 'editorial'
// }

// export interface LayoutSection {
//   type: 'hero' | 'narrative' | 'gallery' | 'features' | 'map_spotlight' | 'cta' | 'specs_grid';
//   variant: 'split' | 'overlap' | 'full' | 'asymmetric' | 'glass';
//   config: {
//     backgroundColor: string;
//     textColor: string;
//     padding: string;
//     order: number;
//     titleSize: string;
//     animationDelay?: string;
//   };
// }

// export interface BrochureTemplate {
//   palette: {
//     primary: string;
//     secondary: string;
//     accent: string;
//     background: string;
//     text: string;
//     gradient?: string;
//   };
//   typography: {
//     heading: string;
//     body: string;
//     label: string;
//   };
//   narrativeCopy: {
//     headline: string;
//     story: string;
//     vision: string;
//   };
//   sections: LayoutSection[];
// }

// ============================================================================
// PROPERTY DATA - Enhanced for Real Estate Industry Standards
// ============================================================================

export interface AgentData {
  name: string;
  title: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface PropertySpecs {
  beds: string;
  baths: string;
  sqft: string;
  yearBuilt: string;
}

// NEW: Property Type Classification
export type PropertyType = 
  | 'apartment' 
  | 'villa' 
  | 'rowhouse' 
  | 'plot' 
  | 'commercial';

// NEW: Project Status
export type ProjectStatus = 
  | 'under_construction' 
  | 'ready_to_move' 
  | 'new_launch' 
  | 'resale';

// NEW: Configuration Options
export type Configuration = 
  | '1BHK' 
  | '2BHK' 
  | '2.5BHK' 
  | '3BHK' 
  | '4BHK' 
  | '5BHK'
  | 'Penthouse'
  | 'Studio';

// NEW: Image Labels
export type ImageLabel = 
  | 'elevation' 
  | 'living_room' 
  | 'bedroom' 
  | 'kitchen' 
  | 'bathroom'
  | 'balcony'
  | 'amenities' 
  | 'floor_plan' 
  | 'location_map'
  | 'exterior'
  | 'lobby'
  | 'other';

// NEW: Target Buyer Types
export type TargetBuyer = 
  | 'families' 
  | 'investors' 
  | 'working_professionals' 
  | 'luxury_buyers'
  | 'nri_buyers'
  | 'senior_citizens';

// NEW: Usage Intent
export type UsageIntent = 
  | 'whatsapp' 
  | 'email' 
  | 'print' 
  | 'presentation'
  | 'website';

// ============================================================================
// AREA DETAILS
// ============================================================================

export interface AreaDetails {
  carpetArea?: string;      // Actual usable area
  builtUpArea?: string;     // Carpet + walls
  superBuiltUpArea?: string; // Built-up + common areas
}

// ============================================================================
// PRICE DETAILS
// ============================================================================

export interface PriceDetails {
  startingPrice: string;                    // "₹45 Lakhs"
  priceRange?: {
    min: string;
    max: string;
  };
  isAllInclusive: boolean;                  // Taxes included?
  pricePerSqft?: string;                    // Optional
}

// ============================================================================
// LABELED IMAGES
// ============================================================================

export interface LabeledImage {
  url: string;
  label: ImageLabel;
  order: number;
  isCover: boolean;                         // First image = cover
  caption?: string;
}

// ============================================================================
// GROUPED AMENITIES
// ============================================================================

export interface GroupedAmenities {
  projectAmenities: string[];               // Pool, Gym, Clubhouse, etc.
  apartmentFeatures: string[];              // Vitrified flooring, Modular kitchen, etc.
  securityFeatures: string[];               // CCTV, Gated community, etc.
  sustainability: string[];                 // Rainwater harvesting, Solar, etc.
}

// ============================================================================
// SALES INTELLIGENCE (Replaces free-text description)
// ============================================================================

export interface SalesIntelligence {
  targetBuyer: TargetBuyer[];               // Multi-select
  keySellingPoints: [string, string, string]; // Exactly 3 reasons
  locationAdvantages: {
    nearbyLandmarks: string[];              // Schools, Malls, etc.
    metroDistance?: string;                 // "500m from Metro"
    schools?: string[];
    hospitals?: string[];
    itParks?: string[];
    shopping?: string[];
    connectivity?: string;                  // "Close to Highway"
  };
  uniqueFeatures?: string;                  // Optional free text for special aspects
}

// ============================================================================
// BRANDING & LEGAL
// ============================================================================

export interface BrandingInfo {
  developerName: string;                    // Company/Developer name
  reraNumber?: string;                      // RERA Registration (high trust factor)
  siteAddress: string;                      // Project site address
  includeDisclaimer: boolean;               // Auto-generated legal disclaimer
  websiteUrl?: string;
  logoUrl?: string;
}

// ============================================================================
// ADVANCED OPTIONS (Phase 2 Features)
// ============================================================================

export interface AdvancedOptions {
  includeFloorPlan: boolean;
  includeAmenitiesPage: boolean;
  includeLocationMap: boolean;
  includePriceDisclaimer: boolean;
  includeQRCode: boolean;                   // Virtual tour / WhatsApp link
  qrCodeUrl?: string;
  includePaymentPlan: boolean;
  includeSpecifications: boolean;
}

// ============================================================================
// MAIN PROPERTY DATA INTERFACE
// ============================================================================

export interface PropertyData {
  price: string;
  // Basic Information
  title: string;                            // Property/Project name
  location: string;                         // City/Area

  // NEW: Property Classification
  propertyType: PropertyType;
  projectStatus: ProjectStatus;
  configuration: Configuration[];           // Multi-select: ['2BHK', '3BHK']

  // NEW: Enhanced Area Details
  areaDetails: AreaDetails;

  // NEW: Structured Pricing
  priceDetails: PriceDetails;

  // Legacy Specs (kept for backward compatibility - can be deprecated later)
  specs: PropertySpecs;

  // NEW: Labeled & Ordered Images
  images: LabeledImage[];

  // NEW: Grouped Amenities
  amenities: GroupedAmenities;

  // NEW: Structured Sales Intelligence (replaces free-text description)
  salesIntelligence: SalesIntelligence;

  // NEW: Branding & Legal Compliance
  branding: BrandingInfo;

  // Agent Information
  agent: AgentData;

  // NEW: Usage Context
  usageIntent: UsageIntent;

  // NEW: Advanced Options
  advancedOptions?: AdvancedOptions;

  // Optional: Legacy description field (can be removed later)
  description?: string;
}

// ============================================================================
// BROCHURE STYLE (Enhanced with use-case descriptions)
// ============================================================================

export enum BrochureStyle {
  LUXURY = 'luxury',              // Best for high-ticket / NRI buyers
  MINIMALIST = 'minimalist',      // Best for WhatsApp sharing
  AVANT_GARDE = 'avant-garde',    // Modern & bold
  ARCHITECTURAL = 'architectural', // Technical & precise
  EDITORIAL = 'editorial'         // Best for email & PDF sharing
}

// Helper for style descriptions
export const BrochureStyleDescriptions: Record<BrochureStyle, string> = {
  [BrochureStyle.LUXURY]: 'Best for high-ticket / NRI buyers',
  [BrochureStyle.MINIMALIST]: 'Best for WhatsApp sharing',
  [BrochureStyle.AVANT_GARDE]: 'Modern & bold design',
  [BrochureStyle.ARCHITECTURAL]: 'Technical & precise',
  [BrochureStyle.EDITORIAL]: 'Best for email & PDF sharing'
};

// ============================================================================
// LAYOUT SECTIONS (Unchanged - for rendering)
// ============================================================================

export interface LayoutSection {
  type: 'hero' | 'narrative' | 'gallery' | 'features' | 'map_spotlight' | 'cta' | 'specs_grid';
  variant: 'split' | 'overlap' | 'full' | 'asymmetric' | 'glass';
  config: {
    backgroundColor: string;
    textColor: string;
    padding: string;
    order: number;
    titleSize: string;
    animationDelay?: string;
  };
}

// ============================================================================
// BROCHURE TEMPLATE (Output from AI - Unchanged)
// ============================================================================

export interface BrochureTemplate {
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    gradient?: string;
  };
  typography: {
    heading: string;
    body: string;
    label: string;
  };
  narrativeCopy: {
    headline: string;
    story: string;
    vision: string;
  };
  sections: LayoutSection[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// For form validation
export interface FormStep {
  id: number;
  label: string;
  isComplete: boolean;
  fields: string[];
}

// For image upload handling
export interface ImageUploadState {
  file: File;
  preview: string;
  label: ImageLabel;
  order: number;
}

// ============================================================================
// DEFAULT VALUES / EMPTY STATES
// ============================================================================

export const EMPTY_PROPERTY_DATA: PropertyData = {
  title: '',
  location: '',
  propertyType: 'apartment',
  projectStatus: 'ready_to_move',
  configuration: [],
  areaDetails: {},
  priceDetails: {
    startingPrice: '',
    isAllInclusive: false
  },
  specs: {
    beds: '',
    baths: '',
    sqft: '',
    yearBuilt: ''
  },
  images: [],
  amenities: {
    projectAmenities: [],
    apartmentFeatures: [],
    securityFeatures: [],
    sustainability: []
  },
  salesIntelligence: {
    targetBuyer: [],
    keySellingPoints: ['', '', ''],
    locationAdvantages: {
      nearbyLandmarks: []
    }
  },
  branding: {
    developerName: '',
    siteAddress: '',
    includeDisclaimer: true
  },
  agent: {
    name: '',
    title: '',
    phone: '',
    email: '',
    photoUrl: ''
  },
  usageIntent: 'email',
  advancedOptions: {
    includeFloorPlan: false,
    includeAmenitiesPage: true,
    includeLocationMap: false,
    includePriceDisclaimer: true,
    includeQRCode: false,
    includePaymentPlan: false,
    includeSpecifications: true
  }
};

// ============================================================================
// PREDEFINED OPTIONS FOR DROPDOWNS/MULTI-SELECT
// ============================================================================

export const PROJECT_AMENITIES_OPTIONS = [
  'Swimming Pool',
  'Gymnasium',
  'Clubhouse',
  'Children\'s Play Area',
  'Jogging Track',
  'Indoor Games Room',
  'Party Hall',
  'Landscaped Gardens',
  'Amphitheater',
  'Yoga/Meditation Area',
  'Spa & Sauna',
  'Sports Court',
  'Convenience Store',
  'Cafeteria',
  'Library'
];

export const APARTMENT_FEATURES_OPTIONS = [
  'Vitrified Flooring',
  'Modular Kitchen',
  'Branded Sanitaryware',
  'Premium Doors',
  'False Ceiling',
  'Video Door Phone',
  'Balcony',
  'Covered Parking',
  'Power Backup',
  'High-Speed Elevators',
  'Vastu Compliant',
  'Anti-Skid Tiles',
  'Premium Fittings',
  'Smart Home Ready'
];

export const SECURITY_FEATURES_OPTIONS = [
  'CCTV Surveillance',
  'Intercom Facility',
  'Gated Community',
  'Fire Safety Systems',
  '24/7 Security',
  'Access Control',
  'Visitor Management',
  'Emergency Exits',
  'Fire Extinguishers',
  'Smoke Detectors'
];

export const SUSTAINABILITY_OPTIONS = [
  'Rainwater Harvesting',
  'Solar Power',
  'Sewage Treatment Plant',
  'Waste Management',
  'Energy-Efficient Lighting',
  'Water Recycling',
  'Organic Waste Converter',
  'Green Building Certified',
  'Eco-Friendly Materials'
];