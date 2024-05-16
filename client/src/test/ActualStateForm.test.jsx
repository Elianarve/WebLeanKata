import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActualState } from "../components/forms/ActualState.jsx";
import { describe, it, expect } from 'vitest';
import jest from 'jest-mock';

describe('ActualStateForm component', () => {
  it('should display the form correctly', async () => {
    render(<ActualState />);
    expect(screen.getByLabelText('Descripción:')).toBeInTheDocument();
    expect(screen.getByLabelText('Fecha:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ENVIAR' })).toBeInTheDocument();
  });

  it('should display error messages for missing description and date', async () => {
    render(<ActualState />);

    const submitButton = screen.getByRole('button', { name: 'ENVIAR' });
    await userEvent.click(submitButton);
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
