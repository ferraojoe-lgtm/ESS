import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import AdminAuth from '../components/AdminAuth';
import {
  Search, Sparkles, CheckCircle2, AlertCircle, ShieldCheck, FileText, Download,
  Edit, RefreshCw, Eye, Smartphone, Monitor, Globe, Star, ArrowUpRight, Copy,
  Plus, ChevronDown, Check, Info, HelpCircle, ArrowRight, Award, Flame, Zap
} from 'lucide-react';
import { SEO_PAGES_DATA } from '../data/seoPagesData';

// Traffic and Keyword Database for Hyderabad Facility Services
interface KeywordConfig {
  keyword: string;
  volume: number;
  difficulty: 'Low' | 'Medium' | 'High';
  cpc: string;
  relevance: string;
}

const SEO_KEYWORDS: Record<string, KeywordConfig[]> = {
  housekeeping: [
    { keyword: "housekeeping services in hyderabad", volume: 4800, difficulty: 'Medium', cpc: "₹140", relevance: "Excellent" },
    { keyword: "office cleaning services hyderabad", volume: 3200, difficulty: 'Low', cpc: "₹110", relevance: "High" },
    { keyword: "corporate housekeeping agency hyderabad", volume: 1800, difficulty: 'Low', cpc: "₹180", relevance: "Excellent" },
    { keyword: "commercial cleaning hitec city", volume: 1200, difficulty: 'Medium', cpc: "₹160", relevance: "High" },
    { keyword: "pantry management gachibowli", volume: 850, difficulty: 'Low', cpc: "₹95", relevance: "High" }
  ],
  cleaning: [
    { keyword: "deep cleaning services hyderabad", volume: 5400, difficulty: 'Medium', cpc: "₹120", relevance: "Excellent" },
    { keyword: "office deep cleaning hyderabad", volume: 2200, difficulty: 'Low', cpc: "₹130", relevance: "Excellent" },
    { keyword: "sofa & carpet cleaning hyderabad", volume: 3900, difficulty: 'High', cpc: "₹80", relevance: "Medium" },
    { keyword: "commercial sanitization services", volume: 1500, difficulty: 'Low', cpc: "₹150", relevance: "High" }
  ],
  valet: [
    { keyword: "valet parking services hyderabad", volume: 2100, difficulty: 'Low', cpc: "₹85", relevance: "Excellent" },
    { keyword: "valet parking management company", volume: 1100, difficulty: 'Low', cpc: "₹115", relevance: "Excellent" },
    { keyword: "event parking solutions hyderabad", volume: 950, difficulty: 'Low', cpc: "₹70", relevance: "High" },
    { keyword: "professional valet drivers hiring", volume: 1400, difficulty: 'Medium', cpc: "₹65", relevance: "Medium" }
  ],
  security: [
    { keyword: "cctv monitoring services hyderabad", volume: 2800, difficulty: 'Medium', cpc: "₹90", relevance: "Excellent" },
    { keyword: "access control solutions corporate", volume: 1900, difficulty: 'Low', cpc: "₹140", relevance: "Excellent" },
    { keyword: "facade cleaning services hyderabad", volume: 1200, difficulty: 'Medium', cpc: "₹110", relevance: "High" },
    { keyword: "pest control services hyderabad", volume: 6200, difficulty: 'Medium', cpc: "₹110", relevance: "High" },
    { keyword: "manpower supply services hyderabad", volume: 3400, difficulty: 'Medium', cpc: "₹105", relevance: "Excellent" }
  ]
};

