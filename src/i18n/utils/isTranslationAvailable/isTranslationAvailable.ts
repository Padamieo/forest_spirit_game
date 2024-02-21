import { TFunction } from 'i18next';

export const isTranslationAvailable = (i18nKey: string, t: TFunction) => {
  const translation = t(i18nKey);
  return !!(translation && translation !== i18nKey);
};
