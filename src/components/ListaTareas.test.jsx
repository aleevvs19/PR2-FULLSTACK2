import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListaTareas from './ListaTareas';

describe('ListaTareas', () => {
  it('muestra el estado inicial', () => {
    render(<ListaTareas />);
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
  });

  it('agrega una tarea y limpia el input', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);

    const input = screen.getByLabelText('Nueva tarea');
    await user.type(input, 'Comprar pan');
    await user.click(screen.getByRole('button', { name: 'Agregar' }));

    expect(screen.getByText('Comprar pan')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('no agrega tareas vacías ni con solo espacios', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);

    const boton = screen.getByRole('button', { name: 'Agregar' });

    await user.click(boton);
    expect(screen.getByText('Total: 0')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Nueva tarea'), '   ');
    await user.click(boton);
    expect(screen.getByText('Total: 0')).toBeInTheDocument();
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
  });

  it('elimina una tarea y conserva la otra', async () => {
    const user = userEvent.setup();
    render(<ListaTareas />);

    const input = screen.getByLabelText('Nueva tarea');
    const agregar = screen.getByRole('button', { name: 'Agregar' });

    await user.type(input, 'Tarea A');
    await user.click(agregar);
    await user.type(input, 'Tarea B');
    await user.click(agregar);
    expect(screen.getByText('Total: 2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Eliminar Tarea A' }));

    expect(screen.queryByText('Tarea A')).not.toBeInTheDocument();
    expect(screen.getByText('Tarea B')).toBeInTheDocument();
    expect(screen.getByText('Total: 1')).toBeInTheDocument();
  });
});