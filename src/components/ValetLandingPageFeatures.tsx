import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Car, ShieldCheck, Users, Clock, CheckCircle2, XCircle,
  Building2, Hotel, Stethoscope, Sparkles, Utensils, Home,
  ArrowRight, Phone, Smartphone, Key, Award, BarChart3, AlertCircle
} from 'lucide-react';

interface VenueConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  multiplier: number;
  description: string;
  recommendedSupervisorRatio: string;
}

const VENUES: VenueConfig[] = [
  {
    id: 'corporate',
    name: 'Corporate & IT Park',
    icon: <Building2 className="w-5 h-5" />,
    multiplier: 1.0,
    description: 'High-volume morning peak ingress & evening egress flow management for tech hubs.',
    recommendedSupervisorRatio: '1 Lead per 150 vehicles'
  },
  {
    id: 'hotel',
    name: '5-Star Hotel & Resort',
    icon: <Hotel className="w-5 h-5" />,
    multiplier: 1.2,
    description: 'White-glove executive arrival protocol with luxury sedan & supercar handling.',
    recommendedSupervisorRatio: '1 Lead per 100 vehicles'
  },
  {
    id: 'hospital',
    name: 'Multi-Specialty Hospital',
    icon: <Stethoscope className="w-5 h-5" />,
    multiplier: 1.1,
    description: '24/7 rapid emergency driveway clearway & compassionate patient arrival care.',
    recommendedSupervisorRatio: '1 Lead per 120 vehicles'
  },
  {
    id: 'wedding',
    name: 'Wedding & Grand Gala',
    icon: <Sparkles className="w-5 h-5" />,
    multiplier: 1.3,
    description: 'Turnkey single-night high-density deployment with VIP priority bay allocation.',
    recommendedSupervisorRatio: '1 Lead per 80 vehicles'
  },
  {
    id: 'restaurant',
    name: 'Luxury Dining & Club',
    icon: <Utensils className="w-5 h-5" />,
    multiplier: 1.0,
    description: 'Nightly high-rotation driveway marshalling with organized key tag storage.',
    recommendedSupervisorRatio: '1 Lead per 100 vehicles'
  },
  {
    id: 'residential',
    name: 'Gated Apartment Estate',
    icon: <Home className="w-5 h-5" />,
    multiplier: 0.9,
    description: 'Resident & guest parking assistance, visitor log audit & perimeter lane safety.',
    recommendedSupervisorRatio: '1 Lead per 200 vehicles'
  }
];

const VEHICLE_TIERS = [
  { label: '50 Cars', count: 50 },
  { label: '150 Cars', count: 150 },
  { label: '300 Cars', count: 300 },
  { label: '500 Cars', count: 500 },
  { label: '1,000+ Cars', count: 1000 }
];

