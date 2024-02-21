import 'i18next';

export type I18nLanguages = {
  languages: string[];
  defaultLanguage: string;
};

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
