export function formatearPrecio(valor) {
  if (typeof valor !== 'number' || Number.isNaN(valor)) {
    throw new Error('Valor inválido');
  }
  const entero = Math.round(valor);
  return '$' + entero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function aplicarDescuento(precio, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('Porcentaje inválido');
  }
  return Math.round(precio * (1 - porcentaje / 100));
}