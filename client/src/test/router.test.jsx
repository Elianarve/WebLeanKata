import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import router from '../router/router';
import test from 'jest';
import { expect } from 'jest';

test('renders Obstacle component when visiting /obstacle', () => {
  render(
    <MemoryRouter initialEntries={['/obstacle']}>
      {router}
    </MemoryRouter>
  );

  // Reemplaza "Obstacle" con el texto o elemento real en tu componente Obstacle
  expect(screen.getByText('Obstacle')).toBeInTheDocument();
});