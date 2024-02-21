import { i18n as I18nType } from 'i18next';

const regexp = /^\/([a-z]{2}(\-?[A-Z]{2})?)\/.*/;

export const languageChangedHandler = (language: string, i18nextInstance: I18nType) => {
  if (!language || !Array.isArray(i18nextInstance?.options?.supportedLngs)) {
    return;
  }

  const windowLocation = (typeof window !== 'undefined' && window?.location) || ({} as Record<string, string>);
  const { supportedLngs } = i18nextInstance.options;
  const newLanguage = supportedLngs.find((lng) => lng.indexOf(language) === 0);
  const pathname = windowLocation.pathname || '';
  const path = `${pathname}${pathname.slice(-1) !== '/' ? '/' : ''}`;
  const [_, currentLang] = regexp.exec(path) || ['', ''];
  if (currentLang === newLanguage || !newLanguage) {
    return;
  }
  const newPath = supportedLngs.includes(currentLang)
    ? path.replace(`/${currentLang}`, `/${newLanguage}`)
    : `/${newLanguage}/`;
  if (path !== newPath) {
    window.location.replace(`${newPath}${window.location.search}`);
  }
};
