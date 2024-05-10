import ActualState from "../components/forms/ActualState";
import test from 'jest';
import { expect } from 'jest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';


test("render ActualState form", async () => {
  const history = createMemoryHistory()

  // Render the ActualState component
  render(
    <Router history={history}>
      <ActualState />
    </Router>
  );
  
  // Verify that the elements of the form are present on the screen
  const headingElement = screen.getByText("ESTADO ACTUAL:");
  expect(headingElement).toBeInTheDocument();

  const descriptionLabelElement = screen.getByText("Descripción:");
  expect(descriptionLabelElement).toBeInTheDocument();

  const dateLabelElement = screen.getByText("Fecha:");
  expect(dateLabelElement).toBeInTheDocument();

  const sendButtonElement = screen.getByText("Enviar");
  expect(sendButtonElement).toBeInTheDocument();

  // Verify that the send button is initially disabled
  expect(sendButtonElement).toBeDisabled();

  // Simulate filling out the form
  const descriptionInput = screen.getByLabelText("Descripción:");
  fireEvent.change(descriptionInput, { target: { value: "Estado actual" } });

  const dateInput = screen.getByLabelText("Fecha:");
  fireEvent.change(dateInput, { target: { value: "2024-05-10" } });

  // Verify that the send button is enabled after filling out the form
  expect(sendButtonElement).toBeEnabled();

  // Simulate submitting the form
  fireEvent.click(sendButtonElement);

  // Wait for the form submission to complete
  await waitFor(() => {
    // Perform additional assertions after the form submission if necessary

    // Verify that the form has been cleared after submission
    expect(descriptionInput.value).toBe("");
    expect(dateInput.value).toBe("");

    // Verify that the user has been redirected to the result page
    expect(history.location.pathname).toBe("/result");
  });
});
