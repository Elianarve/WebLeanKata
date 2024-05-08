import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../components/nav/Nav';
import { expect, test, describe } from 'vitest';
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router";

describe('Nav component', () => {
    test('The navbar renders', async () => {
        await render(<MemoryRouter><Nav/></MemoryRouter>);
        const logoNavar = screen.getByAltText('logo');
        expect(logoNavar).toBeDefined();
    });

    test('It has a link to Inicio', async () => {
        await render(<MemoryRouter><Nav/></MemoryRouter>);
        const links = screen.getByText(/Inicio/i);
        expect(links).toHaveAttribute('href', '/');
    });

    test('It has a link to Tablero principal', async () => {
        await render(<MemoryRouter><Nav/></MemoryRouter>);
        const links = screen.getByText(/Tablero principal/i);
        expect(links).toHaveAttribute('href', '/Edit/:id');
    });

    // test('Toggle menu and check links', () => {
    //     render(<MemoryRouter><Nav/></MemoryRouter>);
      
    //     expect(screen.queryByText('Nuevo')).not.toBeInTheDocument();
    //     expect(screen.queryByText('Existente')).not.toBeInTheDocument();
      
    //     fireEvent.click(screen.getByText('Proyectos y retos'));
      
    //     expect(screen.getByText('Nuevo')).toBeInTheDocument();
    //     expect(screen.getByText('Existente')).toBeInTheDocument();
      
    //     fireEvent.click(screen.getByText('Existente'));
    //     expect(window.location.href).toContain('/card/:id');
    //   });
});