import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Users, Sparkles, ShieldCheck, CheckCircle2, Phone, MapPin,
  ChevronRight, ArrowRight, HelpCircle, Star, Award, Building2,
  Calendar, ChevronDown, ArrowLeft
} from 'lucide-react';
import { SeoPageConfig, SEO_PAGES_DATA } from '../data/seoPagesData';
import { cn } from '../lib/utils';

interface SeoServicePageProps {
  slug: string;
}

export default function SeoServicePage({ slug }: SeoServicePageProps) {
  const config = SEO_PAGES_DATA[slug];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(0);
  }, [slug]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4 text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p className="text-gray-500 mb-6">The requested service page does not exist.</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold">Return Home</Link>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, React.ReactNode> = React.useMemo(() => ({
    Users: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    Sparkles: <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
  }), []);

  const schemaGraph = React.useMemo(() => {
    if (!config) return null;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `https://expertstandardsolution.com/${config.slug}#service`,
          "name": config.title,
          "serviceType": config.serviceCategory,
          "description": config.metaDescription,
          "provider": {
            "@type": "LocalBusiness",
            "name": "Expert Standard Solution (ESS)",
            "image": "https://expertstandardsolution.com/logo.png",
            "telephone": "+91 73868 43005",
            "email": "info@expertstandardsolution.com",
            "url": "https://expertstandardsolution.com",
            "priceRange": "₹₹",
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
            }
          },
          "areaServed": config.hyderabadAreas.map(area => ({
            "@type": "AdministrativeArea",
            "name": `${area}, Hyderabad, Telangana`
          }))
        },
        {
          "@type": "FAQPage",
          "@id": `https://expertstandardsolution.com/${config.slug}#faq`,
          "mainEntity": config.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ]
    };
  }, [config]);

  const otherPages = React.useMemo(() => {
    return Object.values(SEO_PAGES_DATA).filter(p => p.slug !== slug);
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{config.metaTitle}</title>
        <meta name="description" content={config.metaDescription} />
        <meta name="keywords" content={config.keywords.join(', ')} />
        <link rel="canonical" href={`https://expertstandardsolution.com/${config.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={config.metaTitle} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://expertstandardsolution.com/${config.slug}`} />
        <meta property="og:locale" content="en_IN" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaGraph)}
        </script>
      </Helmet>

      <div className="min-h-screen pt-0 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Breadcrumbs */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2 overflow-hidden">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link to="/#services-overview" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex-shrink-0">Services</Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-gray-900 dark:text-gray-200 font-medium truncate">{config.serviceCategory}</span>
            </div>
            <Link 
              to="/#services-overview" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-white dark:bg-gray-900 px-3 py-1.5 rounded-full border border-gray-200/60 dark:border-gray-800 shadow-xs hover:shadow-sm flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Services</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-6 pb-16 sm:pt-8 sm:pb-24 bg-gradient-to-b from-blue-50/70 via-white to-white dark:from-blue-950/30 dark:via-gray-950 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6 border border-blue-200 dark:border-blue-800/60"
              >
                <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{config.heroBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-6"
              >
                {config.heroHeadline}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
              >
                {config.heroSubheadline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <a
                  href="tel:+917386843005"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg hover:shadow-blue-600/25 transition-all"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  <span>Call Now +91 73868 43005</span>
                </a>
                <Link
                  to="/#quote"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-base transition-all"
                >
                  <span>Request Instant Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-blue-600 dark:bg-blue-900 text-white py-8 border-y border-blue-700 dark:border-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
              {config.stats.map((st, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-4xl font-black">{st.value}</div>
                  <div className="text-xs sm:text-sm text-blue-100 font-medium">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview & Benefits Grid */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                  {config.overviewHeading}
                </h2>
                <div className="space-y-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {config.overviewText.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Key Advantages of Choosing ESS in Hyderabad
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {config.keyBenefits.map((ben, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 space-y-3">
                      <div className="p-3 inline-block rounded-xl bg-blue-100/60 dark:bg-blue-950">
                        {iconMap[ben.iconName] || <CheckCircle2 className="w-6 h-6 text-blue-600" />}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{ben.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-normal">{ben.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Checklist & Callout */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Scope Inclusions */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span>Comprehensive Service Inclusions</span>
                </h3>
                <ul className="space-y-3.5">
                  {config.serviceInclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                  <Link
                    to="/#quote"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-sm"
                  >
                    <span>Get Custom Pricing</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Direct Help Callout */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-6 sm:p-8 space-y-4 relative overflow-hidden shadow-xl">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Need Immediate Deployment?</h3>
                    <p className="text-xs text-gray-300">Speak with our Hyderabad Area Manager</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We offer site surveys within 2 hours across HITEC City, Gachibowli, and Jubilee Hills with 24-hour turnaround quotes.
                </p>
                <a
                  href="tel:+917386843005"
                  className="block text-center py-3.5 px-6 rounded-xl bg-white text-gray-900 font-extrabold hover:bg-blue-50 transition shadow"
                >
                  +91 73868 43005
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Service Areas in Hyderabad */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900/60 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Local Presence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Serving All Commercial Hubs Across Hyderabad
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Rapid response teams positioned across premier IT corridors and industrial zones.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {config.hyderabadAreas.map((area) => (
                <div
                  key={area}
                  className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-xl p-4 text-center hover:border-blue-500 dark:hover:border-blue-500 transition shadow-xs flex items-center justify-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Everything you need to know about booking {config.title.toLowerCase()} with ESS.
            </p>
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div
                key={faq.question}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 dark:text-white text-base sm:text-lg hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn("w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4", openFaq === i && "rotate-180 text-blue-600")} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/60 pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Link SEO Footer Strip */}
        <section className="py-12 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6">
              Explore Related Commercial Facility Services in Hyderabad
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {otherPages.map((page) => (
                <Link
                  key={page.slug}
                  to={`/${page.slug}`}
                  className="p-4 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition group flex items-center justify-between"
                >
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {page.serviceCategory}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
