import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'uz';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

type TranslationType = {
    [key: string]: string;
};

interface TranslationsType {
    en: TranslationType;
    uz: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: TranslationsType = {
    en: {
        'home.title': 'Welcome to EZMA',
        'home.subtitle': 'Your digital library management system',
        'home.search.placeholder': 'Search for books...',
        'home.search.button': 'Search',
        'home.stats.books': 'Total Books',
        'home.stats.libraries': 'Libraries',
        'home.stats.users': 'Users',
        'home.stats.activity': 'Recent Activity',
        'home.about.title': 'About EZMA',
        'home.about.description': 'EZMA is a modern library management system that helps you organize and manage your library resources efficiently.',
        'home.faq.title': 'Frequently Asked Questions',
        'home.faq.question1': 'What is EZMA?',
        'home.faq.answer1': 'EZMA is a digital library management system that helps you organize and manage your library resources.',
        'home.faq.question2': 'How to use EZMA?',
        'home.faq.answer2': 'You can use EZMA by searching for books, managing your library, and tracking your reading progress.',
        'home.faq.question3': 'Is EZMA free?',
        'home.faq.answer3': 'Yes, EZMA is completely free to use.',
        'home.faq.question4': 'How to contact support?',
        'home.faq.answer4': 'You can contact our support team through the contact form or email.',
        'home.faq.question5': 'Can I suggest features?',
        'home.faq.answer5': 'Yes, we welcome feature suggestions from our users.',
        'home.faq.question6': 'Is my data secure?',
        'home.faq.answer6': 'Yes, we take data security very seriously and implement the best practices to protect your information.',
    },
    uz: {
        'home.title': 'EZMAga xush kelibsiz',
        'home.subtitle': 'Sizning raqamli kutubxona boshqaruv tizimingiz',
        'home.search.placeholder': 'Kitoblarni qidirish...',
        'home.search.button': 'Qidirish',
        'home.stats.books': 'Jami Kitoblar',
        'home.stats.libraries': 'Kutubxonalar',
        'home.stats.users': 'Foydalanuvchilar',
        'home.stats.activity': 'So\'nggi Faoliyat',
        'home.about.title': 'EZMA haqida',
        'home.about.description': 'EZMA - bu kutubxona resurslarini samarali tashkil qilish va boshqarishga yordam beradigan zamonaviy kutubxona boshqaruv tizimi.',
        'home.faq.title': 'Tez-tez so\'raladigan savollar',
        'home.faq.question1': 'EZMA nima?',
        'home.faq.answer1': 'EZMA - bu kutubxona resurslarini tashkil qilish va boshqarishga yordam beradigan raqamli kutubxona boshqaruv tizimi.',
        'home.faq.question2': 'EZMA dan qanday foydalanish mumkin?',
        'home.faq.answer2': 'Siz EZMA dan kitoblarni qidirish, kutubxonangizni boshqarish va o\'qish jarayoningizni kuzatish orqali foydalanishingiz mumkin.',
        'home.faq.question3': 'EZMA bepulmi?',
        'home.faq.answer3': 'Ha, EZMA dan foydalanish mutlaqo bepul.',
        'home.faq.question4': 'Qo\'llab-quvvatlash bilan qanday bog\'lanish mumkin?',
        'home.faq.answer4': 'Siz qo\'llab-quvvatlash jamoamiz bilan aloqa shakli yoki elektron pochta orqali bog\'lanishingiz mumkin.',
        'home.faq.question5': 'Funksiyalarni taklif qilishim mumkinmi?',
        'home.faq.answer5': 'Ha, biz foydalanuvchilarimizning funksiya takliflarini qabul qilamiz.',
        'home.faq.question6': 'Mening ma\'lumotlarim xavfsizmi?',
        'home.faq.answer6': 'Ha, biz ma\'lumotlar xavfsizligini juda jiddiy qabul qilamiz va sizning ma\'lumotlaringizni himoya qilish uchun eng yaxshi amaliyotlarni qo\'llaymiz.',
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'uz' : 'en';
        changeLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}; 