import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";
import compression from "compression";
import fs from "fs";
import nodemailer from "nodemailer";
import { SEO_PAGES_DATA } from "./src/data/seoPagesData";
import { authRateLimiter, publicRateLimiter, userRateLimiter } from "./src/middleware/rateLimiter";
import { 
  validateBody, 
  validateParams, 
  authSchema, 
  passwordResetSchema, 
  createRequestSchema, 
  updateRequestSchema, 
  deleteReportSchema, 
  idParamSchema 
} from "./src/middleware/validation";

interface ServiceRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  serviceType: string;
  details: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled';
  billingAmount: number;
  billingStatus: 'Unpaid' | 'Paid';
  createdAt: string;
}

// In-memory data store for prototype
let requests: ServiceRequest[] = [
  {
    id: "REQ-001",
    clientName: "Joe",
    email: "joe@example.com",
    phone: "1234567890",
    serviceType: "Commercial Cleaning Services",
    details: "Weekly cleaning for office floor.",
    status: "In Progress",
    billingAmount: 500,
    billingStatus: "Unpaid",
    createdAt: new Date().toISOString()
  }
];

function sendMockEmail(to: string, subject: string, body: string) {
  console.log(`\n\x1b[36m[EMAIL SENT TO: ${to}]\x1b[0m`);
  console.log(`\x1b[36mSubject:\x1b[0m ${subject}`);
  console.log(`\x1b[36mBody:\x1b[0m ${body}\n`);
}

async function sendRealEmail(to: string, subject: string, body: string, htmlBody?: string) {
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const from = process.env.SMTP_FROM || process.env.EMAIL_FROM || user || "no-reply@expertstandardsolution.com";

  console.log(`\n\x1b[35m[SENDING EMAIL TO: ${to}]\x1b[0m`);
  console.log(`Subject: ${subject}`);

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host: host || "smtp.gmail.com",
        port: port,
        secure: port === 465, // true for 465, false for other ports
        auth: {
          user: user,
          pass: pass,
        },
      });

      const info = await transporter.sendMail({
        from: `"Expert Standard Solution" <${from}>`,
        to: to,
        subject: subject,
        text: body,
        html: htmlBody || body.replace(/\n/g, "<br>"),
      });

      console.log(`\x1b[32m[EMAIL SENT SUCCESSFULLY] Message ID: ${info.messageId}\x1b[0m\n`);
      return true;
    } catch (err) {
      console.error(`\x1b[31m[EMAIL SENDING FAILED]\x1b[0m`, err);
      // Fallback: log to console
      sendMockEmail(to, subject, body);
      return false;
    }
  } else {
    console.log(`\x1b[33m[EMAIL SKIPPED - SMTP Credentials Not Configured in Environment]\x1b[0m`);
    sendMockEmail(to, subject, body);
    return false;
  }
}

