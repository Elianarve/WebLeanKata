import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectAllTargetState } from '../components/selectall/selectAlllTargetStates';
import { getTargetState } from '../services/targetStateServices';
import { describe, it, expect } from '@jest/globals';
import { jest } from '@jest/globals';

jest.mock('../services/targetStateService');

describe('SelectAllTargetState component', () => {
  it('should render the select element with the correct options', async () => {
    const mockTargetStates = [
      { id: 1, description: 'Target State 1' },
      { id: 2, description: 'Target State 2' },
    ];
    getTargetState.mockResolvedValue(mockTargetStates);

    render(<SelectAllTargetState onTargetStateSelect={jest.fn()} challengeId={1} />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(3); // Includes the empty option
    expect(options[1].text).toBe('Target State 1');
    expect(options[2].text).toBe('Target State 2');
  });

  it('should call the onTargetStateSelect callback with the selected value', async () => {
    const mockTargetStates = [
      { id: 1, description: 'Target State 1' },
      { id: 2, description: 'Target State 2' },
    ];
    getTargetState.mockResolvedValue(mockTargetStates);

    const onTargetStateSelectMock = jest.fn();
    render(<SelectAllTargetState onTargetStateSelect={onTargetStateSelectMock} challengeId={1} />);

    const selectElement = screen.getByRole('combobox');
    userEvent.selectOptions(selectElement, '2');

    expect(onTargetStateSelectMock).toHaveBeenCalledWith(2);
  });

  it('should handle errors gracefully', async () => {
    getTargetState.mockRejectedValue(new Error('Error fetching Target States'));

    console.error = jest.fn(); // Mock console.error to avoid polluting the output

    render(<SelectAllTargetState onTargetStateSelect={jest.fn()} challengeId={1} />);

    expect(console.error).toHaveBeenCalledWith('Error fetching Target States:', new Error('Error fetching Target States'));
  });
});
