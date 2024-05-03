import { render, screen } from '@testing-library/react';
import Footer from '../src/components/footer/footer';
import { beforeEach, describe } from 'vitest';

describe('Test Footer', () => {
    beforeEach(() => {
        render(<Footer />);
    });
    
    test('Copyright img appears in Footer', ()=> {
        const imgCopyright = screen.getByAltText('Copyright');
        expect(imgCopyright).toBeDefined();
    });
    
    test('GitHub img appears in Footer', () => {
    
        const imgGit = screen.getByRole('img', { name: 'GitHub'});
        expect(imgGit).toBeDefined();
    });
})