export default function ValetLandingPageFeatures() {
  const [selectedVenue, setSelectedVenue] = useState<string>('corporate');
  const [vehicleCount, setVehicleCount] = useState<number>(150);
  const [shiftType, setShiftType] = useState<'contract' | 'event'>('contract');

  const venue = VENUES.find(v => v.id === selectedVenue) || VENUES[0];

  // Calculations
  const baseDrivers = Math.ceil((vehicleCount / 25) * venue.multiplier);
  const totalSupervisors = Math.max(1, Math.ceil(vehicleCount / 120));
  const estimatedPodiums = Math.max(1, Math.ceil(vehicleCount / 200));

  return (
    <div className="space-y-16 sm:space-y-24 my-12">
      
      {/* 1. Interactive Valet Capacity & Proposal Estimator */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-blue-900/50 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-4 border border-blue-500/30">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Interactive Valet Requirement Calculator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Calculate Valet Deployment & SLA Specs for Your Venue
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Select your venue type and peak parking capacity to generate an instant estimate of uniformed chauffeurs, driveway supervisors, and podium setup requirements.
          </p>
        </div>

        {/* Venue Selector Tabs */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              1. Select Venue Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {VENUES.map((v) => {
                const isSelected = v.id === selectedVenue;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVenue(v.id)}
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col items-start gap-2 ${
                      isSelected
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                        : 'bg-gray-900/80 border-gray-800 text-gray-300 hover:border-gray-700 hover:bg-gray-800'
                    }`}
                  >
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-gray-800 text-blue-400'}`}>
                      {v.icon}
                    </div>
                    <span className="text-xs font-bold leading-tight">{v.name}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-blue-300/80 mt-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{venue.description}</span>
            </p>
          </div>

          {/* Vehicle Capacity Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-800">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                2. Peak Vehicle Volume
              </label>
              <div className="grid grid-cols-5 gap-2">
                {VEHICLE_TIERS.map((tier) => (
                  <button
                    key={tier.count}
                    onClick={() => setVehicleCount(tier.count)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition text-center ${
                      vehicleCount === tier.count
                        ? 'bg-blue-500 border-blue-300 text-white shadow'
                        : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                3. Engagement Model
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShiftType('contract')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                    shiftType === 'contract'
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>24/7 / Long-Term Contract</span>
                  <CheckCircle2 className={`w-4 h-4 ${shiftType === 'contract' ? 'opacity-100' : 'opacity-0'}`} />
                </button>
                <button
                  onClick={() => setShiftType('event')}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                    shiftType === 'event'
                      ? 'bg-blue-600 border-blue-400 text-white'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>Single-Day / Event Deployment</span>
                  <CheckCircle2 className={`w-4 h-4 ${shiftType === 'event' ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="bg-blue-950/60 border border-blue-800/80 rounded-2xl p-6 mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold mb-1">Recommended Chauffeurs</div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                {baseDrivers} <span className="text-xs font-normal text-gray-400">drivers</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Vetted & Uniformed</div>
            </div>

            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold mb-1">On-Site Supervision</div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                {totalSupervisors} <span className="text-xs font-normal text-gray-400">lead(s)</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">{venue.recommendedSupervisorRatio}</div>
            </div>

            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold mb-1">Podium & Key Desks</div>
              <div className="text-3xl font-black text-white flex items-baseline gap-1">
                {estimatedPodiums} <span className="text-xs font-normal text-gray-400">setup(s)</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Key Vault Lockers Included</div>
            </div>

            <div>
              <div className="text-xs text-blue-300 uppercase tracking-wider font-semibold mb-1">SLA Retrieval Time</div>
              <div className="text-3xl font-black text-emerald-400">&lt; 2.2 Min</div>
              <div className="text-[11px] text-emerald-300 mt-1">100% Insured Operations</div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>0.001% Insurance Claim Ratio & Comprehensive Liability Protection</span>
            </div>
            <Link
              to="/#quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm transition shadow-lg shadow-blue-600/30"
            >
              <span>Request Custom Proposal for {venue.name}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Technology & Operations Pillars */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>The ESS Premier Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Why ESS is Hyderabad's Preferred Premier Valet Parking Management Partner
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
            Eliminate long retrieval queues, misplaced keys, and liability worries with our structured driveway management & white-glove chauffeur standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 w-fit">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Secure Key Vault Lockers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Every vehicle key is systematically tagged and kept in a secure executive key locker, preventing lost keys or unauthorized access.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 w-fit">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Rapid Lane Clearance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Organized driveway lane architecture and swift runner teams ensure vehicles are returned smoothly with minimal guest wait times.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 w-fit">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">Luxury & EV Certified</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Drivers pass mandatory driving proficiency tests for luxury European sedans, supercars, keyless fobs, and electric vehicle (EV) systems.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-sm space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">0.001% Claim Ratio</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Industry-leading safety standards with an ultra-low 0.001% claim ratio, rigorous intake vehicle inspections, and complete insurance protection.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Sub-Services Interlinking Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Explore Targeted Premier Valet Solutions
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Specialized valet parking management tailored to specific industry requirements.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link
            to="/hotel-valet-services-hyderabad"
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs group"
          >
            <Hotel className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition">Hotel Valet</h4>
            <p className="text-xs text-gray-500 mt-1">5-Star & Luxury Resorts</p>
          </Link>

          <Link
            to="/corporate-valet-services-hyderabad"
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs group"
          >
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition">Corporate Valet</h4>
            <p className="text-xs text-gray-500 mt-1">IT Parks & Towers</p>
          </Link>

          <Link
            to="/restaurant-valet-services-hyderabad"
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs group"
          >
            <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition">Restaurant Valet</h4>
            <p className="text-xs text-gray-500 mt-1">Dining & Nightlife</p>
          </Link>

          <Link
            to="/event-valet-services-hyderabad"
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs group"
          >
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition">Event Valet</h4>
            <p className="text-xs text-gray-500 mt-1">Weddings & Galas</p>
          </Link>

          <Link
            to="/apartment-valet-services-hyderabad"
            className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs group"
          >
            <Home className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition">Apartment Valet</h4>
            <p className="text-xs text-gray-500 mt-1">Gated Communities</p>
          </Link>
        </div>
      </section>

    </div>
  );
}
