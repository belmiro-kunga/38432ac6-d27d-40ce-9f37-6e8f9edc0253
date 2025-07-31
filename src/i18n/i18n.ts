export type Language = 'pt' | 'en' | 'fr';

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export const defaultLanguage: Language = 'pt';

// Import all translations
import pt from './locales/pt.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const translations = {
  pt,
  en,
  fr,
};

export type TranslationKey = keyof typeof pt;
export type NestedTranslationKey = {
  [K in keyof typeof pt]: typeof pt[K] extends object
    ? `${K}.${keyof typeof pt[K] & string}`
    : K;
}[keyof typeof pt];