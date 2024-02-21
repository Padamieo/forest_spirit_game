import i18next, { i18n as I18nType, InitOptions } from 'i18next';
import LanguageDetector, { CustomDetector } from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { I18nLanguages } from '../types';
import { i18nGetDefaultInitOptions } from './i18nGetDefaultInitOptions';

export interface I18nProps {
  getInitOptions?: (initDefaults: Partial<InitOptions>) => Promise<Partial<InitOptions>>;
  //languageDetectors?: [];
  languageChangedHandler?: (changedLng: string, i18nextInstance: I18nType) => void;
  resources?: InitOptions['resources'];
  i18nLanguages: I18nLanguages;
}

type InitI18nextType = (props: I18nProps) => Promise<I18nType>;

const initI18next: InitI18nextType = async ({
  getInitOptions,
  //languageDetectors = [],
  languageChangedHandler,
  i18nLanguages,
  resources,
}) => {
  const languageDetector = new LanguageDetector();

  //languageDetectors.forEach((detector) => languageDetector.addDetector(detector));

  const initDefaults = i18nGetDefaultInitOptions({
    i18nLanguages,
    resources
  });

  const initOptions = getInitOptions ? await getInitOptions(initDefaults) : { ...initDefaults };
  const i18nInstance = i18next.createInstance();

  if (languageChangedHandler) {
    i18nInstance.on('languageChanged', (changedLng) => {
      languageChangedHandler(changedLng, i18nInstance);
    });
  }
  // .use(languageDetector)
  i18nInstance.use(HttpApi).use(languageDetector).use(initReactI18next).init(initOptions);

  return i18nInstance;
};

export default initI18next;
