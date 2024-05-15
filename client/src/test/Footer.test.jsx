import { render } from '@testing-library/react';
import Footer from '../components/footer/footer';
import chai, { expect } from 'chai';
import chaiDom from 'chai-dom';
import { describe, it} from 'vitest';

chai.use(chaiDom);

describe('Footer component', () => {
  it('renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('p:nth-child(1)')).to.have.text('Politica de privacidad | Terminos de uso');
    expect(container.querySelector('p:nth-child(2)')).to.have.text('© 2006 - 2021 Wix.com, Inc');
  });

  it('has correct styles', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('p:nth-child(1)')).to.have.class('transparentFooter');
    expect(container.querySelector('p:nth-child(2)')).to.have.class('blueFooter');
    // expect(container.querySelector('p:nth-child(1)')).to.have.style('margin-top', '70px');
    // expect(container.querySelector('p:nth-child(2)')).to.have.style('color', 'blue');
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
