import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContador } from './useContador';

describe('useContador', () => {
  it('el valor inicial por defecto es 0', () => {
    const { result } = renderHook(() => useContador());
    expect(result.current.valor).toBe(0);
  });

  it('acepta un valor inicial personalizado', () => {
    const { result } = renderHook(() => useContador({ inicial: 10 }));
    expect(result.current.valor).toBe(10);
  });

  it('incrementa y decrementa con paso de 5', () => {
    const { result } = renderHook(() => useContador({ paso: 5 }));

    act(() => result.current.incrementar());
    expect(result.current.valor).toBe(5);

    act(() => result.current.decrementar());
    expect(result.current.valor).toBe(0);
  });

  it('nunca supera max', () => {
    const { result } = renderHook(() =>
      useContador({ inicial: 8, paso: 5, max: 10 })
    );
    act(() => result.current.incrementar());
    expect(result.current.valor).toBe(10);
    act(() => result.current.incrementar());
    expect(result.current.valor).toBe(10);
  });

  it('nunca baja de min', () => {
    const { result } = renderHook(() =>
      useContador({ inicial: 2, paso: 5, min: 0 })
    );
    act(() => result.current.decrementar());
    expect(result.current.valor).toBe(0);
    act(() => result.current.decrementar());
    expect(result.current.valor).toBe(0);
  });

  it('reiniciar vuelve al valor inicial', () => {
    const { result } = renderHook(() => useContador({ inicial: 3 }));
    act(() => result.current.incrementar());
    act(() => result.current.incrementar());
    expect(result.current.valor).toBe(5);

    act(() => result.current.reiniciar());
    expect(result.current.valor).toBe(3);
  });
});