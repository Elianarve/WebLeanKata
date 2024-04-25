import { render, screen } from '@testing-library/react';
import Nav from '../src/components/nav/Nav';
import { MemoryRouter } from "react-router";

describe('test Nav', () => {
    test('Title Navbar appears', () => {
        render(<MemoryRouter><Nav/></MemoryRouter>)
        const titleNav = screen.getByText(/museo de bicicletas/i);
        expect(titleNav).toBeDefined();
    })
})

