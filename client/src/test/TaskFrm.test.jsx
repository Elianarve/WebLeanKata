import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import Task from "../components/forms/Task";
import test from 'jest';
import { expect } from 'jest';

test("render Task form", async () => {
  const history = createMemoryHistory()

  // Render the Task component
  render(
    <Router history={history}>
      <Task />
    </Router>
  );
  
  // Verify that the elements of the form are present on the screen
  const headingElement = screen.getByText("Tarea:");
  expect(headingElement).toBeInTheDocument();

  const descriptionLabelElement = screen.getByText("Descripción:");
  expect(descriptionLabelElement).toBeInTheDocument();

  const responsibleLabelElement = screen.getByText("Responsable:");
  expect(responsibleLabelElement).toBeInTheDocument();

  const startDateLabelElement = screen.getByText("Fecha de inicio:");
  expect(startDateLabelElement).toBeInTheDocument();

  const endDatePrevLabelElement = screen.getByText("Fecha final prevista:");
  expect(endDatePrevLabelElement).toBeInTheDocument();

  const endDateRealLabelElement = screen.getByText("Fecha real:");
  expect(endDateRealLabelElement).toBeInTheDocument();

  const stateLabelElement = screen.getByText("Estado:");
  expect(stateLabelElement).toBeInTheDocument();

  const sendButtonElement = screen.getByText("Enviar");
  expect(sendButtonElement).toBeInTheDocument();

  // Verify that the send button is initially disabled
  expect(sendButtonElement).toBeDisabled();

  // Simulate filling out the form
  const descriptionInput = screen.getByLabelText("Descripción:");
  fireEvent.change(descriptionInput, { target: { value: "Tarea de prueba" } });

  const responsibleInput = screen.getByLabelText("Responsable:");
  fireEvent.change(responsibleInput, { target: { value: "John Doe" } });

  const startDateInput = screen.getByLabelText("Fecha de inicio:");
  fireEvent.change(startDateInput, { target: { value: "2024-05-10" } });

  const endDatePrevInput = screen.getByLabelText("Fecha final prevista:");
  fireEvent.change(endDatePrevInput, { target: { value: "2024-05-15" } });

  const endDateRealInput = screen.getByLabelText("Fecha real:");
  fireEvent.change(endDateRealInput, { target: { value: "2024-05-12" } });

  const stateInput = screen.getByLabelText("Estado:");
  fireEvent.change(stateInput, { target: { value: "En progreso" } });

  // Verify that the send button is enabled after filling out the form
  expect(sendButtonElement).toBeEnabled();

  // Simulate submitting the form
  fireEvent.click(sendButtonElement);

  // Wait for the form submission to complete
  await waitFor(() => {
    // Perform additional assertions after the form submission if necessary

    // Verify that the form has been cleared after submission
    expect(descriptionInput.value).toBe("");
    expect(responsibleInput.value).toBe("");
    expect(startDateInput.value).toBe("");
    expect(endDatePrevInput.value).toBe("");
    expect(endDateRealInput.value).toBe("");
    expect(stateInput.value).toBe("");

    // Verify that the user has been redirected to the result page
    expect(history.location.pathname).toBe("/result");
  });
});

test("validate end date", () => {
  const { getByLabelText } = render(<Task />);

  const startDateInput = getByLabelText("Fecha de inicio:");
  fireEvent.change(startDateInput, { target: { value: "2024-05-10" } });

  const endDatePrevInput = getByLabelText("Fecha final prevista:");
  fireEvent.change(endDatePrevInput, { target: { value: "2024-05-09" } });

  expect(endDatePrevInput).toHaveClass("error-input");
});

test("validate real end date", () => {
  const { getByLabelText } = render(<Task />);

  const startDateInput = getByLabelText("Fecha de inicio:");
  fireEvent.change(startDateInput, { target: { value: "2024-05-10" } });

  const endDatePrevInput = getByLabelText("Fecha final prevista:");
  fireEvent.change(endDatePrevInput, { target: { value: "2024-05-15" } });

  const endDateRealInput = getByLabelText("Fecha real:");
  fireEvent.change(endDateRealInput, { target: { value: "2024-05-09" } });

  expect(endDateRealInput).toHaveClass("error-input");
});
