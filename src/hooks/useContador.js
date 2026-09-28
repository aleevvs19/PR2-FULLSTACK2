import { useState } from 'react';

export function useContador({ inicial = 0, paso = 1, min = -Infinity, max = Infinity } = {}) {
  const [valor, setValor] = useState(inicial);
  const incrementar = () => setValor((v) => Math.min(v + paso, max));
  const decrementar = () => setValor((v) => Math.max(v - paso, min));
  const reiniciar = () => setValor(inicial);
  return { valor, incrementar, decrementar, reiniciar };
}