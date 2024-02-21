import { FormatFunction } from 'i18next';

const formatDayDate: FormatFunction = (value, format, lng) => {
  return `${new Intl.DateTimeFormat(lng, {
    weekday: 'long',
  }).format(value)} ${new Intl.DateTimeFormat(lng, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value)}`;
};

export const formatDate: FormatFunction = (value, format, lng) => {
  if (!(value instanceof Date)) {
    return value;
  }

  switch (format) {
    case 'long':
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      return new Intl.DateTimeFormat(lng, options).format(value);
    case 'day-date':
      return formatDayDate(value, format, lng);
    default:
      return new Intl.DateTimeFormat(lng).format(value);
  }
};
