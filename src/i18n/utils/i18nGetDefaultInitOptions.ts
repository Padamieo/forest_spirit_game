import { InitOptions } from 'i18next';
import pkg from '../../../package.json';

import { I18nLanguages } from '../types';
import { formatDate } from './i18nFormatDate';

interface InitDefaultOptions {
  i18nLanguages: I18nLanguages;
  resources?: InitOptions['resources'];
}

type I18nGetDefaultInitOptions = (options: InitDefaultOptions) => InitOptions;

export const i18nGetDefaultInitOptions: I18nGetDefaultInitOptions = ({ i18nLanguages, resources }) => {
  const options: InitOptions = {
    debug: false,
    load: 'currentOnly',
    ns: 'translation',
    defaultNS: 'translation',
    supportedLngs: i18nLanguages.languages,
    fallbackLng: i18nLanguages.defaultLanguage,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      excludeCacheFor: ['cimode'],
    },
    // allow keys to be phrases having `:`, `.`
    nsSeparator: false,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      format: formatDate,
    },
    returnNull: false,
    react: {
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      nsMode: 'default',
      useSuspense: true,
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'b', 'i'],
    },
  };

  if (!resources) {
    options.backend = {
      loadPath: '/public/locales/{{lng}}/{{ns}}.json',
      crossDomain: false,
      queryStringParams: {
        cacheV: pkg.version ?? Date.now(),
      },
    };
  } else {
    options.resources = resources;
  }

  return options;
};
