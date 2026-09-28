import { describe, it, expect } from 'vitest';
import { formatearPrecio, aplicarDescuento } from './precio';

describe('formatearPrecio', () => {
  it.each([
    [0, '$0'],
    [999, '$999'],
    [1000, '$1.000'],
    [1234567, '$1.234.567'],
  ])('formatea %s como %s', (entrada, esperado) => {
    expect(formatearPrecio(entrada)).toBe(esperado);
  });

  it('redondea los decimales', () => {
    expect(formatearPrecio(1999.6)).toBe('$2.000');
  });

  it('lanza error con un string', () => {
    expect(() => formatearPrecio('abc')).toThrow('Valor inválido');
  });

  it('lanza error con NaN', () => {
    expect(() => formatearPrecio(NaN)).toThrow('Valor inválido');
  });
});

describe('aplicarDescuento', () => {
  it('0% no cambia el precio', () => {
    expect(aplicarDescuento(1000, 0)).toBe(1000);
  });

  it('15% descuenta correctamente', () => {
    expect(aplicarDescuento(1000, 15)).toBe(850);
  });

  it('100% deja el precio en 0', () => {
    expect(aplicarDescuento(1000, 100)).toBe(0);
  });

  it('lanza error con 150%', () => {
    expect(() => aplicarDescuento(1000, 150)).toThrow('Porcentaje inválido');
  });
});