import React, { createContext, useContext, useState } from 'react';

type Language = 'EN' | 'TE' | 'HI';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      team: 'Team',
      careers: 'Careers',
      login: 'Admin Login',
      contact: 'Contact Us',
    },
    hero: {
      badge: '✨ Hyderabad\'s Premier Integrated Facility Partner',
      title: 'The Art of Arrival. The Science of Management.',
      subtitle: 'Premium Valet Parking & Integrated Facility Management in Hyderabad',
      cta1: 'Get Instant Quote',
      cta2: 'Explore Services',
    },
    footer: {
      description: 'Hyderabad\'s premier agency for Premium Valet Parking Services, followed by Corporate Housekeeping, Deep Cleaning, and Integrated Facility Solutions.',
      contact: 'Contact Us',
      quickLinks: 'Quick Links',
      services: 'Services',
      joinTeam: 'Join Our Team - Careers',
      ecoFriendly: 'Eco-Friendly & 100% Carbon Neutral Website',
    }
  },
  TE: {
    nav: {
      home: 'హోమ్',
      about: 'మా గురించి',
      services: 'సేవలు',
      team: 'బృందం',
      careers: 'కెరీర్స్',
      login: 'అడ్మిన్ లాగిన్',
      contact: 'మమ్మల్ని సంప్రదించండి',
    },
    hero: {
      badge: '✨ హైదరాబాద్ నెం. 1 ప్రీమియం ఫెసిలిటీ భాగస్వామి',
      title: 'ఆగమన కళ. నిర్వహణ శాస్త్రం.',
      subtitle: 'హైదరాబాద్‌లో ప్రీమియం వాలెట్ పార్కింగ్ & ఇంటిగ్రేటెడ్ ఫెసిలిటీ మేనేజ్‌మెంట్',
      cta1: 'తక్షణ కోట్ పొందండి',
      cta2: 'సేవలను అన్వేషించండి',
    },
    footer: {
      description: 'హైదరాబాద్‌లోని అత్యుత్తమ సంస్థల కోసం ప్రీమియం ప్రాపర్టీ మెయింటెనెన్స్ మరియు వాలెట్ సేవలు.',
      contact: 'మమ్మల్ని సంప్రదించండి',
      quickLinks: 'త్వరిత లింక్‌లు',
      services: 'సేవలు',
      joinTeam: 'మా బృందంలో చేరండి - కెరీర్స్',
      ecoFriendly: 'పర్యావరణ అనుకూలమైన & కార్బన్ న్యూట్రల్ వెబ్‌సైట్',
    }
  },
  HI: {
    nav: {
      home: 'मुख्य पृष्ठ',
      about: 'हमारे बारे में',
      services: 'सेवाएं',
      team: 'टीम',
      careers: 'करियर',
      login: 'व्यवस्थापक लॉगिन',
      contact: 'संपर्क करें',
    },
    hero: {
      badge: '✨ हैदराबाद का नंबर 1 प्रीमियम फैसिलिटी पार्टनर',
      title: 'आगमन की कला। प्रबंधन का विज्ञान।',
      subtitle: 'हैदराबाद में प्रीमियम वैलेट पार्किंग और एकीकृत सुविधा प्रबंधन',
      cta1: 'तुरंत उद्धरण प्राप्त करें',
      cta2: 'सेवाएं देखें',
    },
    footer: {
      description: 'हैदराबाद के बेहतरीन प्रतिष्ठानों के लिए प्रीमियम संपत्ति रखरखाव और वैलेट सेवाएं।',
      contact: 'संपर्क करें',
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      joinTeam: 'हमारी टीम में शामिल हों - करियर',
      ecoFriendly: 'पर्यावरण के अनुकूल और कार्बन न्यूट्रल वेबसाइट',
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: string, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('EN');

  const t = (section: string, key: string) => {
    return translations[language]?.[section]?.[key] || translations['EN']?.[section]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
