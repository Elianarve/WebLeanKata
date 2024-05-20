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
import { render } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import router from '../router/router.jsx';
import ReactDOM from 'react-dom/client';
import { describe, it, expect } from 'vitest';

describe('Main', () => {
  it('renders RouterProvider with correct router', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);

    render(
      <RouterProvider history={history} router={router} />
    );

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  });
});
