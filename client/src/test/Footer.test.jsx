import { render, screen } from '@testing-library/react';
import Footer from '../components/footer/footer';
import { describe, it, expect } from 'vitest';

describe('Footer component', () => {
  it('renders the correct content', () => {
    render(<Footer />);
    expect(screen.queryByText('Politica de privacidad | Terminos de uso')).toBeTruthy();
    expect(screen.queryByText('© 2006 - 2021 Wix.com, Inc')).toBeTruthy();
  });
});

// import { render, screen } from '@testing-library/react';
// import Footer from '../components/footer/footer';
// import { describe, it, expect } from 'vitest';

// describe('Footer component', () => {
//   it('renders correctly', () => {
//     render(<Footer />);
//     expect(screen.getByText('Politica de privacidad | Terminos de uso')).toBeInTheDocument();
//     expect(screen.getByText('© 2006 - 2021 Wix.com, Inc')).toBeInTheDocument();
//   });

//   it('has correct styles', () => {
//     render(<Footer />);
//     const transparentFooter = screen.getByText('Politica de privacidad | Terminos de uso');
//     const blueFooter = screen.getByText('© 2006 - 2021 Wix.com, Inc');
//     expect(transparentFooter).toHaveStyle('margin-top: 70px');
//     expect(blueFooter).toHaveStyle('color: blue');
//   });
// });
