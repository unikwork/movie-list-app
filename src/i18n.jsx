import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import enTranslations from './LanguageJson/en.json';
import frTranslations from './LanguageJson/fr.json';

const resources = {
    en: {
        translation: enTranslations,
    },
    fr: {
        translation: frTranslations,
    },
};

export const locales = Object.keys(resources);
export function getCurrentLocale() {
    return i18n.languages.find((lng => locales.indexOf(lng) !== -1))
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
