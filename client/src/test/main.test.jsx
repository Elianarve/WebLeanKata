// import { render, screen } from '@testing-library/react';
// import { RouterProvider } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
// import router from '../router/router.jsx';
// import { describe, it, expect } from 'vitest';

// describe('main.jsx', () => {
//   it('should render the RouterProvider with the correct router', () => {
//     const { container } = render(<RouterProvider router={router} />);
//     expect(container.querySelector('RouterProvider')).toBeInTheDocument();
//     expect(container.querySelector('RouterProvider').props.router).toBe(router);
//   });

//   it('should navigate to the Home component when the URL path is "/"', () => {
//     const { container } = render(<RouterProvider router={router} />);
//     const history = createMemoryHistory();
//     history.push('/');
//     expect(container.querySelector('Home')).toBeInTheDocument();
//   });

//   it('should pass props to the ChallengeCard component when the URL path is "/card/:id"', () => {
//     const { container } = render(<RouterProvider router={router} />);
//     const history = createMemoryHistory();
//     history.push('/card/123');
//     expect(container.querySelector('Card').props.id).toBe('123');
//   });

//   it('should render a 404 component for unknown URL paths', () => {
//     const { container } = render(<RouterProvider router={router} />);
//     const history = createMemoryHistory();
//     history.push('/unknown-path');
//     expect(container.querySelector('NotFound')).toBeInTheDocument();
//   });
// });
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UserProvider from './context/UserContext';
import router from './router/router.jsx';

let container = null;

beforeEach(() => {
  // Configura un nuevo elemento del DOM antes de cada prueba
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Limpia después de cada prueba
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders main component with providers', () => {
  // Crea un historial de memoria para usar con React Router
  const history = createMemoryHistory();

  act(() => {
    // Renderiza el componente principal con los proveedores y el router
    render(
      <React.StrictMode>
        <UserProvider>
          <RouterProvider router={router} history={history}>
            <div id="root">Hello World</div>
          </RouterProvider>
        </UserProvider>
      </React.StrictMode>,
      container
    );
  });

  // Verifica que se haya renderizado el texto "Hello World"
  expect(container.textContent).toBe('Hello World');
});
