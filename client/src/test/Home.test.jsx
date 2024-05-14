// import { render, screen } from '@testing-library/react';
// import Home from '../src/components/home/Home';
// import { beforeEach, describe } from 'vitest';
// import { MemoryRouter } from "react-router";

// describe('test Home', () => {

//     beforeEach(() => {
//         render(<MemoryRouter><Home/></MemoryRouter>);
//     })

//     test('render img Background in Home', ()=> {
//         const imgs = screen.getAllByRole('img');
//         const backgroundImg = Array.from(imgs).find(img => img.classList.contains('background-img'));
//         expect(backgroundImg).toBeDefined();
//     });
    
//     test('render Title in Home', () => {
//         const title = screen.getByRole('heading', { level: 2});
//         expect(title).toBeDefined();
//     });
// });
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../pages/home/Home';
import { describe, it, expect } from 'vitest';
import jest from 'jest';

describe('Home component', () => {
  it('should render the component correctly', () => {
    render(<Home />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Calendario' })).toBeInTheDocument();
    expect(screen.getByText('Reto')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
  });

  it('should fetch challenges and actual states on mount', async () => {
    const mockGetChallenge = jest.fn().mockResolvedValue([]);
    const mockGetActualState = jest.fn().mockResolvedValue([]);
    render(<Home getChallenge={mockGetChallenge} getActualState={mockGetActualState} />);
    await waitFor(() => expect(mockGetChallenge).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockGetActualState).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByRole('row')).toHaveLength(0); // No challenges initially
  });

  it('should handle errors during data fetching', async () => {
    const mockGetChallenge = jest.fn().mockRejectedValue(new Error('Error fetching challenges'));
    const mockGetActualState = jest.fn().mockRejectedValue(new Error('Error fetching actual states'));
    render(<Home getChallenge={mockGetChallenge} getActualState={mockGetActualState} />);
    await waitFor(() => expect(screen.getByText('No se pudieron cargar los desafíos')).toBeInTheDocument());
  });

  it('should filter challenges based on search term', async () => {
    const challenges = [
      { id: 1, name: 'Challenge 1', actual_state: 'En progreso' },
      { id: 2, name: 'Challenge 2', actual_state: 'Completado' },
    ];
    render(<Home challenges={challenges} />);
    const searchBar = screen.getByRole('textbox');
    await userEvent.type(searchBar, 'Challenge 1');
    expect(screen.queryAllByRole('row')).toHaveLength(1); // Only Challenge 1 should be displayed
  });

  it('should open and close the calendar', async () => {
    render(<Home />);
    const calendarButton = screen.getByRole('button', { name: 'Calendario' });
    await userEvent.click(calendarButton);
    expect(screen.getByRole('grid')).toBeInTheDocument(); // Calendar is open
    await userEvent.click(calendarButton);
    expect(screen.queryByRole('grid')).not.toBeInTheDocument(); // Calendar is closed
  });

  it('should filter challenges based on selected date', async () => {
    const challenges = [
      { id: 1, name: 'Challenge 1', start_date: '2023-10-26' },
      { id: 2, name: 'Challenge 2', start_date: '2023-10-27' },
    ];
    const selectedDate = new Date('2023-10-26');
    render(<Home challenges={challenges} selectedDate={selectedDate} />);
    expect(screen.queryAllByRole('row')).toHaveLength(1); // Only Challenge 1 should be displayed
  });

  it('should navigate to card page when clicking on a challenge', async () => {
    const navigate = jest.fn();
    const challenge = { id: 1, name: 'Challenge 1', actual_state: 'En progreso' };
    render(<Home challenges={[challenge]} navigate={navigate} />);
    const challengeElement = screen.getByText('Challenge 1');
    await userEvent.click(challengeElement);
    expect(navigate).toHaveBeenCalledWith(`/card/${challenge.id}`);
  });
});
