
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

export interface PropertyData {
  title: string;
  location: string;
  price: string;
  description: string;
  specs: PropertySpecs;
  amenities: string[];
  images: string[];
  agent: AgentData;
}

export enum BrochureStyle {
  LUXURY = 'luxury',
  MINIMALIST = 'minimalist',
  AVANT_GARDE = 'avant-garde',
  ARCHITECTURAL = 'architectural',
  EDITORIAL = 'editorial'
}

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
