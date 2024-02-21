import { isTranslationAvailable } from './utils/isTranslationAvailable';
import { numberFormat } from './utils/numberFormat';

export { useI18n } from './hooks/useI18n';
export { useLanguage } from './hooks/useLanguage';

interface Utils {
  isTranslationAvailable: typeof isTranslationAvailable;
  numberFormat: typeof numberFormat;
}

export const utils: Utils = {
  isTranslationAvailable,
  numberFormat,
};

export { i18nLanguages } from './i18nLanguages';
