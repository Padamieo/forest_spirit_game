import { FC, PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18nLanguages, useI18n } from '../../i18n';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  const i18next = useI18n({
    i18nLanguages,
  });

  return i18next && <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
};
