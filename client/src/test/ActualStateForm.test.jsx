import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Router } from 'react-router-dom'
import ActualState from "../components/forms/ActualState.jsx";
import { createMemoryHistory } from 'history';
import test from 'jest';
import { expect } from 'jest';

test("render ActualState form", async () => {
  const history = createMemoryHistory()

  render(
    <Router history={history}>
      <ActualState />
    </Router>
  );
  
  // Verifica que los elementos del formulario estén presentes en la pantalla
  const headingElement = screen.getByText("ESTADO ACTUAL:");
  expect(headingElement).toBeInTheDocument();

  const descriptionLabelElement = screen.getByText("Descripción:");
  expect(descriptionLabelElement).toBeInTheDocument();

  const dateLabelElement = screen.getByText("Fecha:");
  expect(dateLabelElement).toBeInTheDocument();

  const sendButtonElement = screen.getByText("Enviar");
  expect(sendButtonElement).toBeInTheDocument();

  // Verifica que el botón de enviar esté inicialmente deshabilitado
  expect(sendButtonElement).toBeDisabled();

  // Simula el llenado del formulario
  const descriptionInput = screen.getByLabelText("Descripción:");
  fireEvent.change(descriptionInput, { target: { value: "Estado actual" } });

  const dateInput = screen.getByLabelText("Fecha:");
  fireEvent.change(dateInput, { target: { value: "2024-05-10" } });

  // Verifica que el botón de enviar esté habilitado después de llenar el formulario
  expect(sendButtonElement).toBeEnabled();

  // Simula el envío del formulario
  fireEvent.click(sendButtonElement);

  // Espera a que ocurra algún cambio después del envío del formulario
  await waitFor(() => {
    // Realiza verificaciones adicionales después del envío del formulario si es necesario

    // Verifica que el formulario se haya limpiado después del envío
    expect(descriptionInput.value).toBe("");
    expect(dateInput.value).toBe("");

    // Verifica que se haya redirigido a la página de desafío
    expect(history.location.pathname).toBe("/challenge");
  });
});
