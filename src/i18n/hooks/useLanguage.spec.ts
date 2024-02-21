import { renderHook } from '@testing-library/react';

import { useLanguage } from './useLanguage';

describe('useLanguage hook', () => {
  it('should return at least t function and i18n', () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.t).toBeDefined();
    expect(result.current.i18n).toBeDefined();
    expect(result.current.i18n.language).toEqual('en-US');
    expect(result.current.numberFormat(2000)).toEqual('2,000');
  });

  it('shortenNumber should return the actual value when less then 1000', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.shortenNumber(234)).toEqual('234');
  });

  it('shortenNumber should return value with `K`', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.shortenNumber(1000)).toEqual('1K');
    expect(result.current.shortenNumber(12345)).toEqual('12K');
    expect(result.current.shortenNumber(12645)).toEqual('13K');
  });

  it('shortenNumber should return value with `M`', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.shortenNumber(1000000)).toEqual('1M');
    expect(result.current.shortenNumber(110000000)).toEqual('110M');
    expect(result.current.shortenNumber(110600000)).toEqual('111M');
  });
});
