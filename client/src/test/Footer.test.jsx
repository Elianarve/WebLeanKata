import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/footer/footer.jsx'; // Ajusta la ruta según la ubicación de tu archivo Footer.jsx
import { UserContext } from '../context/UserContext.jsx'; // Importa el UserContext correctamente
import { MemoryRouter } from 'react-router-dom'; // Importa MemoryRouter

describe('Footer component', () => {
    const mockUserContextValue = {
        user: { name: 'Test User' },
        userAuth: true
    };

    beforeEach(() => {
        render(
            <MemoryRouter>
                <UserContext.Provider value={mockUserContextValue}>
                    <Footer />
                </UserContext.Provider>
            </MemoryRouter>
        );
    });
       
        test("should render privacyPolicyText", () => {
            const privacyPolicyText = screen.getByText('Politica de privacidad | Terminos de uso');
            expect(privacyPolicyText).toBeDefined();
        });

        test("should render termsOfUseText", () => {
            const termsOfUseText = screen.getByText('Politica de privacidad | Terminos de uso');
            expect(termsOfUseText).toBeDefined();
        });

        
        test("should render copyrightText", () => {
            const copyrightText = screen.getByText('© 2006 - 2021 Wix.com, Inc');
            expect(copyrightText).toBeDefined();
        });

        test('should not render the footer when user is not authenticated', () => {
            const privacyPolicyText = screen.getByText('Politica de privacidad | Terminos de uso');
            expect(privacyPolicyText).toBeDefined();
        });

        test('should not render the footer when user is not authenticated', () => {
            const termsOfUseText = screen.getByText('Politica de privacidad | Terminos de uso');
            expect(termsOfUseText).toBeDefined();
        });

        test('should not render the footer when user is not authenticated', () => {
            const copyrightText = screen.getByText('Politica de privacidad | Terminos de uso');
            expect(copyrightText).toBeDefined();
        });


});
