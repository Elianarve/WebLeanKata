import { render, fireEvent, waitFor } from '@testing-library/react';
import Challenge from '../components/forms/Challenge';
import { describe, it, expect } from 'vitest';
import jest from 'jest';


describe('Test Unitario para el Componente Challenge', () => {
  it('Debería renderizar correctamente el formulario', () => {
    const { getByText, getByLabelText } = render(<Challenge />);

    // Verificar si el formulario y sus elementos se renderizan correctamente
    expect(getByText('RETO:')).toBeInTheDocument();
    expect(getByLabelText('Nombre')).toBeInTheDocument();
    expect(getByLabelText('Descripción')).toBeInTheDocument();
    expect(getByLabelText('Fecha de inicio:')).toBeInTheDocument();
    expect(getByLabelText('Fecha de fin:')).toBeInTheDocument();
    expect(getByText('Enviar')).toBeInTheDocument();
  });

  it('Debería mostrar un mensaje de error cuando se envía el formulario con campos vacíos', async () => {
    const { getByText } = render(<Challenge />);

    // Enviar el formulario sin completar ningún campo
    fireEvent.click(getByText('Enviar'));

    // Verificar si se muestra el mensaje de error correcto para el campo de nombre
    await waitFor(() => {
      expect(getByText('El nombre es requerido')).toBeInTheDocument();
    });

    // Agregar más verificaciones para otros campos requeridos según sea necesario
  });

  it('Debería actualizar el estado del formulario al escribir en los campos de entrada', () => {
    const { getByLabelText } = render(<Challenge />);
    const nombreInput = getByLabelText('Nombre');

    // Escribir en el campo de nombre
    fireEvent.change(nombreInput, { target: { value: 'Nuevo Nombre' } });

    // Verificar si el estado del campo de nombre se actualiza correctamente
    expect(nombreInput.value).toEqual('Nuevo Nombre');
  });

  it('Debería llamar a la función onSubmit al enviar el formulario', async () => {
    const test = jest.fn();
    const { getByText, getByLabelText } = render(<Challenge onSubmit={test} />);
    
    // Completar el formulario
    fireEvent.change(getByLabelText('Nombre'), { target: { value: 'Nombre de prueba' } });
    fireEvent.change(getByLabelText('Descripción'), { target: { value: 'Descripción de prueba' } });
    fireEvent.change(getByLabelText('Fecha de inicio:'), { target: { value: '2024-05-11' } });
    fireEvent.change(getByLabelText('Fecha de fin:'), { target: { value: '2024-05-12' } });

    // Enviar el formulario
    fireEvent.click(getByText('Enviar'));

    // Verificar si la función onSubmit se llama correctamente
    await waitFor(() => {
      expect
      .toHaveBeenCalled();
    });
  });
});
