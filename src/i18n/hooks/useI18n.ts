import { i18n } from 'i18next';
import { useEffect, useRef, useState } from 'react';

import initI18nNext, { I18nProps } from '../utils/initI18next';

/**
 * Instantiate i18n
 * @param props Props to pass to the instantiation.
 * @returns i18n instance
 */
export const useI18n = (props: I18nProps) => {
  const [isI18nLoaded, setI18nLoaded] = useState(false);
  const i18nRef = useRef<i18n | null>(null);

  useEffect(() => {
    const init = async () => {
      const i18nextInstance = await initI18nNext(props);
      i18nRef.current = i18nextInstance;
      setI18nLoaded(!!i18nextInstance);
    };

    init();
  }, []);

  return isI18nLoaded ? i18nRef.current : null;
};
