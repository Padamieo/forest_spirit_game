import { formatDate } from './i18nFormatDate';

describe('formatDate', () => {
  it('should return the correct formated date in the long format', () => {
    const date = new Date(2022, 11, 31);
    expect(formatDate(date, 'long', 'en-US')).toEqual('Saturday, December 31, 2022');
    expect(formatDate(date, 'long', 'de')).toEqual('Samstag, 31. Dezember 2022');
  });

  it('should return the correct formated date in the day-date format', () => {
    const date = new Date(2022, 11, 31);
    expect(formatDate(date, 'day-date', 'en-US')).toEqual('Saturday 12/31/2022');
    expect(formatDate(date, 'day-date', 'de')).toEqual('Samstag 31.12.2022');
  });

  it('should return the input when it is no valid date', () => {
    expect(formatDate('no date', 'day-date', 'en-US')).toEqual('no date');
    expect(formatDate(null, 'day-date', 'en-US')).toBeNull();
  });
});
