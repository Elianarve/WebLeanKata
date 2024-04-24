import { render, screen } from '@testing-library/react';
import Home from '../src/components/home/Home';
import { beforeEach, describe } from 'vitest';
import { MemoryRouter } from "react-router";

describe('test Home', () => {

    beforeEach(() => {
        render(<MemoryRouter><Home/></MemoryRouter>);
    })

    test('render img Background in Home', ()=> {
        const imgs = screen.getAllByRole('img');
        const backgroundImg = Array.from(imgs).find(img => img.classList.contains('background-img'));
        expect(backgroundImg).toBeDefined();
    });
    
    test('render Title in Home', () => {
        const title = screen.getByRole('heading', { level: 2});
        expect(title).toBeDefined();
    });
});

