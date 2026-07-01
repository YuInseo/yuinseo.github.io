import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';

// Demo build: fixed Korean locale, no browser language detection.
if (!i18n.isInitialized) {
    i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: en },
                ko: { translation: ko },
                ja: { translation: ja },
            },
            lng: 'ko',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
}

export default i18n;
