import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Car, 
  Sparkles, 
  Shield, 
  ShieldCheck, 
  Building2, 
  Bug, 
  Video, 
  Briefcase, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  slug: string;
  icon: React.ComponentType<any>;
  badge?: string;
  tagline: string;
}

const servicesList: ServiceItem[] = [
  {
    title: "Premium Valet Parking",
    tagline: "Prestigious Guest Parking Solutions",
    description: "Uniformed chauffeurs, key-vault safety, and efficient queue management for corporate sites, luxury hotels, and weddings.",
    slug: "/valet-parking-services-hyderabad",
    icon: Car,
    badge: "Flagship"
  },
  {
    title: "Corporate Housekeeping",
    tagline: "Standard-Setting Workspace Maintenance",
    description: "Daily janitorial care, pantry operations, and premium office hygiene audits tailored for tech parks and workspaces.",
    slug: "/housekeeping-services-hyderabad",
    icon: Sparkles,
    badge: "Core Service"
  },
  {
    title: "Commercial Deep Cleaning",
    tagline: "High-Precision Restorative Cleaning",
    description: "Mechanized hard-floor buffing, deep carpet shampooing, and clinical-grade sanitation using advanced equipment.",
    slug: "/deep-cleaning-services-hyderabad",
    icon: ShieldCheck,
    badge: "Core Service"
  },
  {
    title: "Facade Cleaning Services",
    tagline: "Certified Rope-Access Exterior Care",
    description: "Professional exterior window, glass pane, and composite panel cleaning conforming to strict safety standards.",
    slug: "/facade-cleaning-services-hyderabad",
    icon: Building2
  },
  {
    title: "CCTV Remote Surveillance",
    tagline: "24/7 Security Operations Monitoring",
    description: "Real-time electronic perimeter surveillance, RFID logs, and dynamic security escalation frameworks.",
    slug: "/cctv-monitoring-services-hyderabad",
    icon: Video
  },
  {
    title: "Professional Pest Control",
    tagline: "Eco-Safe Pest Eradication Solutions",
    description: "Clinical-grade treatment and prevention of rodents, termites, and insects using non-hazardous chemicals.",
    slug: "/pest-control-services-hyderabad",
    icon: Bug
  },
  {
    title: "Facility Manpower Supply",
    tagline: "Vetted & Trained Corporate Support",
    description: "Seamless deployment of qualified front-desk receptionists, office assistants, utility operators, and floor supervisors.",
    slug: "/manpower-supply-services-hyderabad",
    icon: Briefcase
  }
];

export default function ServicesOverview() {
  return (
    <section 
      id="services-overview" 
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 border-b border-gray-150 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-100 dark:border-blue-900/30"
          >
            <span>Our Flagship Solutions</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Premium Valet & Facility Management
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed"
          >
            Spearheaded by our flagship premium valet parking management, followed by class-leading facility housekeeping, deep cleaning, and elite corporate support.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between bg-white dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-400/20 transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                <div>
                  {/* Icon & Badge Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100/60 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/20 dark:border-blue-800/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wide">
                    {service.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {service.slug === "/valet-parking-services-hyderabad" && (
                    <div className="mt-4 mb-4 pt-4 border-t border-gray-100 dark:border-gray-800/60">
                      <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Specialized Valet Hubs:</p>
                      <div className="flex flex-wrap gap-1.5">
                        <Link to="/hotel-valet-services-hyderabad" className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Hotel Valet</Link>
                        <Link to="/corporate-valet-services-hyderabad" className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Corporate</Link>
                        <Link to="/restaurant-valet-services-hyderabad" className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Restaurant</Link>
                        <Link to="/event-valet-services-hyderabad" className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Events</Link>
                        <Link to="/apartment-valet-services-hyderabad" className="text-[11px] font-semibold bg-gray-50 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-blue-950/40 px-2 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Apartments</Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between">
                  <Link 
                    to={service.slug}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                  >
                    Explore Service
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Need a tailored facility management package?{" "}
            <a 
              href="#quote" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              Get a customized quote <ChevronRight className="w-4 h-4" />
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
