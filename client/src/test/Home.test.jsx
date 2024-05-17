import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../pages/home/Home';
import { describe, it, expect } from 'vitest';
import mock from 'jest-mock';

describe('Home component', () => {
  it('should fetch challenges and actual states on mount', async () => {
    const mockGetChallenge = mock.fn().mockResolvedValue([]);
    const mockGetActualState = mock.fn().mockResolvedValue([]);
    render(<Home getChallenge={mockGetChallenge} getActualState={mockGetActualState} />);
    await waitFor(() => expect(mockGetChallenge).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockGetActualState).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByRole('row')).toHaveLength(0); // No challenges initially
  });
});
