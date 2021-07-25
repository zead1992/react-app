import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enRes from './locales/en/ns1.json';
import arRes from './locales/ar/ns1.json';

export const resources = {
    en: enRes,
    ar: arRes
} as const;

i18n
    .use(initReactI18next)
    .init({
        lng: "en",
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            bindI18n: 'languageChanged',
        }
    });

export default i18n;