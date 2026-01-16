import React from 'react';
import { Clock, Sparkles, FileText, Share2 } from 'lucide-react';

interface FeaturesSectionProps {
  onCreateClick: () => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onCreateClick }) => {
  const features = [
    {
      icon: Clock,
      title: 'Ready in Minutes',
      description: 'Automatically generates PDF brochure in minutes, saving hours of manual design.'
    },
    {
      icon: Sparkles,
      title: 'Buyer-Focused Content',
      description: 'Highlights photos, floor plans, and neighborhood insights that buyers care about most.'
    },
    {
      icon: FileText,
      title: 'Professional Output',
      description: 'Branded, polished output ready for WhatsApp, email, print, or sales meetings.'
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Download instantly and share with prospects through any channel.'
    }
  ];

  const audience = [
    { icon: '✓', label: 'Real Estate Agents' },
    { icon: '✓', label: 'Property Developers' },
    { icon: '✓', label: 'Brokers' },
    { icon: '✓', label: 'Property Managers' }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-4 py-1 bg-emerald-100 border border-emerald-200 rounded-full mb-6">
            <span className="text-sm text-[#059669] font-semibold">4X ROI GUARANTEED</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Why Choose DreamExProp?
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Everything you need to create stunning property brochures that convert.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-[#10B981] transition-colors">
                <feature.icon className="w-6 h-6 text-[#10B981] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <span className="text-sm text-[#10B981] font-bold uppercase tracking-wider">
            PERFECT FOR
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {audience.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 text-gray-700"
            >
              <span className="text-[#10B981] text-xl font-bold">{item.icon}</span>
              <span className="text-base font-medium">{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={onCreateClick}
            className="px-8 py-4 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105"
          >
            Start Creating →
          </button>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;