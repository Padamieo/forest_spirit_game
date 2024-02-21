// import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

//import { isTranslationAvailable as isTranslationAvailableUtil } from '../utils/isTranslationAvailable';
// import { numberFormat as numberFormatUtil } from '../utils/numberFormat';

export const useLanguage = () => {
  const translation = useTranslation();
  const language = translation.i18n.language;

  // const numberFormat = useCallback(
  //   (number: number) => {
  //     return numberFormatUtil(number, language);
  //   },
  //   [language],
  // );

  // const isTranslationAvailable = useCallback(
  //   (i18nKey: string) => {
  //     return isTranslationAvailableUtil(i18nKey, translation.t);
  //   },
  //   [translation],
  // );

  // const shortenNumber = useCallback(
  //   (number: number) => {
  //     return numberFormatUtil(number, language, { notation: 'compact' });
  //   },
  //   [language],
  // );

  return {
    ...translation,
    i18n: {
      ...translation.i18n,
      language,
    },
    // numberFormat,
    // isTranslationAvailable,
    // shortenNumber,
  };
};
