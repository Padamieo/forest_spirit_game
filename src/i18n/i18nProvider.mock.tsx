import { i18n } from 'i18next';
import { FC, ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import initI18nNext from './utils/initI18next';

const resources = {
  nl: {
    general: {
      singleString: 'This is just a translation',
      withLineBreak: 'Test with<desktopBreak /><tabletBreak /><mobileBreak />a desktop break',
      withLinkItem: 'Test with <linkItem href="https://test.nl">realy cool</linkItem> a link Item',
      withNoBreak: 'Test with <noBreak>realy cool text</noBreak> with noBreak item',
      withParagraph: 'Test with <paragraph>realy cool text</paragraph> with a paragraph',
      withHighlight: 'Test with <highlight>realy cool text</highlight> with a highlight',
      withEnglish: 'Test with <english>realy cool text</english> with a english font',
      withList:
        'Test with <list><listItem>Item 1</listItem><listItem>Item 2</listItem><listItem>Item 3</listItem></list> with a paragraph',
      withCustom: 'Test with <custom>realy cool text</custom> with a custom component',
    },
  },
};

export interface Props {
  children: ReactNode;
}

let instance: i18n;
const getInstance = () => {
  return initI18nNext({
    i18nLanguages: {
      languages: ['nl'],
      defaultLanguage: 'nl',
    },
    resources,
  });
};

getInstance().then((result) => (instance = result));

// Wrap your stories in the I18nextProvider component
export const I18nProviderMock: FC<Props> = ({ children }) => {
  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
};
