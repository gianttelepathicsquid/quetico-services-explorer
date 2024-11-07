'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  BoxesIcon,
  ClipboardList,
  Warehouse,
  BarChart,
  Settings,
  ArrowRight,
  CircleDot
} from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    features: string[];
  };
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className={`transform transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`bg-white rounded-lg p-6 cursor-pointer border border-gray-200 transition-all duration-300 ${
          isExpanded ? 'shadow-xl' : 'shadow-md hover:shadow-lg'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`bg-[#00204E] p-3 rounded-lg transform transition-all duration-300 ${
            isHovered ? 'rotate-12' : ''
          }`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#00204E]">{service.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className={`space-y-3 transition-all duration-500 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          {service.features.map((feature, idx) => (
            <div 
              key={idx}
              className={`flex items-center gap-2 text-gray-600 transform transition-all duration-300 ${
                isExpanded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <CircleDot className="h-4 w-4 text-sky-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ServicesExplorer = () => {
  const [visibleServices, setVisibleServices] = useState<boolean[]>([]);
  const [showCTA, setShowCTA] = useState(false);

  const services = [
    {
      id: 'receiving',
      title: 'Receiving',
      description: 'Methodical, repeatable, and scalable process ensuring operational excellence.',
      icon: Package,
      features: [
        'Systematic inbound processing',
        'Quality control checks',
        'Scalable operations',
        'Real-time tracking'
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      description: 'Advanced tracking and reporting for informed inventory decisions.',
      icon: BoxesIcon,
      features: [
        'Real-time inventory visibility',
        'Automated tracking systems',
        'Custom reporting solutions',
        'Stock level optimization'
      ]
    },
    {
      id: 'fulfillment',
      title: 'Fulfillment',
      description: 'Streamlined and automated process for quick, accurate order delivery.',
      icon: ClipboardList,
      features: [
        'Automated order processing',
        'Accuracy verification',
        'Quick turnaround times',
        'Order status tracking'
      ]
    },
    {
      id: 'warehousing',
      title: 'Warehousing',
      description: 'Efficient distribution and fulfillment center solutions.',
      icon: Warehouse,
      features: [
        'Strategic layout optimization',
        'Climate-controlled storage',
        'Security monitoring',
        'Flexible space allocation'
      ]
    },
    {
      id: 'reporting',
      title: 'Reporting',
      description: 'Real-time visibility and automation through advanced software.',
      icon: BarChart,
      features: [
        'Custom report generation',
        'Real-time analytics',
        'Performance metrics',
        'Data-driven insights'
      ]
    },
    {
      id: 'value-added',
      title: 'Value-Added Services',
      description: 'Customized solutions tailored to your unique operational needs.',
      icon: Settings,
      features: [
        'Custom packaging',
        'Product assembly',
        'Quality inspections',
        'Special handling'
      ]
    }
  ];

  useEffect(() => {
    const timeouts = services.map((_, index) => {
      return setTimeout(() => {
        setVisibleServices(prev => [...prev, true]);
      }, index * 200);
    });

    setTimeout(() => {
      setShowCTA(true);
    }, services.length * 200 + 500);

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Package className="h-12 w-12 text-[#00204E] animate-pulse" />
              <div className="absolute inset-0 bg-[#00204E] rounded-full opacity-20 animate-ping" />
            </div>
            <h1 className="text-3xl font-bold text-[#00204E]">
              Quetico 3PL Services
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive third-party logistics solutions designed to optimize your supply chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              isVisible={visibleServices[index]}
            />
          ))}
        </div>

        <div className={`transform transition-all duration-500 ${
          showCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="bg-[#00204E] rounded-xl p-8 text-center text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Supply Chain?</h2>
            <p className="mb-6 text-gray-300 max-w-2xl mx-auto">
              Let's discuss how Quetico's expertise can transform your logistics operations.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className="bg-sky-400 text-[#00204E] px-8 py-4 rounded-lg font-semibold hover:bg-sky-300 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesExplorer;