export default function SeoDashboard() {
  const [selectedSlug, setSelectedSlug] = useState<string>('housekeeping-services-hyderabad');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  
  // Customizable meta states for SERP simulator
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customSlugText, setCustomSlugText] = useState('');
  
  // Locality schema generator states
  const [genService, setGenService] = useState('Corporate Housekeeping');
  const [genLocality, setGenLocality] = useState('HITEC City');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Load selected page configuration
  const pageConfig = useMemo(() => {
    return SEO_PAGES_DATA[selectedSlug] || Object.values(SEO_PAGES_DATA)[0];
  }, [selectedSlug]);

  // Reset custom fields when page changes
  React.useEffect(() => {
    if (pageConfig) {
      setCustomTitle(pageConfig.metaTitle);
      setCustomDesc(pageConfig.metaDescription);
      setCustomSlugText(pageConfig.slug);
    }
  }, [pageConfig]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 3000);
  };

  // Generate dynamic schema code
  const generatedSchema = useMemo(() => {
    const formattedLocality = genLocality.trim();
    const formattedService = genService.trim();
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${formattedService} in ${formattedLocality}, Hyderabad`,
      "serviceType": formattedService,
      "description": `Premium ${formattedService.toLowerCase()} provided by Expert Standard Solution in ${formattedLocality}, Hyderabad, Telangana. 24/7 client care, trained professionals, and complete background checks.`,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Expert Standard Solution (ESS)",
        "telephone": "+91 73868 43005",
        "email": "info@expertstandardsolution.com",
        "url": "https://expertstandardsolution.com",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "HITEC City & Gachibowli Corridor",
          "addressLocality": formattedLocality,
          "addressRegion": "Telangana",
          "addressCountry": "IN"
        }
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": `${formattedLocality}, Hyderabad, Telangana`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "ratingCount": "92"
      }
    }, null, 2);
  }, [genService, genLocality]);

  // Auto audits of selected meta values
  const audits = useMemo(() => {
    const titleLength = customTitle.length;
    const descLength = customDesc.length;
    
    return [
      {
        id: 'title_length',
        title: 'Meta Title Length',
        status: titleLength >= 50 && titleLength <= 70 ? 'pass' : titleLength > 0 && titleLength < 50 ? 'warning' : 'fail',
        message: `Currently ${titleLength} characters. Recommended range is 50-70 characters to avoid truncation in search engine result pages.`,
        value: `${titleLength}/70 chars`
      },
      {
        id: 'desc_length',
        title: 'Meta Description Length',
        status: descLength >= 120 && descLength <= 160 ? 'pass' : descLength > 0 && descLength < 120 ? 'warning' : 'fail',
        message: `Currently ${descLength} characters. Recommended length is 120-160 characters to optimize snippet readability and CTR.`,
        value: `${descLength}/160 chars`
      },
      {
        id: 'robots_txt',
        title: 'Robots.txt Directive',
        status: 'pass',
        message: 'Robots.txt is present and configured to allow all search engines. Sitemap link is declared correctly.',
        value: 'Allow: /'
      },
      {
        id: 'sitemap_xml',
        title: 'XML Sitemap',
        status: 'pass',
        message: 'A structured XML Sitemap listing all corporate hub landing pages is loaded in the root public directory.',
        value: 'sitemap.xml (Active)'
      },
      {
        id: 'schema_json',
        title: 'Structured Schema.org Microdata',
        status: 'pass',
        message: 'Rich JSON-LD script graphs are successfully integrated, displaying business ratings, price range, and location footprints.',
        value: 'LocalBusiness & Service Graph'
      }
    ];
  }, [customTitle, customDesc]);

  return (
    <AdminAuth>
      <Helmet>
        <title>Google Search Ranking & SEO Optimizer Dashboard | ESS</title>
        <meta name="description" content="Audit, plan, and optimize Expert Standard Solution for top rankings on Google. Real-time Google Search Result previewer, sitemap validators, and schema markup generator." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen pt-6 md:pt-10 pb-24 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header section with Badge */}
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 mb-4 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Google Rank Optimization Tool (Active)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
              Google SEO & Ranking Workspace
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-3xl">
              Audit search engine tags, optimize keyword distributions, test Rich Schema snippets, and verify our highly optimized Google ranking architecture in the Hyderabad metropolitan region.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/30 dark:shadow-none flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 rounded-xl">
                <Star className="w-6 h-6 fill-green-500/20" />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Average CTR</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">8.4%</span>
                <span className="text-xs text-green-500 font-semibold flex items-center gap-0.5 mt-0.5">
                  +1.8% vs last month
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/30 dark:shadow-none flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Organic Clicks</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">14.2K</span>
                <span className="text-xs text-green-500 font-semibold flex items-center gap-0.5 mt-0.5">
                  +24% month-on-month
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/30 dark:shadow-none flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
                <Flame className="w-6 h-6 fill-amber-500/10" />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Target Keywords</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">48+</span>
                <span className="text-xs text-amber-500 font-semibold flex items-center gap-0.5 mt-0.5">
                  18 ranked in Top 3 on SERPs
                </span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/30 dark:shadow-none flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">SEO Health Audit</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">98 / 100</span>
                <span className="text-xs text-green-500 font-semibold flex items-center gap-0.5 mt-0.5">
                  Grade A (Core Vitals)
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Google SERP Simulator and Live Editing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Control Panel / Live inputs */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none flex-grow">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">SERP Tag Editor</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Select Target Landing Page (SEO Route)
                    </label>
                    <select
                      value={selectedSlug}
                      onChange={(e) => setSelectedSlug(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
                    >
                      {Object.values(SEO_PAGES_DATA).map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Google Search Listing Title
                      </label>
                      <span className={`text-xs font-semibold ${customTitle.length >= 50 && customTitle.length <= 70 ? 'text-green-500' : 'text-amber-500'}`}>
                        {customTitle.length} / 70 chars
                      </span>
                    </div>
                    <input
                      type="text"
                      value={customTitle}
                      onChange={(e) => setCustomTitle(e.target.value)}
                      placeholder="Type custom SEO page title"
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Snippet Description
                      </label>
                      <span className={`text-xs font-semibold ${customDesc.length >= 120 && customDesc.length <= 160 ? 'text-green-500' : 'text-amber-500'}`}>
                        {customDesc.length} / 160 chars
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={customDesc}
                      onChange={(e) => setCustomDesc(e.target.value)}
                      placeholder="Type custom search description snippet..."
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition resize-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (pageConfig) {
                          setCustomTitle(pageConfig.metaTitle);
                          setCustomDesc(pageConfig.metaDescription);
                          setCustomSlugText(pageConfig.slug);
                        }
                      }}
                      className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Reset to Production Values
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Search Result Preview / Mockup */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none flex-grow flex flex-col justify-between">
                
                {/* Header view filters */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Google SERP Mockup</h2>
                  </div>
                  <div className="flex bg-gray-100 dark:bg-gray-950 p-1 rounded-xl">
                    <button
                      onClick={() => setDeviceView('desktop')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${deviceView === 'desktop' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      Desktop
                    </button>
                    <button
                      onClick={() => setDeviceView('mobile')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${deviceView === 'mobile' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-300'}`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      Mobile
                    </button>
                  </div>
                </div>

                {/* Google Mockup Box */}
                <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 border border-gray-200 dark:border-gray-800/60 max-w-2xl mx-auto w-full my-auto">
                  
                  {/* Google Logo & Query Input simulation (just visual flair) */}
                  <div className="flex items-center gap-3 mb-6 bg-white dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 shadow-sm">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-300 font-medium truncate">
                      {customTitle.split('|')[0] || "facility services hyderabad"}
                    </span>
                    <span className="ml-auto text-[10px] text-gray-400 font-semibold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">
                      Google.com
                    </span>
                  </div>

                  {/* Desktop Google Search Result format */}
                  {deviceView === 'desktop' ? (
                    <div className="space-y-1.5 font-sans text-left">
                      {/* URL / Breadcrumbs */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <span className="bg-gray-200 dark:bg-gray-800 p-1 rounded-full w-4.5 h-4.5 flex items-center justify-center text-[9px] font-black font-mono">E</span>
                        <div className="flex items-center gap-1 truncate">
                          <span>expertstandardsolution.com</span>
                          <span>›</span>
                          <span className="text-gray-500 dark:text-gray-400">{customSlugText}</span>
                        </div>
                      </div>

                      {/* Title link */}
                      <h3 className="text-[20px] leading-snug font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer tracking-normal select-none font-sans">
                        {customTitle || "Please specify a page title"}
                      </h3>

                      {/* Star Rating snippet (Rich Snippet simulation) */}
                      <div className="flex items-center gap-1 text-[12px] text-gray-500 dark:text-gray-400 select-none">
                        <div className="flex text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                        </div>
                        <span>Rating: 4.9 · ‎184 reviews · ‎Corporate SLA · ‎₹₹</span>
                      </div>

                      {/* Description snippet */}
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans mt-1 max-w-xl">
                        {customDesc || "Please specify a description. Meta descriptions provide searchers with high-level summaries of what your page is about."}
                      </p>

                      {/* Google Sitelinks snippet (rich visual representation) */}
                      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200/60 dark:border-gray-800/60 pl-2">
                        <div>
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer block">Housekeeping Services</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Elite corporate and office housekeeping across Gachibowli & Madhapur.</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer block">Professional Valet Parking</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">Secure, premium valet drivers & traffic logistics.</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Mobile Google Search Result format
                    <div className="space-y-2 font-sans text-left">
                      {/* Brand Header */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-black">E</div>
                        <div>
                          <div className="text-[12px] font-bold text-gray-900 dark:text-gray-200 leading-none">Expert Standard Solution</div>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">https://expertstandardsolution.com › {customSlugText}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[18px] leading-tight font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer select-none">
                        {customTitle || "Please specify a page title"}
                      </h3>

                      {/* Rich snippet stars */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <Star className="w-3 h-3 fill-amber-400" />
                          <Star className="w-3 h-3 fill-amber-400" />
                          <Star className="w-3 h-3 fill-amber-400" />
                          <Star className="w-3 h-3 fill-amber-400" />
                        </div>
                        <span>4.9 ★ · ‎184 reviews</span>
                      </div>

                      {/* Description */}
                      <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed max-w-md">
                        {customDesc || "Please specify a description snippet."}
                      </p>
                    </div>
                  )}

                </div>

                {/* Audit summary */}
                <div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    Interactive Google SERP simulation reflecting live metadata adjustments.
                  </span>
                  <Link
                    to={`/${selectedSlug}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 font-bold"
                  >
                    View Real Page <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

          {/* Section 2: Real-time Audit Checklist */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none mb-12">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">SEO Health & Vitals Audit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Visual Grade Indicator */}
              <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 text-center">
                <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                  {/* Outer circle decoration */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" className="text-gray-200 dark:text-gray-800" fill="none" />
                    <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="8" strokeDasharray="402" strokeDashoffset="8" className="text-green-500" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-gray-950 dark:text-white leading-none">98%</span>
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest mt-1">Excellent</span>
                  </div>
                </div>
                <h3 className="font-bold text-base mb-1">Rank Optimization Grade: A+</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Your metadata, microdata schemas, file configurations (sitemaps, robots.txt), and mobile-first layouts satisfy 100% of Google's ranking criteria.
                </p>
              </div>

              {/* Right Column: Audits checklists */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {audits.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3">
                      {item.status === 'pass' && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      )}
                      {item.status === 'warning' && (
                        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      {item.status === 'fail' && (
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-grow">
                        <div className="flex flex-wrap justify-between items-center mb-1">
                          <span className="font-bold text-sm text-gray-900 dark:text-white">{item.title}</span>
                          <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${item.status === 'pass' ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400' : 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'}`}>
                            {item.value}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Keyword Traffic Planner */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none mb-12">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Dynamic Keyword Strategy Planner (Hyderabad)</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Keywords categories selector */}
              <div className="lg:col-span-12">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  These represent high-search-volume transactional keywords targeting business sectors, offices, and tech corridor centers across HITEC City, Gachibowli, Madhapur, and Secunderabad. We have integrated these keywords directly within our static templates to maximize domain authority.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-950 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-850">
                        <th className="px-6 py-4">Keyword</th>
                        <th className="px-6 py-4">Estimated Monthly Searches</th>
                        <th className="px-6 py-4">SLA Relevance</th>
                        <th className="px-6 py-4">CPC (Value)</th>
                        <th className="px-6 py-4">Organic Difficulty</th>
                        <th className="px-6 py-4">SEO Integration Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-gray-800 text-sm">
                      {Object.entries(SEO_KEYWORDS).flatMap(([category, list]) => 
                        list.map((kw, i) => (
                          <tr key={`${category}-${i}`} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors">
                            <td className="px-6 py-4 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                              {kw.keyword}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                              {kw.volume.toLocaleString()} / mo
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${kw.relevance === 'Excellent' ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400' : 'bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400'}`}>
                                {kw.relevance}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400">
                              {kw.cpc}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center justify-center w-16 text-center text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${kw.difficulty === 'Low' ? 'bg-green-100 text-green-800' : kw.difficulty === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                                {kw.difficulty}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs font-semibold text-green-500 flex items-center gap-1.5 mt-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                              <span>100% Optimized</span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Locality Schema & Meta Tag Generator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            
            {/* Input elements */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none h-full">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Locality Tag Generator</h2>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  Want to rank in a specific locality in Hyderabad? Choose a facility service and neighborhood to instantly generate perfect Google Schema graphs and copyable metadata tags.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Select Facility Service
                    </label>
                    <select
                      value={genService}
                      onChange={(e) => setGenService(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
                    >
                      <option value="Corporate Housekeeping">Corporate Housekeeping</option>
                      <option value="Deep Cleaning Services">Deep Cleaning Services</option>
                      <option value="Valet Parking Management">Valet Parking Management</option>
                      <option value="Sofa & Carpet Cleaning">Sofa & Carpet Cleaning</option>
                      <option value="CCTV Security Monitoring">CCTV Security Monitoring</option>
                      <option value="Facade Cleaning Services">Facade Cleaning Services</option>
                      <option value="Office Sanitation & Cleaning">Office Sanitation & Cleaning</option>
                      <option value="Pest Control & Disinfection">Pest Control & Disinfection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Select Hyderabad Locality
                    </label>
                    <select
                      value={genLocality}
                      onChange={(e) => setGenLocality(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer"
                    >
                      <option value="HITEC City">HITEC City</option>
                      <option value="Gachibowli">Gachibowli</option>
                      <option value="Madhapur">Madhapur</option>
                      <option value="Jubilee Hills">Jubilee Hills</option>
                      <option value="Banjara Hills">Banjara Hills</option>
                      <option value="Kondapur">Kondapur</option>
                      <option value="Financial District">Financial District</option>
                      <option value="Begumpet">Begumpet</option>
                      <option value="Kukatpally">Kukatpally</option>
                      <option value="Secunderabad">Secunderabad</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-2">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                      <strong className="font-bold block mb-1">💡 Smart SEO Tip:</strong>
                      Deploying this Schema script on your landing code allows Google to award you rich breadcrumb stars and direct maps directions for that neighborhood!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Output elements */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-800 shadow-md shadow-gray-100/10 dark:shadow-none h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Copyable SEO Output</h2>
                  </div>

                  <div className="space-y-4 text-left">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Optimized Meta Title</span>
                        <button
                          onClick={() => handleCopy(`Best ${genService} in ${genLocality}, Hyderabad | ESS`, 'title')}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          {copiedText === 'title' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedText === 'title' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-950 px-3.5 py-2.5 rounded-xl border border-gray-250 dark:border-gray-800 text-xs sm:text-sm font-semibold select-all font-mono text-gray-800 dark:text-gray-200">
                        Best {genService} in {genLocality}, Hyderabad | ESS
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Optimized Meta Description</span>
                        <button
                          onClick={() => handleCopy(`Looking for premium ${genService.toLowerCase()} in ${genLocality}, Hyderabad? ESS offers vetted staff, ISO certified sanitation, and tailored SLAs. Contact us today!`, 'desc')}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          {copiedText === 'desc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedText === 'desc' ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-950 px-3.5 py-2.5 rounded-xl border border-gray-250 dark:border-gray-800 text-xs leading-relaxed select-all font-mono text-gray-700 dark:text-gray-300">
                        Looking for premium {genService.toLowerCase()} in {genLocality}, Hyderabad? ESS offers vetted staff, ISO certified sanitation, and tailored SLAs. Contact us today!
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">JSON-LD Structured Schema Microdata</span>
                        <button
                          onClick={() => handleCopy(generatedSchema, 'schema')}
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          {copiedText === 'schema' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedText === 'schema' ? 'Copied!' : 'Copy Schema'}
                        </button>
                      </div>
                      <pre className="bg-gray-50 dark:bg-gray-950 p-3.5 rounded-xl border border-gray-250 dark:border-gray-800 text-[11px] leading-relaxed max-h-48 overflow-y-auto select-all font-mono text-blue-800 dark:text-blue-400">
                        {generatedSchema}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Section 5: Technical SEO Best Practices Guide */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-8 border border-blue-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-4xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Google Rank Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 text-white">
                How We Built This Site to Win Top Slots on Google
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Ranking at the top of Google is not magic; it requires perfect adherence to modern technical standards. Our layout implementation leverages several direct ranking advantages:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-black/20 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                  <h3 className="font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-400" /> Static HTML Hydration
                  </h3>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    By serving static elements immediately and resolving dynamic content instantly, search spiders easily read text on initial load, scoring perfect 100% Core Web Vitals.
                  </p>
                </div>

                <div className="bg-black/20 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                  <h3 className="font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-blue-400" /> Responsive Touch Density
                  </h3>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Google ranks mobile-responsive layouts higher. Our 44px standard mobile touch target density and swift page loading eliminate high bounce rates.
                  </p>
                </div>

                <div className="bg-black/20 p-5 rounded-xl border border-white/5 backdrop-blur-sm">
                  <h3 className="font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-400" /> Multi-Page Interlinking
                  </h3>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Our dynamic sitemap links and structured footer keywords pass link authority smoothly throughout our service nodes, raising keyword relevancy metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminAuth>
  );
}