function injectSeoAndPreRender(html: string, urlPath: string, host: string): string {
  // Normalize path by stripping query params/hashes
  let cleanPath = urlPath.split('?')[0].split('#')[0];
  if (cleanPath.endsWith('/') && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // Dynamic Base URL matching the active domain (expertstandardsolution.com, etc)
  const baseUrl = `https://${host}`;

  // Default values optimized for premium valet & facility management services
  let title = "Premium Valet & Facility Management Hyderabad | ESS";
  let metaDesc = "ESS offers premium valet services and integrated facility management in Hyderabad. Hire professional parking management & commercial cleaning solutions today!";
  let keywords = "valet parking services hyderabad, professional valet services, premium valet parking, parking management services, corporate valet services, hotel valet services, restaurant valet services, event valet services, apartment valet services, facility management hyderabad, housekeeping services hyderabad, deep cleaning services hyderabad, commercial cleaning hyderabad, best valet parking company in hyderabad";
  let canonical = `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
  let ogTitle = title;
  let ogDesc = metaDesc;
  let ogUrl = canonical;
  let ogImage = "https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png";
  let twitterCard = "summary_large_image";
  
  let schemaList: any[] = [];
  let preRenderedHtml = "";

  // Base Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Expert Standard Solution (ESS)",
    "url": baseUrl,
    "logo": "https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91 73868 43005",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "te", "hi"]
    }
  };
  schemaList.push(orgSchema);

  // LocalBusiness Schema (with specific subtypes, coordinates, opening hours, area served)
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Expert Standard Solution (ESS)",
    "image": "https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png",
    "@id": `${baseUrl}/#business`,
    "url": baseUrl,
    "telephone": "+91 73868 43005",
    "email": "info@expertstandardsolution.com",
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
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Secunderabad" },
      { "@type": "AdministrativeArea", "name": "HITEC City" },
      { "@type": "AdministrativeArea", "name": "Gachibowli" },
      { "@type": "AdministrativeArea", "name": "Madhapur" },
      { "@type": "AdministrativeArea", "name": "Jubilee Hills" },
      { "@type": "AdministrativeArea", "name": "Banjara Hills" },
      { "@type": "AdministrativeArea", "name": "Telangana" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ESS Professional Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Primary Service: Valet Parking Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Premium Valet Parking Management",
                "description": "Professional valet parking solutions for hotels, restaurants, corporate offices, hospitals, shopping malls, and elite private events in Hyderabad."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hotel Valet Parking",
                "description": "Hospitality-focused, uniformed valet services with dynamic SMS ticketing for luxury hotels and premium lodging."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Valet Parking",
                "description": "Premium corporate parking management for high-traffic technology corridors, office parks, and multi-tenant commercial complexes."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Event & Party Valet Services",
                "description": "Elite event valet parking operations for weddings, banquets, and high-profile corporate celebrations in Telangana."
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Secondary Service: Integrated Facility Management & Commercial Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Corporate Housekeeping & Janitorial Care",
                "description": "Mechanized daily cleaning, workplace sanitation, and pantry support for offices and commercial establishments."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Deep Cleaning Services",
                "description": "Heavy-duty restoration of carpet flooring, high-pressure washing, and post-construction cleaning."
              }
            }
          ]
        }
      ]
    }
  };
  schemaList.push(businessSchema);

  // Match current path to pre-defined SEO data
  const slug = cleanPath.substring(1);
  const config = SEO_PAGES_DATA[slug];

  if (cleanPath === '/' || cleanPath === '') {
    // HOMEPAGE
    title = "Expert Standard Solution | Premium Valet Parking & Integrated Facility Management Hyderabad";
    // 150-160 character meta description containing "valet services" and "facility management"
    metaDesc = "Hyderabad's premier agency for premium valet parking management, corporate housekeeping, and integrated facility management services.";
    ogTitle = title;
    ogDesc = metaDesc;

    // Homepage FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${baseUrl}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does deep cleaning cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Deep cleaning costs vary depending on the size of your facility, property type, and specific cleaning requirements. We offer customized quotes following a brief consultation or site inspection to ensure you get the best value."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide verified manpower?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide reliable and verified manpower solutions across various industries, including skilled and unskilled labor, corporate housekeepers, administrative support, facility stewards, and event staff. Every candidate undergoes rigorous vetting, background checks, and standard training."
          }
        },
        {
          "@type": "Question",
          "name": "Do you serve gated communities?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we offer comprehensive facility management, commercial cleaning, pantry management, landscaping, and maintenance services tailored specifically for high-end residential societies and gated communities."
          }
        },
        {
          "@type": "Question",
          "name": "What is your typical onboarding process for a new corporate contract?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We begin with a thorough site survey to assess your facility's specific requirements, followed by drafting a customized SLA (Service Level Agreement). Upon agreement, we assign a dedicated supervisor, deploy trained on-site stewards, and execute seamless transition handovers within 7 to 10 working days."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of cleaning materials and equipment do you use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We use premium-grade, eco-friendly, and ISO-certified cleaning chemicals (such as Taski/Diversey). Our modern equipment checklist includes industrial ride-on scrubbers, high-pressure washers, single-disc scrubbing machines, and specialized vacuum cleaners for absolute sanitization."
          }
        },
        {
          "@type": "Question",
          "name": "Are your valet drivers trained and licensed?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. Every driver undergoes comprehensive background verification, holds a valid heavy/light motor vehicle license, and undergoes formal training in professional hospitality etiquette, safe parking practices, and handling high-end automatic/manual luxury cars."
          }
        },
        {
          "@type": "Question",
          "name": "How do you manage valet keys and vehicle security?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We utilize secure, centralized key management lockers monitored by CCTV. Keys are tagged with customized IDs corresponding to vehicle tokens, ensuring safe retrieval. We also maintain public liability insurance for complete peace of mind."
          }
        },
        {
          "@type": "Question",
          "name": "How do you handle staff absenteeism to ensure continuity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We maintain a 15% backup buffer force of trained, on-call personnel. If an on-site steward or supervisor is absent, our operations desk automatically deploys an equivalent replacement within 2 hours to ensure uninterrupted operations."
          }
        }
      ]
    };
    schemaList.push(faqSchema);

    preRenderedHtml = `
      <header style="padding: 20px; text-align: center; background: #0f172a; color: white;">
        <div style="font-size: 24px; font-weight: bold;">Expert Standard Solution (ESS)</div>
        <p>Premium Valet Parking & Integrated Facility Management Services in Hyderabad</p>
      </header>
      <main style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
        <section style="margin-bottom: 60px; text-align: center;">
          <span style="background: #eff6ff; color: #2563eb; padding: 8px 16px; border-radius: 9999px; font-weight: bold; font-size: 14px;">Hyderabad's Premier Valet & Facility Management Agency</span>
          <h1 style="font-size: 40px; font-weight: 800; color: #1e293b; margin-top: 20px; margin-bottom: 24px;">Premier Valet Parking Services & Integrated Facility Solutions in Hyderabad</h1>
          <p style="font-size: 18px; color: #475569; max-width: 800px; margin: 0 auto; line-height: 1.6;">Elevating hospitality standards with uniform-clad, background-verified professional valet drivers and standard-setting office housekeeping, deep cleaning, and corporate facility management across Telangana.</p>
          <div style="margin-top: 32px;">
            <a href="#quote" style="background: #2563eb; color: white; padding: 14px 28px; border-radius: 9999px; font-weight: bold; text-decoration: none; margin-right: 16px; display: inline-block;">Get a Custom Quote</a>
            <a href="tel:+917386843005" style="border: 2px solid #cbd5e1; color: #334155; padding: 12px 26px; border-radius: 9999px; font-weight: bold; text-decoration: none; display: inline-block;">Call +91 73868 43005</a>
          </div>
        </section>

        <section style="margin-bottom: 60px;">
          <h2 style="font-size: 32px; font-weight: 700; color: #1e293b; margin-bottom: 24px;">Our Premium Services in Hyderabad</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
            <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background: white;">
              <h3 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 12px;"><a href="/valet-parking-services-hyderabad" style="color: #2563eb; text-decoration: none;">Valet Parking Services</a></h3>
              <p style="color: #475569; line-height: 1.5;">Luxury valet parking operations for 5-star hotels, corporate offices, restaurants, high-end weddings, and grand events with certified, uniformed drivers and digital SMS queue ticketing.</p>
            </div>
            <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background: white;">
              <h3 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 12px;"><a href="/housekeeping-services-hyderabad" style="color: #2563eb; text-decoration: none;">Corporate Housekeeping Services</a></h3>
              <p style="color: #475569; line-height: 1.5;">Mechanized daily janitorial care, pantry operations, and hygiene audits for multinational IT tech parks and premium workspaces.</p>
            </div>
            <div style="border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; background: white;">
              <h3 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 12px;"><a href="/deep-cleaning-services-hyderabad" style="color: #2563eb; text-decoration: none;">Deep Cleaning Services</a></h3>
              <p style="color: #475569; line-height: 1.5;">Mechanized restoration of commercial carpet flooring, post-construction industrial scrubbing, and sanitary upholstery care.</p>
            </div>
          </div>
        </section>

        <section id="clients" style="margin-bottom: 60px; padding: 40px; border-radius: 16px; background: #ffffff; border: 1px solid #e2e8f0; text-align: center;">
          <h2 style="font-size: 32px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">Our Clients</h2>
          <p style="color: #475569; font-size: 16px; margin-bottom: 24px; line-height: 1.6;">Trusted by Hyderabad’s Industry Leaders. We manage premium facility services, 24/7 corporate housekeeping, integrated deep cleaning, and VIP valet parking solutions.</p>
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/deed9nqtg/image/upload/v1781940211/Client_Logos_for_ESS_ydnht5.png" alt="Expert Standard Solution Trusted Client Logos" style="max-width: 100%; height: auto; max-height: 250px; object-fit: contain;" />
          </div>
          <p style="font-size: 14px; color: #64748b; line-height: 1.5;">Serving prominent multinational corporations, critical healthcare facilities, luxury hospitality, and major business hubs across Telangana.</p>
        </section>

        <section style="margin-bottom: 60px; background: #f8fafc; padding: 40px; border-radius: 16px;">
          <h2 style="font-size: 32px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">Why Choose Expert Standard Solution (ESS)?</h2>
          <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 20px;">At ESS, we are defined by hospitality standards, elite driver grooming, strict background checks, absolute statutory compliance (PF, ESIC), and an unwavering commitment to safe operations. Our valet drivers undergo professional training in handling electric vehicles and supercars, while our facility teams leverage the latest mechanical tools for pristine spaces.</p>
        </section>
      </main>
      <footer style="background: #0f172a; color: #94a3b8; padding: 40px 20px; text-align: center;">
        <p>&copy; 2026 Expert Standard Solution (ESS). All Rights Reserved.</p>
        <p>Pillar Number 143, Plot No 4-3-119/5, 1st Floor, Near, Attapur, Hyderabad, Telangana 500048 | Contact: +91 73868 43005</p>
      </footer>
    `;

  } else if (config) {
    // DYNAMIC SERVICE LANDING PAGES
    title = config.metaTitle;
    metaDesc = config.metaDescription;
    keywords = config.keywords.join(', ');
    ogTitle = config.metaTitle;
    ogDesc = config.metaDescription;

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${baseUrl}${cleanPath}#service`,
      "name": config.title,
      "serviceType": config.serviceCategory,
      "description": config.metaDescription,
      "provider": {
        "@id": `${baseUrl}/#business`
      },
      "areaServed": config.hyderabadAreas.map(area => ({
        "@type": "AdministrativeArea",
        "name": `${area}, Hyderabad, Telangana`
      }))
    };
    schemaList.push(serviceSchema);

    // Service FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${baseUrl}${cleanPath}#faq`,
      "mainEntity": config.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    schemaList.push(faqSchema);

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": config.serviceCategory,
          "item": `${baseUrl}${cleanPath}`
        }
      ]
    };
    schemaList.push(breadcrumbSchema);

    preRenderedHtml = `
      <header style="padding: 20px; text-align: center; background: #0f172a; color: white;">
        <div style="font-size: 24px; font-weight: bold;">Expert Standard Solution (ESS)</div>
        <p>${config.serviceCategory} in Hyderabad</p>
      </header>
      <main style="max-width: 1200px; margin: 0 auto; padding: 40px 20px;">
        <div style="font-size: 14px; margin-bottom: 20px; color: #64748b;">
          <a href="/" style="color: #2563eb; text-decoration: none;">Home</a> &gt; <span>${config.serviceCategory}</span>
        </div>
        <section style="margin-bottom: 60px;">
          <span style="background: #eff6ff; color: #2563eb; padding: 6px 12px; border-radius: 9999px; font-weight: bold; font-size: 13px;">${config.heroBadge}</span>
          <h1 style="font-size: 40px; font-weight: 800; color: #1e293b; margin-top: 16px; margin-bottom: 16px;">${config.heroHeadline}</h1>
          <p style="font-size: 18px; color: #475569; line-height: 1.6;">${config.heroSubheadline}</p>
        </section>
        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">${config.overviewHeading}</h2>
          ${config.overviewText.map(p => `<p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 16px;">${p}</p>`).join('')}
        </section>
        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">Key Service Inclusions</h2>
          <ul style="padding-left: 20px; line-height: 1.8; color: #475569; font-size: 16px;">
            ${config.serviceInclusions.map(item => `<li style="margin-bottom: 8px;">${item}</li>`).join('')}
          </ul>
        </section>
        <section style="margin-bottom: 40px;">
          <h2 style="font-size: 28px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">Frequently Asked Questions</h2>
          ${config.faqs.map(faq => `
            <details style="border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; margin-bottom: 12px; background: #f8fafc;">
              <summary style="font-weight: 600; cursor: pointer; color: #1e293b;">${faq.question}</summary>
              <p style="margin-top: 10px; color: #475569; line-height: 1.5; font-size: 15px;">${faq.answer}</p>
            </details>
          `).join('')}
        </section>
      </main>
      <footer style="background: #0f172a; color: #94a3b8; padding: 40px 20px; text-align: center;">
        <p>&copy; 2026 Expert Standard Solution (ESS). All Rights Reserved.</p>
        <p>Pillar Number 143, Plot No 4-3-119/5, 1st Floor, Near, Attapur, Hyderabad, Telangana 500048 | Contact: +91 73868 43005</p>
      </footer>
    `;

  } else {
    // OTHER STATIC ROUTES
    if (cleanPath === '/careers') {
      title = "Join Our Team | Careers at Expert Standard Solution";
      metaDesc = "Apply for valet chauffeur and housekeeping jobs in Hyderabad. Join ESS for professional training, fair compensation, and career growth.";
    } else if (cleanPath === '/privacy') {
      title = "Privacy Policy | Expert Standard Solution";
      metaDesc = "Read the Privacy Policy of Expert Standard Solution (ESS) regarding how we collect, store, and protect client and guest data in Hyderabad.";
    } else if (cleanPath === '/terms') {
      title = "Terms & Conditions | Expert Standard Solution";
      metaDesc = "Read the terms and conditions for ESS premium valet services, corporate housekeeping, and facility management contract solutions in Hyderabad.";
    } else if (cleanPath === '/admin') {
      title = "Admin Console | Expert Standard Solution";
      metaDesc = "Administrative access dashboard for Expert Standard Solution (ESS) staff and operations managers in Hyderabad.";
    } else if (cleanPath === '/seo') {
      title = "SEO Analytics Dashboard | Expert Standard Solution";
      metaDesc = "View optimization details, canonical structures, metadata indexing, and keyword tracking analytics for expertstandardsolution.com.";
    } else {
      title = "Premium Valet & Facility Services Hyderabad | ESS";
      metaDesc = "ESS offers premium valet services and integrated facility management in Hyderabad. Hire professional parking management & commercial cleaning solutions today!";
    }

    ogTitle = title;
    ogDesc = metaDesc;

    preRenderedHtml = `
      <header style="padding: 20px; text-align: center; background: #0f172a; color: white;">
        <div style="font-size: 24px; font-weight: bold;">Expert Standard Solution (ESS)</div>
        <p>Premium Valet Parking & Integrated Facility Management Services</p>
      </header>
      <main style="max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6;">
        <h1>${title}</h1>
        <p>${metaDesc}</p>
        <p>Expert Standard Solution is committed to quality, trust, safety, and ultimate customer satisfaction across Hyderabad and Telangana.</p>
      </main>
      <footer style="background: #0f172a; color: #94a3b8; padding: 40px 20px; text-align: center;">
        <p>&copy; 2026 Expert Standard Solution (ESS). All Rights Reserved.</p>
      </footer>
    `;
  }

  // REWRITE TITLE
  const titleRegex = /<title>[^]*?<\/title>/gi;
  if (titleRegex.test(html)) {
    html = html.replace(titleRegex, `<title>${title}</title>`);
  } else {
    html = html.replace('</head>', `<title>${title}</title></head>`);
  }

  // Remove existing metadata tags to prevent duplicate insertion
  html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^]*?["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name=["']keywords["']\s+content=["'][^]*?["']\s*\/?>/gi, '');
  html = html.replace(/<link\s+rel=["']canonical["']\s+href=["'][^]*?["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property=["']og:[^]*?["']\s+content=["'][^]*?["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:[^]*?["']\s+content=["'][^]*?["']\s*\/?>/gi, '');
  html = html.replace(/<script\s+type=["']application\/ld\+json["']>[^]*?<\/script>/gi, '');

  // METADATA INJECTION
  let headTags = `
    <meta name="description" content="${metaDesc}" />
    <meta name="keywords" content="${keywords}" />
    <link rel="canonical" href="${canonical}" />
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDesc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${ogUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Expert Standard Solution" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="${twitterCard}" />
    <meta name="twitter:title" content="${ogTitle}" />
    <meta name="twitter:description" content="${ogDesc}" />
    <meta name="twitter:image" content="${ogImage}" />
  `;

  // Inject Schemas
  schemaList.forEach(schema => {
    headTags += `
    <script type="application/ld+json">
      ${JSON.stringify(schema)}
    </script>`;
  });

  html = html.replace('</head>', `${headTags}\n</head>`);

  // PRE-RENDERED INJECTION
  const rootWithContent = `<div id="root">
    <!-- SEO PRE-RENDERED COMPONENT (Hydrated by React on load) -->
    <div class="seo-pre-rendered-static-block" style="font-family: system-ui, sans-serif; color: #334155;">
      ${preRenderedHtml}
    </div>
  </div>`;
  
  // Replace the entire <div id="root">...</div> block including any static fallback content
  html = html.replace(/<div id=["']root["']>[\s\S]*?<\/div>/i, rootWithContent);

  return html;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Enable Gzip/Brotli compression for all requests
  app.use(compression());

  app.use(express.json());

  // Mock In-memory user database for authentication demonstration
  interface MockUser {
    email: string;
    passwordHash: string;
  }
  const mockUsers: MockUser[] = [];

  // Mock Auth Routes with strict rate limiters and exponential backoff
  app.post("/api/auth/signup", authRateLimiter, validateBody(authSchema), (req, res) => {
    const { email, password } = req.body;
    const exists = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ error: "User already exists with this email." });
    }
    mockUsers.push({ email, passwordHash: password }); // Simple plain password storage for demonstration
    return res.status(201).json({ success: true, message: "User signed up successfully!" });
  });

  app.post("/api/auth/login", authRateLimiter, validateBody(authSchema), (req, res) => {
    const { email, password } = req.body;
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }
    return res.json({ success: true, token: "mock-jwt-token-12345", message: "Logged in successfully!" });
  });

  app.post("/api/auth/password-reset", authRateLimiter, validateBody(passwordResetSchema), (req, res) => {
    const { email } = req.body;
    return res.json({ success: true, message: `Password reset email dispatched to ${email}.` });
  });

  // API Routes
  app.get("/api/news", publicRateLimiter, async (req, res) => {
    try {
      const parser = new Parser({
        timeout: 3000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      // Using more reliable feed
      let feed;
      try {
        feed = await parser.parseURL("https://timesofindia.indiatimes.com/rssfeeds/296589292.cms");
      } catch (feedError) {
        console.warn("Primary feed failed, falling back to static news:", feedError instanceof Error ? feedError.message : String(feedError));
        return res.json([
          { title: "Hyderabad traffic police issue new advisory for weekend diversions", link: "#" },
          { title: "New commercial spaces opening in Hitec City next month", link: "#" },
          { title: "City experiences unexpected light showers bringing relief from heat", link: "#" },
          { title: "Metro line extension expected to finish ahead of schedule", link: "#" }
        ]);
      }
      
      const newsItems = feed.items.slice(0, 10).map(item => ({
        title: item.title,
        link: item.link
      }));
      res.json(newsItems);
    } catch (error) {
      console.error("Error fetching news:", error);
      // Fallback local news to ensure UI still displays
      res.json([
        { title: "Hyderabad traffic police issue new advisory for weekend diversions - Deccan Chronicle", link: "https://www.deccanchronicle.com/" },
        { title: "New commercial spaces opening in Hitec City next month - Deccan Chronicle", link: "https://www.deccanchronicle.com/" },
        { title: "City experiences unexpected light showers bringing relief from heat - Deccan Chronicle", link: "https://www.deccanchronicle.com/" },
        { title: "Metro line extension expected to finish ahead of schedule - Deccan Chronicle", link: "https://www.deccanchronicle.com/" }
      ]);
    }
  });

  app.get("/api/requests", userRateLimiter, (req, res) => {
    res.json(requests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  });

  app.post("/api/requests", publicRateLimiter, validateBody(createRequestSchema), (req, res) => {
    const newRequest: ServiceRequest = {
      id: `REQ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      clientName: req.body.clientName,
      email: req.body.email,
      phone: req.body.phone,
      serviceType: req.body.serviceType,
      details: req.body.details,
      status: "Pending",
      billingAmount: 0,
      billingStatus: "Unpaid",
      createdAt: new Date().toISOString(),
    };
    
    requests.push(newRequest);

    // Mock Email to Client
    sendMockEmail(
      newRequest.email, 
      "Quote Request Received - Expert Standard Solutions", 
      `Hi ${newRequest.clientName},\n\nWe have received your quote request for ${newRequest.serviceType}. Our team will review and get back to you shortly.\n\nThank you,\nExpert Standard Solutions`
    );

    // Mock Email to Admin
    sendMockEmail(
      "admin@expertstandardsolution.com", 
      "New Service Request", 
      `New request received from ${newRequest.clientName} for ${newRequest.serviceType}.`
    );

    res.status(201).json(newRequest);
  });

  app.patch("/api/requests/:id", userRateLimiter, validateParams(idParamSchema), validateBody(updateRequestSchema), (req, res) => {
    const { id } = req.params;
    const { status, billingAmount, billingStatus } = req.body;
    
    const requestIndex = requests.findIndex(r => r.id === id);
    if (requestIndex === -1) {
      return res.status(404).json({ error: "Request not found" });
    }

    const prevRequest = { ...requests[requestIndex] };
    const updatedRequest = { 
      ...requests[requestIndex], 
      status: status !== undefined ? status : requests[requestIndex].status,
      billingAmount: billingAmount !== undefined ? billingAmount : requests[requestIndex].billingAmount,
      billingStatus: billingStatus !== undefined ? billingStatus : requests[requestIndex].billingStatus
    };
    requests[requestIndex] = updatedRequest;

    // Send notifications if status changed
    if (status !== undefined && prevRequest.status !== status) {
      sendMockEmail(
        updatedRequest.email,
        "Update on Your Service Request",
        `Hi ${updatedRequest.clientName},\n\nThe status of your request (${updatedRequest.id}) has been updated to: ${status}.\n\nThank you,\nExpert Standard Solutions`
      );
    }
    
    // Notification for billing changes
    if (billingAmount !== undefined && prevRequest.billingAmount !== billingAmount && billingAmount > 0) {
       sendMockEmail(
        updatedRequest.email,
        "Invoice Generated for Your Service",
        `Hi ${updatedRequest.clientName},\n\nAn invoice of $${billingAmount} has been generated for your request (${updatedRequest.id}). Please review your billing.\n\nThank you,\nExpert Standard Solutions`
      );     
    }

    res.json(updatedRequest);
  });

  app.post("/api/requests/notify-quote", publicRateLimiter, validateBody(createRequestSchema), async (req, res) => {
    const { clientName, email, phone, serviceType, details } = req.body;

    const emailBody = `
Dear ESS Team,

A new professional quote request has been submitted from the Homepage Quote form.

--------------------------------------------------
CLIENT DETAILS:
--------------------------------------------------
Full Name: ${clientName || "N/A"}
Email Address: ${email || "N/A"}
Phone Number: ${phone || "N/A"}
Requested Service: ${serviceType || "N/A"}

--------------------------------------------------
ADDITIONAL DETAILS:
--------------------------------------------------
${details || "No additional details provided."}

--------------------------------------------------
Submission Time: ${new Date().toLocaleString()}
--------------------------------------------------

Please log in to the admin dashboard to manage this request.
`;

    const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
  <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-top: 0;">New Professional Quote Request</h2>
  <p style="font-size: 16px; color: #334155;">A new request has been submitted from the Homepage Quote Form.</p>
  
  <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
    <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Client Details</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 6px 0; color: #64748b; width: 120px; font-weight: bold;">Full Name:</td>
        <td style="padding: 6px 0; color: #0f172a;">${clientName || "N/A"}</td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email:</td>
        <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}">${email || "N/A"}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Phone:</td>
        <td style="padding: 6px 0; color: #0f172a;"><a href="tel:${phone}">${phone || "N/A"}</a></td>
      </tr>
      <tr>
        <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Service Type:</td>
        <td style="padding: 6px 0; color: #2563eb; font-weight: bold;">${serviceType || "N/A"}</td>
      </tr>
    </table>
  </div>

  <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
    <h3 style="margin-top: 0; color: #0f172a; font-size: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Additional Details</h3>
    <p style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin: 0;">${details || "No additional details provided."}</p>
  </div>

  <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px;">
    Submitted on ${new Date().toLocaleString()}<br>
    Expert Standard Solution (ESS) Admin Notification System
  </p>
</div>
`;

    // Send email to the requested address
    await sendRealEmail(
      "expertstandardsolutionsfoa@gmail.com",
      `New Quote Request: ${clientName || "Client"} - ${serviceType || "Service"}`,
      emailBody,
      htmlBody
    );

    res.json({ success: true, message: "Notification email dispatched successfully." });
  });

  app.post("/api/requests/delete-report", userRateLimiter, validateBody(deleteReportSchema), async (req, res) => {
    const { id, clientName, email, phone, serviceType, details, createdAt } = req.body;

    const emailBody = `The following completed service request has been deleted from the system:
      
--------------------------------------------------
REQUEST DETAILS:
--------------------------------------------------
ID: ${id}
Client Name: ${clientName}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceType}
Details: ${details}
Created At: ${createdAt ? new Date(createdAt).toLocaleString() : 'N/A'}
Deletion Time: ${new Date().toLocaleString()}
--------------------------------------------------

