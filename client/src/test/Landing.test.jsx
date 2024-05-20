import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Landing from '../pages/Landing/Landing.jsx';

describe('Landing page', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Landing />
            </MemoryRouter>
        );
    });


    it("should render 'Regístrate' button", () => {
        const registerButton = screen.getByRole('button', { name: /Regístrate/i });
        expect(registerButton).toBeInTheDocument();
    });

    it("should render 'Iniciar sesión' button", () => {
        const loginButton = screen.getByRole('button', { name: /Iniciar sesión/i });
        expect(loginButton).toBeInTheDocument();
    });

    it("should have correct link for 'Regístrate' button", () => {
        const registerLink = screen.getByRole('link', { name: /Regístrate/i });
        expect(registerLink).toHaveAttribute('href', '/RegisterForm');
    });

    it("should have correct link for 'Iniciar sesión' button", () => {
        const loginLink = screen.getByRole('link', { name: /Iniciar sesión/i });
        expect(loginLink).toHaveAttribute('href', '/login');
    });

    it("should render the landing image", () => {
        const imgElement = screen.getByAltText('img-landing');
        expect(imgElement).toBeInTheDocument();
    });
});
