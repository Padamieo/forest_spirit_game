import { isTranslationAvailable } from './isTranslationAvailable';

describe('isTranslationAvailable utils', () => {
  const t = jest.fn();

  it("should check if translation is defined and doesn't match the key", () => {
    t.mockImplementationOnce(() => 'notKey');
    expect(isTranslationAvailable('key', t)).toBeTruthy();
  });

  it('should check if translation is not defined or does match the key', () => {
    t.mockImplementationOnce(() => undefined);
    expect(isTranslationAvailable('key', t)).toBeFalsy();

    t.mockImplementationOnce((key: string) => key);
    expect(isTranslationAvailable('key', t)).toBeFalsy();
  });
});
