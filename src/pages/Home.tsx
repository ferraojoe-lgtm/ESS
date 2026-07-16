import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Sparkles, Building2, Car, Shield, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, ChevronDown, Clock, Star, Wrench, Quote, Users, Award, Heart, Leaf, Briefcase, UserCheck, Headphones, Target, Compass, Video, Lock, AlertCircle, Hotel, Key, Calendar, Bell, Eye, Fingerprint, CreditCard, Cpu, Coffee, Bug, Phone, ExternalLink, Search, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { SERVICES } from '../lib/constants';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';
import founderSignature from '../assets/images/regenerated_image_1782636904447.png';
import haseebTeamPortrait from '../assets/images/regenerated_image_1782899971595.jpg';
import ServicesOverview from '../components/ServicesOverview';

function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section id="home" className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="https://res.cloudinary.com/deed9nqtg/video/upload/f_auto,q_auto/v1781854154/Man_in_waistcoat_beside_SUV_202606191258_vtqbmj.jpg"
          className="w-full h-full object-cover object-center scale-100 md:scale-[1.25] md:origin-top-left"
        >
          <source src="https://res.cloudinary.com/deed9nqtg/video/upload/v1781854154/Man_in_waistcoat_beside_SUV_202606191258_vtqbmj.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-950/50 mix-blend-overlay transition-colors duration-300"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-28 relative z-10 min-h-[calc(100vh-140px)] flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto pt-[120px] pl-[1px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/90 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-800/50 shadow-[0_2px_12px_rgba(59,130,246,0.15)] mb-8 backdrop-blur-md select-none font-sans"
            style={{ fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700 }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-500 dark:text-yellow-400 fill-current" /> {t('hero', 'badge')}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bold text-gray-900 dark:text-white tracking-tight leading-[1.12] mb-3 max-w-4xl mx-auto drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]"
            style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '41.56px', fontWeight: 800 }}
          >
            {t('hero', 'title')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-8 max-w-3xl mx-auto leading-snug tracking-normal drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]"
          >
            {t('hero', 'subtitle')}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3.5 mb-10 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-md text-left transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">✓</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Premium Valet Management</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-md text-left transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">✓</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Corporate Housekeeping</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gray-200/80 dark:border-gray-800 shadow-md text-left transition-all duration-300 hover:scale-105 hover:border-blue-400/50">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">✓</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Mechanized Deep Cleaning</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
          >
            <a 
              href="#quote" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {t('hero', 'cta1')} <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="tel:+917386843005" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl text-base font-bold border-2 border-blue-600/30 dark:border-blue-400/30 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-600 dark:hover:border-blue-400 transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4" /> <span>Call Now</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-800 dark:text-gray-200"
          >
            <span className="flex items-center gap-1.5">🌟 100% SLA Compliance</span>
            <span className="text-gray-400">•</span>
            <span className="flex items-center gap-1.5">👥 100% Vetted Personnel</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative z-10 py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div id="company-profile" className="mb-12 text-center max-w-3xl mx-auto scroll-mt-36">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Us</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We provide elite <strong className="font-extrabold text-blue-600 dark:text-blue-400">valet parking management</strong>, followed by standard-setting corporate housekeeping, commercial deep cleaning, and integrated facility services across Hyderabad and Telangana.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our experienced team guarantees a flawless guest arrival experience, premium vehicle safety, and spotless spaces. From luxury hotels and corporate parks to grand events, we ensure your premises run flawlessly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="https://www.google.com/maps/place/Expert+Standard+Solutions/@17.3702316,78.4292811,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97b7add5cf97:0x5f72af4fca71e669!8m2!3d17.3702316!4d78.4292811"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-bold text-sm border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:dark:border-blue-500 hover:shadow-md transition duration-300 shadow-sm"
                  id="about-google-reviews-link"
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                  <span>View Our 4.9★ Google Reviews & Business Listing</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mission & Vision Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50/50 to-white dark:from-gray-900/40 dark:to-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full transition-all duration-300 group-hover:scale-110" />
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-2xl mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To deliver unparalleled valet parking hospitality, backed by premium, eco-friendly cleaning and integrated facility operations. We create safe, prestigious, and flawlessly run environments for businesses and guests alike.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50/30 to-white dark:from-gray-900/20 dark:to-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800/80 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-bl-full transition-all duration-300 group-hover:scale-110" />
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center rounded-2xl mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  To be Hyderabad's most trusted partner for premium facility services, known for our excellent quality, honest work, and long-term relationships with our clients.
                </p>
              </div>
            </div>

            {/* Founder's Message Section */}
            <div className="bg-slate-50 dark:bg-gray-900/40 p-8 md:p-12 rounded-3xl border border-gray-150 dark:border-gray-800/60 mb-16 relative overflow-hidden">
              <div className="absolute top-6 right-8 text-slate-200/50 dark:text-gray-800/30 select-none">
                <Quote className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3.5 py-1.5 rounded-full mb-6 inline-block">
                  Established in 2019
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Founder's Message</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                  <p style={{ fontFamily: '"Dancing Script", "Alex Brush", "Caveat", cursive' }} className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    "We started in 2019 with a simple goal: to provide high-quality, honest, and reliable facility and cleaning services that clients can trust completely."
                  </p>
                  <p style={{ fontFamily: '"Dancing Script", "Alex Brush", "Caveat", cursive' }} className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                    "Over the years, we have grown by working hard and keeping our promises. We don't just clean spaces; we create healthy, safe, and positive environments where your team can do their best work. Every day, our trained professionals on the ground deliver top-notch service. We are committed to being your most dependable partner, using green cleaning products and safe practices for a better tomorrow."
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 dark:border-gray-800 pt-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Mr. A Haseeb Khan</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Founder, Expert Standard Solution (ESS)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="professionals" className="text-center mb-8 scroll-mt-36">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Professionals at Work</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">A glimpse into our dedication to delivering <strong className="font-extrabold text-blue-600 dark:text-blue-400">spotless spaces</strong> and <strong className="font-extrabold text-blue-600 dark:text-blue-400">seamless services</strong>.</p>
            </div>
            <img 
              src="https://res.cloudinary.com/deed9nqtg/image/upload/f_auto,q_auto/v1781945292/Staff_Working_Images_p9rzkp.png"
              alt="Staff Working"
              width={1200}
              height={450} 
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 mb-6 w-full"
              style={{ objectFit: 'cover' }}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold mb-6">
              <Leaf className="w-4 h-4" /> Eco-Friendly & Carbon Neutral Operations
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-[24px]">500+</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-[16px]">Projects Completed</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-[24px]">100+</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-[16px]">Trained Staff</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-[24px]">50+</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-[16px]">Corporate Clients</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center rounded-xl">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-[24px]">24/7</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-[16px]">Support</span>
                </div>
              </div>
            </div>

            {/* Service Excellence Section */}
            <div id="service-excellence" className="mt-20 scroll-mt-36 bg-blue-50/60 dark:bg-blue-950/20 p-8 md:p-12 rounded-3xl border border-blue-100 dark:border-blue-900/40 text-left shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Service Excellence</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                We promise top-quality service. We use simple checklists and regular quality checks to guarantee <strong className="font-extrabold text-blue-600 dark:text-blue-400">spotless spaces</strong>, <strong className="font-extrabold text-blue-600 dark:text-blue-400">seamless service</strong>, smooth valet parking, and reliable help whenever you need it.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Spotless Delivery</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rigorous multi-stage site inspections on every single shift.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Tailored SLAs</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Customized service level agreements built around your exact corporate timings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Rapid Escalation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dedicated supervisory concierge for immediate query resolution.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health & Safety Section */}
            <div id="health-safety" className="mt-16 scroll-mt-36 bg-green-50/60 dark:bg-green-950/20 p-8 md:p-12 rounded-3xl border border-green-100 dark:border-green-900/40 text-left shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-md">
                  <Shield className="w-7 h-7" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Health & Safety</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                Safety is non-negotiable. We maintain uncompromising occupational health and safety benchmarks across all residential, banquet, and corporate sites.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Prevention</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Proactive Prevention</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">We inspect every site to find and fix any safety hazards before our team starts working.</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Protection</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Maximum Protection</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">Our team always wears protective gear, uses safe cleaning products, and keeps keys secure.</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Excellence</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Safety Excellence</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">We keep spaces clean and disinfected to the highest standards without taking shortcuts.</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Support</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Dedicated Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">We have round-the-clock supervisors ready to help and respond to any urgent requests.</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Compliance</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Full Statutory Compliance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">We follow all local laws, treat our staff fairly, and use eco-friendly practices.</p>
                </div>
                <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-2xl shadow-sm border border-green-200/60 dark:border-green-800/40 hover:shadow-md transition">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-md mb-3 inline-block">Continual Improvement</span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Continual Improvement</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">We train our staff regularly and use the latest safe, eco-friendly equipment.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Clients Section has been modularized and moved to /src/components/TrustedClients.tsx



function QuoteRequestSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentLang, setConsentLang] = useState<'en' | 'hi' | 'te'>('en');
  const [userIp, setUserIp] = useState<string>('Unknown');

  useEffect(() => {
    let active = true;
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        if (active) {
          setUserIp(data.ip || 'Unknown');
        }
      })
      .catch(() => {
        if (!active) return;
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (active) {
              setUserIp(data.ip || 'Unknown');
            }
          })
          .catch(() => {
            if (active) {
              setUserIp('Unknown');
            }
          });
      });
    return () => {
      active = false;
    };
  }, []);

  const [values, setValues] = useState({
    clientName: '',
    phone: '',
    email: '',
    serviceType: '',
    details: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'clientName') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 2) {
        error = 'Full name must be at least 2 characters';
      }
    } else if (name === 'phone') {
      const phoneRegex = /^\+?[0-9\s\-()]{10,15}$/;
      if (!value.trim()) {
        error = 'Phone number is required';
      } else if (!phoneRegex.test(value.trim())) {
        error = 'Please enter a valid phone number (10-15 digits)';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = 'Email address is required';
      } else if (!emailRegex.test(value.trim())) {
        error = 'Please enter a valid email address';
      }
    } else if (name === 'serviceType') {
      if (!value) {
        error = 'Please select a service';
      }
    } else if (name === 'details') {
      if (!value.trim()) {
        error = 'Additional details are required';
      } else if (value.trim().length < 10) {
        error = 'Please provide at least 10 characters of details';
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name] || submitted) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors: Record<string, string> = {};
    let hasErrors = false;
    
    Object.entries(values).forEach(([name, value]) => {
      const error = validateField(name, value as string);
      if (error) {
        newErrors[name] = error;
        hasErrors = true;
      }
    });

    if (!consentChecked) {
      newErrors['consentChecked'] = 'You must consent to data processing under the DPDP Act 2023';
      hasErrors = true;
    }

    setErrors(newErrors);

    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (hasErrors) {
      const firstErrorField = Object.keys(newErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    setLoading(true);

    try {
      const consentTextMap = {
        en: "I explicitly consent to Expert Standard Solution (Data Fiduciary) processing my contact details and service requirements to provide quotes in accordance with the Digital Personal Data Protection (DPDP) Act, 2023 and the Privacy Policy.",
        hi: "मैं डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम, 2023 और गोपनीयता नीति के अनुसार उद्धरण प्रदान करने के लिए मेरे संपर्क विवरण और सेवा आवश्यकताओं को संसाधित करने के लिए एक्सपर्ट स्टैंडर्ड सॉल्यूशन (डेटा फिडुशियरी) को अपनी स्पष्ट सहमति प्रदान करता/करती हूँ।",
        te: "డిజిటల్ వ్యక్తిగత డేటా రక్షణ (DPDP) చట్టం, 2023 మరియు గోప్యతా విధానానికి అనుగుణంగా కొటేషన్లను అందించడానికి నా సంప్రదింపు వివరాలు మరియు సేవా అవసరాలను ప్రాసెస్ చేయడానికి ఎక్స్‌పర్ట్ స్టాండర్డ్ సొల్యూషన్ (డేటా ఫిడూషియరీ) కి నేను స్పష్టమైన సమ్మతిని తెలియజేస్తున్నాను।"
      };

      const consentLogData = {
        clientName: values.clientName,
        email: values.email,
        phone: values.phone,
        type: 'quote_consent_opt_in',
        consentTimestamp: new Date().toISOString(),
        consentIp: userIp,
        consentLanguage: consentLang,
        consentVersion: 'DPDP_2023_V1',
        consentText: consentTextMap[consentLang],
        userAgent: navigator.userAgent,
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      };

      await addDoc(collection(db, 'submissions'), {
        ...values,
        type: 'quote',
        status: 'Pending',
        billingAmount: 0,
        billingStatus: 'Unpaid',
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp(),
        consentLog: consentLogData
      });

      // Maintain an independent, clean, auditable consent compliance trail
      try {
        await addDoc(collection(db, 'consent_logs'), consentLogData);
      } catch (logError) {
        console.error('Failed to log independent consent compliance entry:', logError);
      }

      // Dispatch real email notification to admin
      try {
        await fetch('/api/requests/notify-quote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
      } catch (notifyError) {
        console.error('Failed to send email notification:', notifyError);
      }
      
      setSuccess(true);
      setValues({
        clientName: '',
        phone: '',
        email: '',
        serviceType: '',
        details: ''
      });
      setConsentChecked(false);
      setErrors({});
      setTouched({});
      setSubmitted(false);
    } catch (error) {
      console.error('Failed to submit quote request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote" className="py-24 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/deed9nqtg/video/upload/q_auto,f_auto/v1781856017/Businessman_interacting_with_hol__202606191330_emp0au.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/80 backdrop-blur-[2px] transition-colors duration-300"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Request a Professional Quote</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Get an accurate estimate tailored to your specific requirements. We respond to all inquiries within 24 business hours.
            </p>
            
            <div className="space-y-6">
              {[
                "Customized service plans",
                "Transparent, real-time tracking via dashboard",
                "Automated email updates",
                "Secure and professional execution"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-blue-50 dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-gray-800 flex gap-4 transition-colors duration-300">
              <Star className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Top Rated in Hyderabad</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Rated 4.8/5 on JustDial and 4.9/5 on Google Reviews for our prompt and professional services.</p>
                <a 
                  href="https://www.google.com/maps/place/Expert+Standard+Solutions/@17.3702316,78.4292811,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97b7add5cf97:0x5f72af4fca71e669!8m2!3d17.3702316!4d78.4292811" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1.5 text-xs"
                >
                  View on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-4 p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex gap-4 transition-colors duration-300">
              <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0 animate-pulse" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Direct Contact</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
                  <p><strong>Phone:</strong> <a href="tel:+917386843005" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">+91 73868 43005</a></p>
                  <p><strong>Email:</strong> <a href="mailto:info@expertstandardsolution.com" className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">info@expertstandardsolution.com</a></p>
                </div>
                <a
                  href="https://wa.me/917386843005?text=Hello%20Expert%20Standard%20Solution%21%20I%20am%20interested%20in%20learning%20more%20about%20your%20premium%20valet%20and%20facility%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F7469] hover:bg-[#0a544c] text-white font-bold text-xs shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  Live Chat Support (WhatsApp)
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 p-8 transition-colors duration-300">
            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center rounded-full mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Received!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">We've sent a confirmation to your email. Our team will review your requirements and provide a quote soon.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="text-blue-600 font-semibold hover:text-blue-500 cursor-pointer"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input 
                      id="clientName" 
                      name="clientName" 
                      type="text" 
                      value={values.clientName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. John Doe" 
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl border outline-none transition bg-white dark:bg-gray-800 dark:text-white",
                        errors.clientName && touched.clientName 
                          ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950" 
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                      )}
                    />
                    {errors.clientName && touched.clientName && (
                      <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.clientName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. +91 98765 43210" 
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl border outline-none transition bg-white dark:bg-gray-800 dark:text-white",
                        errors.phone && touched.phone 
                          ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950" 
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                      )}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. john@example.com" 
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border outline-none transition bg-white dark:bg-gray-800 dark:text-white",
                      errors.email && touched.email 
                        ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950" 
                        : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                    )}
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Service Required</label>
                  <div className="relative">
                    <select 
                      id="serviceType" 
                      name="serviceType" 
                      value={values.serviceType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={cn(
                        "w-full px-4 py-2.5 rounded-xl border outline-none transition appearance-none bg-white dark:bg-gray-800 dark:text-white pr-10",
                        errors.serviceType && touched.serviceType 
                          ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950" 
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                      )}
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map(srv => <option key={srv} value={srv}>{srv}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.serviceType && touched.serviceType && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Additional Details</label>
                  <textarea 
                    id="details" 
                    name="details" 
                    rows={4} 
                    value={values.details}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={cn(
                      "w-full px-4 py-2.5 rounded-xl border outline-none transition resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 dark:text-white",
                      errors.details && touched.details 
                        ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950" 
                        : "border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30"
                    )}
                    placeholder="Please describe the size of the area, event details, or specific requirements..."
                  />
                  {errors.details && touched.details && (
                    <p className="text-xs text-rose-500 mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.details}
                    </p>
                  )}
                </div>

                {/* DPDP Act 2023 Compliant Consent Checkbox */}
                <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800/50 pb-2">
                    <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                      Consent Notice Language / సమ్మతి భాష / सहमति भाषा
                    </span>
                    <div className="flex bg-white dark:bg-gray-800 rounded-lg p-0.5 border border-gray-200 dark:border-gray-700 shadow-sm self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setConsentLang('en')}
                        className={cn(
                          "px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer border-none outline-none",
                          consentLang === 'en'
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                        )}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsentLang('hi')}
                        className={cn(
                          "px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer border-none outline-none",
                          consentLang === 'hi'
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                        )}
                      >
                        हिन्दी
                      </button>
                      <button
                        type="button"
                        onClick={() => setConsentLang('te')}
                        className={cn(
                          "px-2.5 py-1 text-xs rounded-md transition font-medium cursor-pointer border-none outline-none",
                          consentLang === 'te'
                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                            : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                        )}
                      >
                        తెలుగు
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consentChecked"
                      name="consentChecked"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      required
                      className="mt-1 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-700 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="consentChecked" className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
                      {consentLang === 'en' && (
                        <>
                          I explicitly consent to Expert Standard Solution (Data Fiduciary) processing my contact details and service requirements to provide quotes in accordance with the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong> and the <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">Privacy Policy</Link>.
                        </>
                      )}
                      {consentLang === 'hi' && (
                        <>
                          मैं डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम, 2023 और <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">गोपनीयता नीति</Link> के अनुसार उद्धरण (quotes) प्रदान करने के लिए मेरे संपर्क विवरण और सेवा आवश्यकताओं को संसाधित करने के लिए एक्सपर्ट स्टैंडर्ड सॉल्यूशन (डेटा फिडुशियरी) को अपनी स्पष्ट सहमति प्रदान करता/करती हूँ।
                        </>
                      )}
                      {consentLang === 'te' && (
                        <>
                          డిజిటల్ వ్యక్తిగత డేటా రక్షణ (DPDP) చట్టం, 2023 మరియు <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium">గోప్యతా విధానానికి</Link> అనుగుణంగా కొటేషన్లను అందించడానికి నా సంప్రదింపు వివరాలు మరియు సేవా అవసరాలను ప్రాసెస్ చేయడానికి ఎక్స్‌పర్ట్ స్టాండర్డ్ సొల్యూషన్ (డేటా ఫిడూషియరీ) కి నేను స్పష్టమైన సమ్మతిని తెలియజేస్తున్నాను.
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {errors.consentChecked && submitted && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.consentChecked}
                  </p>
                )}

                <button 
                  disabled={loading}
                  type="submit" 
                  className={cn(
                    "w-full py-3.5 rounded-xl text-white font-semibold transition shadow-sm cursor-pointer border-none outline-none",
                    loading ? "bg-gray-400 dark:bg-gray-700 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow"
                  )}
                >
                  {loading ? 'Submitting...' : 'Request Quote Now'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqCategories = [
    { id: 'all', label: 'All Questions' },
    { id: 'facility', label: 'Facility Management' },
    { id: 'cleaning', label: 'Housekeeping & Cleaning' },
    { id: 'valet', label: 'Valet & Parking' },
    { id: 'staffing', label: 'Manpower & Safety' }
  ];

  const faqs = [
    {
      question: "How much does deep cleaning cost?",
      answer: "Deep cleaning costs vary depending on the size of your facility, property type, and specific cleaning requirements. We offer customized quotes following a brief consultation or site inspection to ensure you get the best value.",
      category: "cleaning"
    },
    {
      question: "Do you provide verified manpower?",
      answer: "Yes, we provide reliable and verified manpower solutions across various industries, including skilled and unskilled labor, corporate housekeepers, administrative support, facility stewards, and event staff. Every candidate undergoes rigorous vetting, background checks, and standard training.",
      category: "staffing"
    },
    {
      question: "Do you serve gated communities?",
      answer: "Yes, we offer comprehensive facility management, commercial cleaning, pantry management, landscaping, and maintenance services tailored specifically for high-end residential societies and gated communities.",
      category: "facility"
    },
    {
      question: "What is your typical onboarding process for a new corporate contract?",
      answer: "We begin with a thorough site survey to assess your facility's specific requirements, followed by drafting a customized SLA (Service Level Agreement). Upon agreement, we assign a dedicated supervisor, deploy trained on-site stewards, and execute seamless transition handovers within 7 to 10 working days.",
      category: "facility"
    },
    {
      question: "What kind of cleaning materials and equipment do you use?",
      answer: "We use premium-grade, eco-friendly, and ISO-certified cleaning chemicals (such as Taski/Diversey). Our modern equipment checklist includes industrial ride-on scrubbers, high-pressure washers, single-disc scrubbing machines, and specialized vacuum cleaners for absolute sanitization.",
      category: "cleaning"
    },
    {
      question: "Are your valet drivers trained and licensed?",
      answer: "Absolutely. Every driver undergoes comprehensive background verification, holds a valid heavy/light motor vehicle license, and undergoes formal training in professional hospitality etiquette, safe parking practices, and handling high-end automatic/manual luxury cars.",
      category: "valet"
    },
    {
      question: "How do you manage valet keys and vehicle security?",
      answer: "We utilize secure, centralized key management lockers monitored by CCTV. Keys are tagged with customized IDs corresponding to vehicle tokens, ensuring safe retrieval. We also maintain public liability insurance for complete peace of mind.",
      category: "valet"
    },
    {
      question: "How do you handle staff absenteeism to ensure continuity?",
      answer: "We maintain a 15% backup buffer force of trained, on-call personnel. If an on-site steward or supervisor is absent, our operations desk automatically deploys an equivalent replacement within 2 hours to ensure uninterrupted operations.",
      category: "staffing"
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset open accordion item on category change or search change to avoid mismatching indices
  useEffect(() => {
    setOpenIndex(null);
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors duration-300 relative overflow-hidden" id="faq-section">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-100/30 dark:bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4 animate-bounce" />
            <span>Common Queries Answered</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find instant answers to everything you need to know about our premier facility management services, housekeeping, and staffing standards.
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs (e.g., deep cleaning, valet, backup)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm md:text-base shadow-sm"
              id="faq-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Categories Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition duration-300 cursor-pointer",
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white dark:bg-blue-500 dark:text-slate-950 shadow-md shadow-blue-600/15"
                    : "bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-800"
                )}
                id={`faq-cat-btn-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const globalIndex = faqs.findIndex(f => f.question === faq.question);
                const isOpen = openIndex === globalIndex;
                return (
                  <motion.div 
                    key={faq.question} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-950 transition-all duration-300 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                      id={`faq-btn-${globalIndex}`}
                    >
                      <span className="font-semibold text-gray-900 dark:text-white text-base md:text-lg pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center border border-gray-100 dark:border-gray-850">
                        <ChevronDown 
                          className={cn("w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300", isOpen && "rotate-180")} 
                        />
                      </span>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base border-t border-gray-50 dark:border-gray-900/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 px-4 border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl bg-white dark:bg-gray-950"
              >
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No FAQs match your search</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  We couldn't find any FAQs matching "{searchQuery}". Try refining your keywords or browse another category.
                </p>
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
                  id="faq-fallback-quote-btn"
                >
                  Ask us directly
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom CTA banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Have a different question about your specific site requirements?{' '}
            <a 
              href="#quote" 
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Get in touch with our operations team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TeamSection() {
  const team = [
    {
      name: "A Haseeb Khan",
      role: "Founder & Managing Partner",
      image: haseebTeamPortrait,
      bio: "As Founder & Managing Partner, A Haseeb Khan leads the company's vision, ensuring our standard of excellence is met on every single job while driving sustainable growth."
    },
    {
      name: "Parvin Shaikh",
      role: "Business Development Partner",
      image: "https://res.cloudinary.com/deed9nqtg/image/upload/f_auto,q_auto,w_280/v1781960576/WhatsApp_Image_2026-06-20_at_14.12.43_mwplyj.jpg",
      bio: "Parvin is the bridge between our services and our clients, driving strategic growth while ensuring that feedback is swiftly addressed and satisfaction is guaranteed."
    },
    {
      name: "Nawab Shaker",
      role: "Field Manager",
      image: "https://res.cloudinary.com/deed9nqtg/image/upload/f_auto,q_auto,w_280/v1782153885/Shakir_luk3nl.png",
      bio: "Leading our on-ground operations, Nawab ensures strict quality control and coordinates our dedicated staff across all sites to deliver top-tier service."
    },
    {
      name: "D Raghavi",
      role: "Office Manager",
      image: "https://res.cloudinary.com/deed9nqtg/image/upload/f_auto,q_auto,w_280/v1782415207/D_Ragavi_Office_Manager_rki96i.png",
      bio: "Managing daily administrative operations and coordination across departments, D Raghavi ensures a seamless experience for both staff and valued clients."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % team.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Leadership Team</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">The dedicated professionals working behind the scenes to deliver <strong className="font-extrabold text-blue-600 dark:text-blue-400">spotless spaces</strong> and <strong className="font-extrabold text-blue-600 dark:text-blue-400">seamless service</strong>.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col"
            >
              {member.image && (
                <div className="flex justify-center pt-8 bg-gray-50 dark:bg-gray-800">
                  <div className="bg-gray-200 dark:bg-gray-700 overflow-hidden relative border-4 border-white shadow-md rounded-2xl" style={{ width: '140px', height: '180px' }}>
                    <img 
                      src={member.image}
                      alt={member.name}
                      width={140}
                      height={180}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
              <div className="p-6 text-center flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p 
                  className={cn("text-blue-600 dark:text-blue-400 font-medium mb-4", index === 1 && "w-[256px] mx-auto")}
                  style={index === 0 ? { marginLeft: '-10px' } : undefined}
                >
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-[15px] leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Facility Manager, TechPark Towers",
    content: "Expert Standard Solution completely transformed our workspace. Their team is extremely professional and their attention to detail during commercial cleaning is unmatched.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Homeowner",
    content: "I've tried multiple cleaning services in Hyderabad, but their deep cleaning service is by far the best. The staff is polite, punctual, and highly efficient.",
    rating: 5,
  },
  {
    name: "Vikram Reddy",
    role: "Event Organizer",
    content: "We hired their valet services for our annual gala. They handled over 200 cars seamlessly. Highly recommend for any corporate or large-scale private events.",
    rating: 5,
  },
  {
    name: "Anita Desai",
    role: "Property Owner",
    content: "Their maintenance team is reliable and quick to respond. From minor repairs to regular upkeep, they take care of our properties with utmost professionalism.",
    rating: 4,
  }
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-6 sm:py-8 bg-gray-900 border-t border-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-4 relative z-10">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-0.5">What Our Clients Say</h2>
          <p className="text-gray-400 max-w-xl mx-auto text-xs">Trusted by businesses and homeowners across the city.</p>
        </div>
        
        <div className="relative max-w-2xl mx-auto z-10">
          <div className="absolute top-1/2 -left-4 sm:-left-10 -translate-y-1/2">
            <button 
              onClick={prevTestimonial}
              className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -right-4 sm:-right-10 -translate-y-1/2">
            <button 
              onClick={nextTestimonial}
              className="p-1 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors focus:outline-none cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-hidden px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
                className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 sm:p-5 text-center relative border border-gray-800"
              >
                <div className="absolute top-3 left-3 text-gray-700/50">
                  <Quote className="w-5 h-5" />
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn("w-3 h-3", i < testimonials[currentIndex].rating ? "fill-yellow-500 text-yellow-500" : "fill-gray-600 text-gray-600")} 
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl mx-auto mb-3 font-medium italic">
                  "{testimonials[currentIndex].content}"
                </p>
                <div>
                  <h3 className="font-semibold text-white text-xs sm:text-sm">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-400 text-[10px] mt-0.5">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-1 mt-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="w-6 h-6 flex items-center justify-center focus:outline-none cursor-pointer"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span
                  className={cn(
                    "rounded-full transition-all duration-300",
                    currentIndex === idx ? "bg-red-600 w-4 h-1" : "bg-gray-600 hover:bg-gray-500 w-1 h-1"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="bg-gray-800/40 border border-gray-800 rounded-2xl px-5 py-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-extrabold text-blue-600 shadow-inner text-xl">
                G
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-white">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-400">Google Customer Rating</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a 
                href="https://www.google.com/maps/place/Expert+Standard+Solutions/@17.3702316,78.4292811,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97b7add5cf97:0x5f72af4fca71e669!8m2!3d17.3702316!4d78.4292811"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition duration-300 shadow-md shadow-blue-600/10 hover:-translate-y-0.5"
                id="google-reviews-btn"
              >
                <Star className="w-3.5 h-3.5 fill-current text-yellow-400" />
                <span>Write a Review</span>
              </a>

              <a 
                href="https://www.google.com/maps/place/Expert+Standard+Solutions/@17.3702316,78.4292811,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97b7add5cf97:0x5f72af4fca71e669!8m2!3d17.3702316!4d78.4292811"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-750 text-gray-300 font-semibold text-xs transition duration-300 border border-gray-750"
                id="view-all-google-reviews-btn"
              >
                <span>View Google Listing</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedClients() {
  const [imageError, setImageError] = useState(false);

  // Marquee elite clients in Hyderabad for high-fidelity fallback representation
  const eliteClients = [
    { name: "Apollo Hospitals", category: "Super-Specialty Healthcare", icon: "🏥", accent: "from-teal-500/10 to-emerald-500/10 text-teal-600 dark:text-teal-400 border-teal-100/60 dark:border-teal-900/30" },
    { name: "Taj Hotels", category: "Luxury 5-Star Hospitality", icon: "🏨", accent: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-100/60 dark:border-amber-900/30" },
    { name: "The Westin", category: "Premium Business Hotel", icon: "⭐", accent: "from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100/60 dark:border-indigo-900/30" },
    { name: "Tech Mahindra", category: "Enterprise Tech Complex", icon: "💻", accent: "from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400 border-red-100/60 dark:border-red-900/30" },
    { name: "My Home Group", category: "Grade-A IT & Business Parks", icon: "🏢", accent: "from-blue-500/10 to-sky-500/10 text-blue-600 dark:text-blue-400 border-blue-100/60 dark:border-blue-900/30" },
    { name: "Aparna Corporate Parks", category: "High-End Corporate Spaces", icon: "🧱", accent: "from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-100/60 dark:border-purple-900/30" },
    { name: "ITC Kohenur", category: "Ultra-Luxury Hospitality", icon: "⚜️", accent: "from-yellow-500/10 to-amber-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-100/60 dark:border-yellow-900/30" },
    { name: "L&T Metro & Malls", category: "Premium Commercial & Transit", icon: "🛍️", accent: "from-emerald-500/10 to-cyan-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100/60 dark:border-emerald-900/30" }
  ];

  return (
    <section id="clients" className="py-20 bg-gray-50/50 dark:bg-gray-950/40 border-y border-gray-100 dark:border-gray-900/60 transition-colors duration-500 scroll-mt-24 overflow-hidden relative">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 dark:bg-blue-950/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-100/20 dark:bg-emerald-950/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1.5 rounded-full inline-block mb-4">
              Our Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              Trusted by Hyderabad’s Industry Leaders
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              We manage premium facility services, 24/7 corporate housekeeping, integrated deep cleaning, 
              and VIP valet parking solutions for major IT corridors, hospitals, and enterprise hubs.
            </p>
          </motion.div>
        </div>

        {/* Both Grid AND Official Logos Showcase */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* Elegant Sector Cards Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-md hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">🏢</div>
              <h4 className="font-bold text-base text-gray-900 dark:text-white">IT & Tech Corridors</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Hitec City, Gachibowli, & Financial District Complexes</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-md hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">🏥</div>
              <h4 className="font-bold text-base text-gray-900 dark:text-white">Healthcare</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Super-Specialty Hospitals, Diagnostics & Research Hubs</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-md hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">🏨</div>
              <h4 className="font-bold text-base text-gray-900 dark:text-white">Luxury Hospitality</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Banjara Hills, Jubilee Hills, & Gachibowli Premium Hotels & Clubs</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-md hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">🛍️</div>
              <h4 className="font-bold text-base text-gray-900 dark:text-white">Commercial Hubs</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">Premium Retail Spaces, Corporate Office Parks & Enterprise Centers</p>
            </div>
          </motion.div>

          {/* Official Logos Showcase Image Panel */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group overflow-hidden rounded-3xl bg-white/95 dark:bg-gray-900/95 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 p-6 md:p-10 flex flex-col items-center justify-center">
              {/* Background ambient glow behind the logo sheet */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl pointer-events-none" />
              
              {/* Elegant Top Badge */}
              <div className="flex items-center gap-2 mb-6 md:mb-8 border border-blue-100 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Official Commercial Clients
                </span>
              </div>

              {/* Logo Sheet Image */}
              <div className="relative w-full flex justify-center items-center overflow-hidden rounded-2xl bg-white p-4 md:p-8 border border-gray-100 dark:border-gray-200/10 shadow-inner">
                <img 
                  src="https://res.cloudinary.com/deed9nqtg/image/upload/v1781940211/Client_Logos_for_ESS_ydnht5.png" 
                  alt="Expert Standard Solution Trusted Client Logos" 
                  referrerPolicy="no-referrer"
                  className="w-full max-w-4xl h-auto object-contain select-none transform group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>

              {/* Subtle caption */}
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-6 font-medium text-center leading-relaxed">
                Serving prominent multinational corporations, critical healthcare facilities, luxury hospitality, and major business hubs across Telangana.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Trust Stats Grid */}
        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto border-t border-gray-200/60 dark:border-gray-800/40 pt-12"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">150+</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Premium Clients</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">2,500+</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Managed Staff</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">24/7</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Support Desk</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">99.8%</p>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">SLA Compliance</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



export default function Home() {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://expertstandardsolution.com/#organization",
        "name": "Expert Standard Solution",
        "alternateName": "ESS Hyderabad",
        "url": "https://expertstandardsolution.com/",
        "logo": "https://expertstandardsolution.com/logo.png",
        "image": "https://res.cloudinary.com/deed9nqtg/image/upload/v1781960576/WhatsApp_Image_2026-06-20_at_14.12.43_mwplyj.jpg",
        "description": "Premium commercial facility management, corporate housekeeping, deep cleaning, and professional valet parking management services in Hyderabad.",
        "telephone": "+91 73868 43005",
        "email": "info@expertstandardsolution.com",
        "priceRange": "$$",
        "hasMap": "https://maps.app.goo.gl/b6mHqbXBWE9DpEjc9",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Pillar Number 143, Plot No 4-3-119/5, 1st Floor, Near, Attapur",
          "addressLocality": "Hyderabad",
          "addressRegion": "Telangana",
          "postalCode": "500048",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 17.3730,
          "longitude": 78.4350
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "184",
          "bestRating": "5"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "sameAs": [
          "https://www.linkedin.com/company/expert-standard-solution",
          "https://www.facebook.com/expertstandardsolution",
          "https://maps.app.goo.gl/b6mHqbXBWE9DpEjc9"
        ],
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Attapur, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Madhapur, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Gachibowli, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Kondapur, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Jubilee Hills, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "Banjara Hills, Hyderabad" },
          { "@type": "AdministrativeArea", "name": "HITEC City, Hyderabad" }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://expertstandardsolution.com/#organization_details",
        "name": "Expert Standard Solution",
        "url": "https://expertstandardsolution.com/",
        "logo": "https://expertstandardsolution.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91 73868 43005",
          "contactType": "customer service",
          "email": "info@expertstandardsolution.com",
          "areaServed": "IN",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.linkedin.com/company/expert-standard-solution",
          "https://www.facebook.com/expertstandardsolution",
          "https://maps.app.goo.gl/b6mHqbXBWE9DpEjc9"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://expertstandardsolution.com/#website",
        "url": "https://expertstandardsolution.com/",
        "name": "Expert Standard Solution",
        "description": "Professional Corporate Housekeeping, Deep Cleaning & Valet Parking Services in Hyderabad",
        "publisher": {
          "@id": "https://expertstandardsolution.com/#organization"
        }
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Premium Valet Parking & Facility Management Hyderabad | ESS</title>
        <meta name="description" content="Premium valet parking, professional corporate housekeeping, and integrated facility management solutions in Hyderabad. Certified staff & trusted service." />
        <meta name="keywords" content="facility management hyderabad, corporate housekeeping hyderabad, office cleaning services hyderabad, valet parking management hyderabad, deep cleaning services hyderabad, cctv surveillance hyderabad, commercial housekeeping services" />
        <link rel="canonical" href="https://expertstandardsolution.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://expertstandardsolution.com/" />
        <meta property="og:title" content="Premium Valet Parking & Facility Management Hyderabad | ESS" />
        <meta property="og:description" content="Premium valet parking, professional corporate housekeeping, and integrated facility management solutions in Hyderabad. Certified staff & trusted service." />
        <meta property="og:image" content="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png" />
        <meta property="og:site_name" content="Expert Standard Solution" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://expertstandardsolution.com/" />
        <meta name="twitter:title" content="Premium Valet Parking & Facility Management Hyderabad | ESS" />
        <meta name="twitter:description" content="Premium valet parking, professional corporate housekeeping, and integrated facility management solutions in Hyderabad. Certified staff & trusted service." />
        <meta name="twitter:image" content="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(schemaGraph)}
        </script>
      </Helmet>
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <TrustedClients />
      <TeamSection />
      <TestimonialsSection />
      <FAQSection />
      <QuoteRequestSection />
    </div>
  );
}
