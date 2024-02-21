export const numberFormat = (
  number: number,
  language: string,
  formatOptions: Intl.NumberFormatOptions | undefined = undefined,
) => {
  let result;

  // The thousand separator in Spanish has changed recently. Not all browsers handle this properly.
  // In some cases the separator is missing and therefore not replacable. Also for numbers < 10000, the group separator is not displayed.
  // That's why Polish is used in this case, because they have the same number format
  if (language === 'es-ES' || language === 'es-MX') {
    return new Intl.NumberFormat('pl', formatOptions).format(number);
  }

  // prevent ar numbers being shown.
  if (language === 'ar') {
    return new Intl.NumberFormat('en-US', formatOptions).format(number);
  }

  try {
    result = new Intl.NumberFormat(language, formatOptions).format(number);
  } catch {
    result = new Intl.NumberFormat('en-US', formatOptions).format(number);
  }

  return result;
};
