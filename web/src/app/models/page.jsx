import React from "react";
import {
  Brain,
  Zap,
  Clock,
  Image,
  Sparkles,
  Target,
  Gauge,
  Award,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function ModelsPage() {
  const models = [
    {
      id: "hibbi1",
      name: "HIBBI1",
      tagline: "Our Flagship AI Model",
      description: "Advanced proprietary neural architecture with breakthrough quality",
      features: [
        "Proprietary HIBBI1 Neural Architecture",
        "Advanced Prompt Enhancement Engine",
        "Ultra-High Resolution Support",
        "Intelligent Context Understanding",
        "Real-time Quality Optimization",
        "Cinematic Lighting Analysis"
      ],
      performance: {
        quality: 98,
        speed: 85,
        creativity: 95,
        accuracy: 96
      },
      specs: {
        maxResolution: "8K (8192x8192)",
        processingTime: "3-15 seconds",
        parameters: "Advanced multi-modal",
        architecture: "Proprietary HIBBI1"
      },
      gradient: "from-[#4f46e5] to-[#06b6d4]",
      icon: Brain,
      badge: "FLAGSHIP",
      isPrimary: true
    },
    {
      id: "hibii-ultra",
      name: "Hibii Ultra",
      tagline: "Maximum Quality Generation",
      description: "High-end model optimized for professional-grade image creation",
      features: [
        "Advanced Diffusion Processing",
        "Professional Quality Output",
        "Complex Scene Understanding",
        "Fine Detail Preservation",
        "Color Accuracy Optimization"
      ],
      performance: {
        quality: 92,
        speed: 70,
        creativity: 88,
        accuracy: 90
      },
      specs: {
        maxResolution: "4K (4096x4096)",
        processingTime: "5-8 seconds",
        parameters: "10.5B parameters",
        architecture: "Enhanced Diffusion"
      },
      gradient: "from-[#7c3aed] to-[#c084fc]",
      icon: Award,
      badge: "PREMIUM"
    },
    {
      id: "hibii-pro",
      name: "Hibii Pro",
      tagline: "Balanced Performance",
      description: "Professional model balancing quality and generation speed",
      features: [
        "Optimized Processing Pipeline",
        "Balanced Quality-Speed Ratio",
        "Versatile Style Support",
        "Efficient Resource Usage"
      ],
      performance: {
        quality: 85,
        speed: 88,
        creativity: 82,
        accuracy: 85
      },
      specs: {
        maxResolution: "2K (2048x2048)",
        processingTime: "2-4 seconds",
        parameters: "7.2B parameters",
        architecture: "Optimized Diffusion"
      },
      gradient: "from-[#059669] to-[#34d399]",
      icon: Target,
      badge: "BALANCED"
    },
    {
      id: "hibii-fast",
      name: "Hibii Fast",
      tagline: "Rapid Generation",
      description: "Speed-optimized model for quick iterations and prototyping",
      features: [
        "Ultra-Fast Processing",
        "Real-time Preview",
        "Efficient Architecture",
        "Quick Iterations"
      ],
      performance: {
        quality: 75,
        speed: 98,
        creativity: 78,
        accuracy: 80
      },
      specs: {
        maxResolution: "1K (1024x1024)",
        processingTime: "1-2 seconds",
        parameters: "3.8B parameters",
        architecture: "Lightweight Diffusion"
      },
      gradient: "from-[#dc2626] to-[#f87171]",
      icon: Zap,
      badge: "SPEED"
    }
  ];

  const PerformanceBar = ({ label, value, color = "bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]" }) => (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-white/70">{label}</span>
      <div className="flex items-center">
        <div className="w-24 h-2 bg-[#1a1a2e] rounded-full mr-3 overflow-hidden">
          <div 
            className={`h-full ${color} transition-all duration-1000`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm font-medium text-white w-8">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#1a1a2e] font-inter">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            AI Model Comparison
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our suite of advanced AI models, each optimized for different use cases 
            and performance requirements. From our flagship HIBBI1 to specialized variants.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {models.map((model) => {
            const IconComponent = model.icon;
            return (
              <div 
                key={model.id}
                className={`relative bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8 hover:border-[#4f46e5]/50 transition-all duration-300 ${model.isPrimary ? 'lg:col-span-2' : ''}`}
              >
                {/* Badge */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r ${model.gradient} text-white`}>
                  {model.badge}
                </div>

                {/* Model Header */}
                <div className="flex items-start mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${model.gradient} flex items-center justify-center mr-6`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{model.name}</h3>
                    <p className="text-lg text-white/60 mb-3">{model.tagline}</p>
                    <p className="text-white/80">{model.description}</p>
                  </div>
                </div>

                <div className={`grid ${model.isPrimary ? 'lg:grid-cols-2' : ''} gap-8`}>
                  {/* Features */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Sparkles className="mr-2 text-[#06b6d4]" size={20} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {model.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-white/80">
                          <ChevronRight size={16} className="mr-2 text-[#06b6d4]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Performance & Specs */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Gauge className="mr-2 text-[#06b6d4]" size={20} />
                      Performance
                    </h4>
                    
                    <div className="mb-6">
                      <PerformanceBar 
                        label="Quality" 
                        value={model.performance.quality}
                        color={`bg-gradient-to-r ${model.gradient}`}
                      />
                      <PerformanceBar 
                        label="Speed" 
                        value={model.performance.speed}
                        color={`bg-gradient-to-r ${model.gradient}`}
                      />
                      <PerformanceBar 
                        label="Creativity" 
                        value={model.performance.creativity}
                        color={`bg-gradient-to-r ${model.gradient}`}
                      />
                      <PerformanceBar 
                        label="Accuracy" 
                        value={model.performance.accuracy}
                        color={`bg-gradient-to-r ${model.gradient}`}
                      />
                    </div>

                    {/* Technical Specs */}
                    <div className="bg-[#0f0f1a]/80 rounded-2xl p-4">
                      <h5 className="text-sm font-semibold text-white/80 mb-3">Technical Specifications</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Max Resolution:</span>
                          <span className="text-white">{model.specs.maxResolution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Processing Time:</span>
                          <span className="text-white">{model.specs.processingTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Parameters:</span>
                          <span className="text-white">{model.specs.parameters}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Architecture:</span>
                          <span className="text-white">{model.specs.architecture}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Try Model Button */}
                <div className="mt-8 pt-6 border-t border-[#2a2a3e]/50">
                  <a 
                    href="/"
                    className={`inline-flex items-center px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r ${model.gradient} text-white hover:opacity-90 transition-all`}
                  >
                    Try {model.name}
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Model Comparison Matrix
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2a2a3e]/50">
                  <th className="text-left py-4 px-4 text-white/80 font-semibold">Feature</th>
                  {models.map(model => (
                    <th key={model.id} className="text-center py-4 px-4 text-white/80 font-semibold">
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2a2a3e]/30">
                  <td className="py-4 px-4 text-white/70">Quality Score</td>
                  {models.map(model => (
                    <td key={model.id} className="text-center py-4 px-4 text-white font-medium">
                      {model.performance.quality}/100
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[#2a2a3e]/30">
                  <td className="py-4 px-4 text-white/70">Speed Score</td>
                  {models.map(model => (
                    <td key={model.id} className="text-center py-4 px-4 text-white font-medium">
                      {model.performance.speed}/100
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[#2a2a3e]/30">
                  <td className="py-4 px-4 text-white/70">Max Resolution</td>
                  {models.map(model => (
                    <td key={model.id} className="text-center py-4 px-4 text-white font-medium">
                      {model.specs.maxResolution}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-[#2a2a3e]/30">
                  <td className="py-4 px-4 text-white/70">Processing Time</td>
                  {models.map(model => (
                    <td key={model.id} className="text-center py-4 px-4 text-white font-medium">
                      {model.specs.processingTime}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 text-white/70">Best Use Case</td>
                  <td className="text-center py-4 px-4 text-white font-medium">Professional Work</td>
                  <td className="text-center py-4 px-4 text-white font-medium">High Quality</td>
                  <td className="text-center py-4 px-4 text-white font-medium">Balanced Usage</td>
                  <td className="text-center py-4 px-4 text-white font-medium">Quick Prototyping</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Experience HIBBI1?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Try our flagship AI model and discover the future of image generation.
              Advanced neural architecture meets intuitive design.
            </p>
            <a 
              href="/"
              className="inline-flex items-center px-8 py-4 bg-white text-[#4f46e5] rounded-2xl font-bold text-lg hover:bg-white/90 transition-colors"
            >
              Start Generating with HIBBI1
              <ArrowRight size={20} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}