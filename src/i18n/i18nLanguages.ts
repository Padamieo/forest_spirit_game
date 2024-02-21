/**
 * List with all the available languages.
 * The value should be a valid language code and the folder name for the translations.
 */
export enum Languages {
  nl = 'nl',
  en = 'en',
}

export const i18nLanguages = {
  defaultLanguage: 'en',
  languages: Object.values(Languages),
};
