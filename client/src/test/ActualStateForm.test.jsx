import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActualState } from '../components/ActualState';
import '@testing-library/jest-dom/extend-expect';
import { describe, it, expect } from '@jest/globals';
import { jest } from '@jest/globals';

describe('ActualState component', () => {
  it('should render the form with description and date fields', () => {
    render(<ActualState />);

    expect(screen.getByLabelText('Descripción:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha:')).toBeInTheDocument();
  });

  it('should display error messages for missing description and date', async () => {
    render(<ActualState />);

    await userEvent.click(screen.getByRole('button', { name: 'ENVIAR' }));

    expect(screen.getByText('La descripción es requerida')).toBeInTheDocument();
    expect(screen.getByText('La fecha es requerida')).toBeInTheDocument();
  });

  it('should submit the form with valid data', async () => {
    const mockPostActualState = jest.fn();
    const navigate = jest.fn();

    render(<ActualState postActualState={mockPostActualState} navigate={navigate} />);

    const descriptionInput = screen.getByLabelText('Descripción:');
    const dateInput = screen.getByLabelText('Fecha:');
    const submitButton = screen.getByRole('button', { name: 'ENVIAR' });

    await userEvent.type(descriptionInput, 'Descripción de prueba');
    await userEvent.type(dateInput, '2023-10-27');
    await userEvent.click(submitButton);

    expect(mockPostActualState).toHaveBeenCalledWith({
      description: 'Descripción de prueba',
      date: '2023-10-27',
    });
    expect(navigate).toHaveBeenCalledWith('/challenge');
  });
});