This email serves as an archival copy of the deleted record.`;

    await sendRealEmail(
      "expertstandardsolutionfoa@gmail.com",
      `DELETED SERVICE REQUEST REPORT - ID: ${id}`,
      emailBody
    );

    res.json({ success: true, message: "Deletion report sent successfully." });
  });

  // Dynamic robots.txt endpoint
  app.get("/robots.txt", (req, res) => {
    const host = req.get('host') || 'expertstandardsolution.com';
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: https://${host}/sitemap.xml`);
  });

  // Dynamic sitemap.xml endpoint
  app.get("/sitemap.xml", async (req, res) => {
    const host = req.get('host') || 'expertstandardsolution.com';
    try {
      const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
      let sitemap = await fs.promises.readFile(sitemapPath, "utf-8");
      // Dynamically replace hardcoded domains with current host
      sitemap = sitemap.replace(/https:\/\/expertstandardsolution\.com/g, `https://${host}`);
      sitemap = sitemap.replace(/https:\/\/expertstandard\.in/g, `https://${host}`);
      res.type("application/xml");
      res.send(sitemap);
    } catch (err) {
      console.error("Error reading sitemap file:", err);
      res.status(500).send("Error generating sitemap");
    }
  });

  let vite: any;
  const isProd = process.env.NODE_ENV === "production" || (typeof __filename !== "undefined" && (__filename.endsWith('.cjs') || __filename.includes('dist')));

  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  }

  // Unified HTML Pre-rendering & SEO Injection Middleware (Dev & Prod)
  app.use(async (req, res, next) => {
    const isApi = req.path.startsWith('/api/');
    const hasAssetExtension = /\.(js|css|png|jpg|jpeg|gif|svg|ico|json|txt|woff|woff2|ttf|eot|xml|map|webmanifest)$/i.test(req.path);
    const isHtmlRoute = !isApi && !hasAssetExtension;

    if (isHtmlRoute) {
      try {
        let html = "";
        if (!isProd && vite) {
          const rawHtml = await fs.promises.readFile(path.join(process.cwd(), 'index.html'), 'utf-8');
          html = await vite.transformIndexHtml(req.url, rawHtml);
        } else {
          const distPath = path.join(process.cwd(), 'dist');
          html = await fs.promises.readFile(path.join(distPath, 'index.html'), 'utf-8');
        }

        const host = req.get('host') || 'expertstandardsolution.com';
        html = injectSeoAndPreRender(html, req.path, host);

        res.set({
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
          'Content-Type': 'text/html; charset=utf-8'
        });
        return res.send(html);
      } catch (err) {
        console.error("SEO pre-rendering error:", err);
        return next();
      }
    }
    next();
  });

  if (isProd) {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Cache-Control middleware to prevent aggressive caching on mobile browsers
    app.use((req, res, next) => {
      const isHtml = req.path.endsWith('.html') || req.path === '/' || req.path === '';
      if (isHtml) {
        res.set({
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store'
        });
      } else if (req.path.includes('/assets/')) {
        res.set('Cache-Control', 'public, max-age=31536000, immutable');
      }
      next();
    });

    app.use(express.static(distPath, {
      maxAge: '31536000',
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.set({
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Surrogate-Control': 'no-store'
          });
        } else {
          res.set('Cache-Control', 'public, max-age=31536000, immutable');
        }
      }
    }));

    app.get('*', (req, res) => {
      res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8'
      });
      try {
        const distPath = path.join(process.cwd(), 'dist');
        const rawHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
        const host = req.get('host') || 'expertstandardsolution.com';
        const html = injectSeoAndPreRender(rawHtml, req.path, host);
        res.send(html);
      } catch (err) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  // Global robust error-handling middleware to prevent stack trace or path leaks to clients
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Log the complete details on the server side for developer auditing (secured)
    console.error(`[SERVER ERROR LOG] Unhandled error encountered:`, err);

    // Clean status code or default to 500
    const statusCode = err.status || err.statusCode || 500;
    
    // Default friendly, generic error message that hides internal stack traces or DB errors
    let clientMessage = "An unexpected error occurred on the server. Please try again later.";
    
    // Safely check if it's an Express body-parser SyntaxError
    if (err instanceof SyntaxError && "body" in err) {
      clientMessage = "Malformed request payload. Please verify that your JSON format is correct.";
    }

    res.status(statusCode).json({
      error: clientMessage
    });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
