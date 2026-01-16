import React, { useState, useRef } from 'react';
import { PropertyData, BrochureStyle, BrochureTemplate } from './types';
import { generateBrochureLayout } from '../services/geminiService';
import Header from './Header';
import FeaturesSection from './FeaturesSection';
import StepIndicator from './StepIndicator';
import PropertyStep from './steps/PropertyStep';
import VisualsStep from './steps/VisualsStep';
import FeaturesStep from './steps/FeaturesStep';
import DescriptionStep from './steps/DescriptionStep';
import ContactStep from './steps/ContactStep';
import BrochureRenderer from './BrochureRenderer';
import { 
  Building2, 
  ImageIcon, 
  Layers, 
  FileText, 
  User,
  Loader2,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Download
} from 'lucide-react';

const EMPTY_DATA: PropertyData = {
  title: '',
  location: '',
  price: '',
  description: '',
  specs: { beds: '', baths: '', sqft: '', yearBuilt: '' },
  amenities: [],
  images: [],
  agent: { name: '', title: '', phone: '', email: '', photoUrl: '' }
};

const BrochureBuilder: React.FC = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<PropertyData>(EMPTY_DATA);
  const [style, setStyle] = useState<BrochureStyle>(BrochureStyle.LUXURY_MODERN);
  const [template, setTemplate] = useState<BrochureTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    { id: 1, label: 'Property', icon: <Building2 className="w-7 h-7" /> },
    { id: 2, label: 'Visuals', icon: <ImageIcon className="w-7 h-7" /> },
    { id: 3, label: 'Features', icon: <Layers className="w-7 h-7" /> },
    { id: 4, label: 'Description', icon: <FileText className="w-7 h-7" /> },
    { id: 5, label: 'Contact', icon: <User className="w-7 h-7" /> }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // Call the actual Gemini service
      const generatedTemplate = await generateBrochureLayout(data, style);
      setTemplate(generatedTemplate);
    } catch (error) {
      console.error('Failed to generate brochure:', error);
      
      // Show error to user
      alert('Failed to generate brochure. Please check your API key and try again.');
      
      // Fallback to mock template if API fails
      const mockTemplate: BrochureTemplate = {
        layoutDNA: {
          philosophy: 'soft_minimalism' as const,
          gridSystem: 'standard_12' as const,
          flowPattern: 'linear' as const,
          sectionCount: 5,
          density: 'balanced' as const,
          rhythm: 'consistent' as const,
          visualWeight: 'balanced' as const
        },
        propertyContext: {
          pricePoint: 'luxury' as const,
          propertyAge: 'modern' as const,
          spaceScale: 'spacious' as const,
          locationVibe: 'urban' as const
        },
        palette: {
          primary: '#1a2332',
          secondary: '#2C3E50',
          accent: '#F59E0B',
          background: '#ffffff',
          text: '#1a2332',
          gradient: 'linear-gradient(135deg, #D97706 0%, #F59E0B 100%)',
          surface: '#f8fafc'
        },
        typography: {
          heading: 'serif',
          body: 'sans-serif',
          label: 'sans-serif'
        },
        narrativeCopy: {
          headline: 'Your Dream Home Awaits',
          story: data.description || 'A stunning property awaits.',
          vision: 'Where luxury meets comfort.',
          tagline: 'Live the Life You Deserve'
        },
        sections: []
      };
      setTemplate(mockTemplate);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!showBuilder) {
    return (
      <>
        <Header />
        <FeaturesSection onCreateClick={() => setShowBuilder(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentStep={currentStep} totalSteps={steps.length} />
      <StepIndicator steps={steps} currentStep={currentStep} />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!template ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="space-y-8">
              {currentStep === 1 && <PropertyStep data={data} setData={setData} />}
              {currentStep === 2 && <VisualsStep data={data} setData={setData} />}
              {currentStep === 3 && <FeaturesStep data={data} setData={setData} />}
              {currentStep === 4 && <DescriptionStep data={data} setData={setData} style={style} setStyle={setStyle} />}
              {currentStep === 5 && <ContactStep data={data} setData={setData} />}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>

                {currentStep < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all shadow-lg shadow-emerald-500/25"
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-8 py-3 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/25"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>Generate Brochure</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
            {/* Preview Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">{data.title}</span>
                <span className="text-xs text-gray-500">{style.replace('-', ' ').toUpperCase()} Style</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()} 
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-all disabled:opacity-50"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  New Variation
                </button>
              </div>
            </div>
            
            {/* Brochure Preview */}
            <div className="overflow-auto max-h-[calc(100vh-200px)]">
              <BrochureRenderer data={data} template={template} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrochureBuilder;