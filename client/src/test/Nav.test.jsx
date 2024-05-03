import { render, screen } from '@testing-library/react';
import Nav from '../components/nav/Nav';
import { expect, test, describe, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

describe('Nav component', () =>{
    beforeEach(()=>{
        render(<Nav/ >);
    });  
    
    test('render Nav', () =>{
        const logoNav = screen.getByText(/REACT MUSEUM/i); 
        expect(logoNav).toBeDefined();
    });

    test ('render links', () =>{
        const links = screen.getByText(/INICIO/i); 
        expect(links).toHaveAttribute('href', '/');
    });
 })