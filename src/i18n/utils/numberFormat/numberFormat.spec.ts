import { numberFormat } from './numberFormat';

describe('numberFormat util', () => {
  it('should return a formatted number', () => {
    expect(numberFormat(2000.23, 'de')).toEqual('2.000,23');
  });

  it('should add a space as thousand separator for Spanish', () => {
    expect(numberFormat(2000.23, 'es-ES')).toEqual('2000,23');
  });

  it('should be English style for Mexican Spanish', () => {
    expect(numberFormat(2000.23, 'es-MX')).toEqual('2000,23');
  });

  it('should be English style for Arabic', () => {
    expect(numberFormat(2000.23, 'ar')).toEqual('2,000.23');
  });

  it('should default to English when language is not valid', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore  Needed for crating the test
    expect(numberFormat(2000.23, 'not valid')).toEqual('2,000.23');
  });
});
