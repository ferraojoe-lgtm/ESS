import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Car, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Video, 
  ArrowRight, 
  CheckCircle, 
  ChevronRight 
} from 'lucide-react';

// Import images from assets
import valetParkingImg from '../assets/images/valet_parking_1781855291603.jpg';
import corporateHousekeepingImg from '../assets/images/residential_cleaning_1781855280260.jpg';
import commercialDeepCleaningImg from '../assets/images/commercial_cleaning_1781855263646.jpg';
import facadeCleaningImg from '../assets/images/rope_access_facade_1784612897724.jpg';
import cctvSurveillanceImg from '../assets/images/cctv_surveillance_1784612916709.jpg';

interface ServiceCardData {
  title: string;
  tagline: string;
  description: string;
  slug: string;
  icon: React.ComponentType<any>;
  image: string;
  badge: string;
  gradient: string;
  glowColor: string;
}

const servicesData: ServiceCardData[] = [
  {
    title: "Premium Valet Parking",
    tagline: "Prestigious Guest Parking Solutions",
    description: "Uniformed chauffeurs, key-vault safety, and efficient queue management for corporate sites, luxury hotels, and weddings.",
    slug: "/valet-parking-services-hyderabad",
    icon: Car,
    image: valetParkingImg,
    badge: "ESS Elite Valet",
    gradient: "from-slate-900 via-indigo-950 to-indigo-900",
    glowColor: "rgba(99, 102, 241, 0.4)"
  },
  {
    title: "Corporate Housekeeping",
    tagline: "Standard-Setting Workspace Maintenance",
    description: "Daily janitorial care, pantry operations, and premium office hygiene audits tailored for tech parks and corporate workspaces.",
    slug: "/housekeeping-services-hyderabad",
    icon: Sparkles,
    image: corporateHousekeepingImg,
    badge: "5-Star Sanitation",
    gradient: "from-teal-950 via-emerald-950 to-emerald-900",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    title: "Commercial Deep Cleaning",
    tagline: "High-Precision Restorative Cleaning",
    description: "Mechanized hard-floor buffing, deep carpet shampooing, and clinical-grade sanitation using advanced high-tech machinery.",
    slug: "/deep-cleaning-services-hyderabad",
    icon: ShieldCheck,
    image: commercialDeepCleaningImg,
    badge: "High-Tech Deep Clean",
    gradient: "from-blue-950 via-cyan-950 to-cyan-900",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  {
    title: "Facade Cleaning Services",
    tagline: "Certified Rope-Access Exterior Care",
    description: "Professional exterior window, glass pane, and composite panel cleaning conforming to strict international height safety standards.",
    slug: "/facade-cleaning-services-hyderabad",
    icon: Building2,
    image: facadeCleaningImg,
    badge: "IRATA Certified",
    gradient: "from-purple-950 via-violet-950 to-indigo-950",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  {
    title: "CCTV Remote Surveillance",
    tagline: "24/7 Security Operations Monitoring",
    description: "Real-time electronic perimeter surveillance, RFID logs, instant dispatcher alerts, and dynamic security escalation frameworks.",
    slug: "/cctv-monitoring-services-hyderabad",
    icon: Video,
    image: cctvSurveillanceImg,
    badge: "24/7 Shield Secure",
    gradient: "from-zinc-950 via-neutral-900 to-rose-950/40",
    glowColor: "rgba(239, 68, 68, 0.4)"
  }
];

export default function InteractiveServicesShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="py-24 bg-gray-950 text-white overflow-hidden border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-500/20"
          >
            <span>Interactive Experience</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Our Flagship Services Showcase
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg leading-relaxed"
          >
            Move your cursor over the panels on the right to smoothly expand each elite service and explore our certified commercial standards.
          </motion.p>
        </div>

        {/* Desktop Interactive Row (hidden on mobile, shown on md and larger) */}
        <div className="hidden md:flex flex-row h-[500px] w-full gap-4 relative">
          {servicesData.map((service, index) => {
            const isActive = activeIndex === index;
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.slug}
                animate={{ 
                  flex: isActive ? 5.2 : 0.9,
                  boxShadow: isActive ? `0 10px 40px -10px ${service.glowColor}` : 'none'
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 180, 
                  damping: 24, 
                  mass: 0.9 
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-3xl cursor-pointer border ${
                  isActive 
                    ? "border-white/20" 
                    : "border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
                } bg-gradient-to-br ${service.gradient} h-full transition-colors duration-300`}
              >
                {/* Collapsed view wrapper */}
                <AnimatePresence mode="wait">
                  {!isActive ? (
                    <motion.div
                      key="collapsed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col items-center justify-between py-10 px-2 h-full w-full select-none"
                    >
                      {/* Icon on top of vertical stripe */}
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center shadow-inner">
                        <IconComponent className="w-5 h-5 text-gray-300" />
                      </div>
                      
                      {/* Rotated text reading bottom-to-top */}
                      <div className="flex-1 flex items-center justify-center my-6">
                        <span className="[writing-mode:vertical-lr] rotate-180 font-bold tracking-widest text-[13px] text-gray-300/90 uppercase whitespace-nowrap">
                          {service.title}
                        </span>
                      </div>
                      
                      {/* Dynamic numbers inside stripe bottom */}
                      <span className="text-sm font-mono font-bold text-gray-500">
                        0{index + 1}
                      </span>
                    </motion.div>
                  ) : (
                    // Expanded view wrapper
                    <motion.div
                      key="expanded"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 flex p-8 sm:p-10 h-full w-full gap-8 items-center"
                    >
                      {/* Left: Text Contents */}
                      <div className="flex-1 flex flex-col justify-between h-full max-w-[50%]">
                        <div>
                          {/* Badge/Tag */}
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/10 text-[11px] font-extrabold uppercase tracking-widest mb-6">
                            <IconComponent className="w-3.5 h-3.5" />
                            <span>{service.title}</span>
                          </div>

                          {/* Tagline / Subtitle */}
                          <h4 className="text-xl lg:text-2xl font-semibold text-blue-400 mb-2 uppercase tracking-wide">
                            {service.tagline}
                          </h4>

                          {/* Large Display Title */}
                          <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            {service.title}
                          </h3>

                          {/* Description Paragraph */}
                          <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-6">
                            {service.description}
                          </p>
                        </div>

                        {/* CTA Button styled like the "Find ->" button in reference */}
                        <div className="mt-auto">
                          <Link 
                            to={service.slug}
                            className="inline-flex items-center gap-2.5 bg-black hover:bg-neutral-900 border border-neutral-800 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-black/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
                          >
                            <span>Explore Details</span>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Premium Rounded Corner Image */}
                      <div className="flex-1 h-full relative rounded-2xl overflow-hidden shadow-2xl">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        {/* Floating Image Label Badge */}
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-bold shadow-lg">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                          <span>{service.badge}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Accordion View (shown on mobile, hidden on md and larger) */}
        <div className="flex md:hidden flex-col gap-4">
          {servicesData.map((service, index) => {
            const isActive = activeIndex === index;
            const IconComponent = service.icon;

            return (
              <div
                key={service.slug}
                className={`border border-white/5 rounded-2xl overflow-hidden bg-gradient-to-br ${service.gradient}`}
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left border-none bg-transparent outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{service.title}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wide mt-0.5">{service.tagline}</p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isActive ? "rotate-90 text-blue-400" : ""
                    }`} 
                  />
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5"
                    >
                      <div className="p-5 flex flex-col gap-4">
                        {/* Interactive Image */}
                        <div className="relative h-48 w-full rounded-xl overflow-hidden">
                          <img 
                            src={service.image} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-white px-2.5 py-1 rounded-full inline-flex items-center gap-1 text-[10px] font-bold">
                            <CheckCircle className="w-3 h-3 text-blue-400" />
                            <span>{service.badge}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {service.description}
                        </p>

                        {/* CTA */}
                        <div>
                          <Link 
                            to={service.slug}
                            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-900 border border-neutral-800 text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all"
                          >
                            <span>Explore Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
