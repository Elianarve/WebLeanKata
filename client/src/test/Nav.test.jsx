// src/test/Nav.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Nav from '../components/nav/Nav.jsx'; // Ajusta la ruta según la ubicación de tu archivo Nav.jsx
import logo from '../assets/img/logotipo2.png'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo de imagen
import { UserContext } from '../context/UserContext.jsx'; // Importa el UserContext correctamente

describe('Nav component', () => {
    const mockUserContextValue = {
        user: { name: 'Test User' },
        userAuth: true
    };

    beforeEach(() => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={mockUserContextValue}>
                    <Nav />
                </UserContext.Provider>
            </MemoryRouter>
        );
    });

    it("should render the logo", () => {
        const logoImg = screen.getByAltText('logo');
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveAttribute('src', logo);
    });

    it("should render 'Lean Kata' link", () => {
        const leanKataLink = screen.getByRole('link', { name: /Lean K ata/i });
        expect(leanKataLink).toBeInTheDocument();
        expect(leanKataLink).toHaveAttribute('href', "/home");
    });

    it("should render 'Crear Reto' link", () => {
        const crearRetoLink = screen.getByRole('link', { name: /Crear Reto/i });
        expect(crearRetoLink).toBeInTheDocument();
        expect(crearRetoLink).toHaveAttribute('href', '/process');
    });

    it("should render 'Ver Existente' link", () => {
        const verExistenteLink = screen.getByRole('link', { name: /Ver Existente/i });
        expect(verExistenteLink).toBeInTheDocument();
        expect(verExistenteLink).toHaveAttribute('href', '/home');
    });

    it("should render user name when user is authenticated", () => {
        const userName = screen.getByText(mockUserContextValue.user.name);
        expect(userName).toBeInTheDocument();
    });

    it("should render the logout button", () => {
        const logoutButton = screen.getByRole('button', { name: /Cerrar sesión/i }); 
        expect(logoutButton).toBeInTheDocument();
    });
});
