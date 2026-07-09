import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, I18nStrings } from '../i18n/types';
import en from '../i18n/en';
import ru from '../i18n/ru';
import ar from '../i18n/ar';

const STORAGE_KEY = 'appLanguage';

interface TranslationMap {
  [wordId: number]: string;
}

interface TopicTranslationMap {
  [topicName: string]: string;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: I18nStrings;
  dir: 'ltr' | 'rtl';
  getTranslation: (wordId: number, originalTranslation: string) => string;
  translateTopic: (topicName: string) => string;
}

const translationsCache: Record<Language, TranslationMap | null> = {
  en: null,
  ru: null,
  ar: null,
};

const topicTranslationsCache: Record<Language, TopicTranslationMap | null> = {
  en: null,
  ru: null,
  ar: null,
};

const stringsMap: Record<Language, I18nStrings> = { en, ru, ar };

const LanguageContext = createContext<LanguageContextValue | null>(null);

function loadLanguage(): Language {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'en' || raw === 'ru' || raw === 'ar') return raw;
  } catch {}
  return 'ru'; // Default to Russian (existing behavior)
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to load');
  return res.json();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(loadLanguage);
  const [translations, setTranslations] = useState<TranslationMap>({});
  const [topicTranslations, setTopicTranslations] = useState<TopicTranslationMap>({});

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  // Load word translations when language changes
  useEffect(() => {
    if (language === 'ru') {
      setTranslations({});
      return;
    }

    if (translationsCache[language]) {
      setTranslations(translationsCache[language]!);
      return;
    }

    const fileName = language === 'en' ? '/translations_en.json' : '/translations_ar.json';
    fetchJson(fileName)
      .then((data: TranslationMap) => {
        translationsCache[language] = data;
        setTranslations(data);
      })
      .catch(() => {
        setTranslations({});
      });
  }, [language]);

  // Load topic translations when language changes
  useEffect(() => {
    if (language === 'ru') {
      setTopicTranslations({});
      return;
    }

    if (topicTranslationsCache[language]) {
      setTopicTranslations(topicTranslationsCache[language]!);
      return;
    }

    const fileName = language === 'en' ? '/topics_en.json' : '/topics_ar.json';
    fetchJson(fileName)
      .then((data: TopicTranslationMap) => {
        topicTranslationsCache[language] = data;
        setTopicTranslations(data);
      })
      .catch(() => {
        setTopicTranslations({});
      });
  }, [language]);

  const t = stringsMap[language];
  const dir: 'ltr' | 'rtl' = language === 'ar' ? 'rtl' : 'ltr';

  const getTranslation = useCallback(
    (wordId: number, originalTranslation: string): string => {
      if (language === 'ru') return originalTranslation;
      return translations[wordId] ?? originalTranslation;
    },
    [language, translations]
  );

  const translateTopic = useCallback(
    (topicName: string): string => {
      if (language === 'ru') return topicName;
      return topicTranslations[topicName] ?? topicName;
    },
    [language, topicTranslations]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, getTranslation, translateTopic }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}