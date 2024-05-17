import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

// Mock de los servicios que utilizas en el componente
jest.mock('../../services/challengeServices', () => ({
  getChallenge: jest.fn(() => Promise.resolve([])),
}));
jest.mock('../../services/actualStateServices', () => ({
  getActualState: jest.fn(() => Promise.resolve([])),
}));

describe('Home component', () => {
  it('renders the component correctly', async () => {
    render(<Home />);
    // Verifica que el título esté presente
    expect(screen.getByText(/descubre la tabla de retos/i)).toBeInTheDocument();
    // Verifica que el botón de calendario esté presente
    expect(screen.getByRole('button', { name: /calendario/i })).toBeInTheDocument();
    // Verifica que la tabla esté presente
    expect(screen.getByRole('table')).toBeInTheDocument();

    // Comprueba que el mensaje de error no esté presente
    expect(screen.queryByText(/no se pudieron cargar los desafíos/i)).not.toBeInTheDocument();

    // Espera a que se resuelvan las promesas de los servicios
    await screen.findByText(/descripción no encontrada/i);
  });

  it('handles search correctly', async () => {
    render(<Home />);
    // Simula la búsqueda
    userEvent.type(screen.getByRole('textbox'), 'test');
    // Verifica que el resultado de la búsqueda esté presente
    expect(screen.queryByText(/descripción no encontrada/i)).not.toBeInTheDocument();
  });

  it('toggles calendar visibility', () => {
    render(<Home />);
    // Verifica que el calendario esté oculto inicialmente
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    // Simula hacer clic en el botón del calendario
    userEvent.click(screen.getByRole('button', { name: /calendario/i }));
    // Verifica que el calendario esté visible después de hacer clic en el botón
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
