// import ActualState from "../components/forms/ActualState";
// import test from 'jest';
// import { expect } from 'jest';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';


// test("render ActualState form", async () => {
//   const history = createMemoryHistory()

//   // Render the ActualState component
//   render(
//     <Router history={history}>
//       <ActualState />
//     </Router>
//   );
  
//   // Verify that the elements of the form are present on the screen
//   const headingElement = screen.getByText("ESTADO ACTUAL:");
//   expect(headingElement).toBeInTheDocument();

//   const descriptionLabelElement = screen.getByText("Descripción:");
//   expect(descriptionLabelElement).toBeInTheDocument();

//   const dateLabelElement = screen.getByText("Fecha:");
//   expect(dateLabelElement).toBeInTheDocument();

//   const sendButtonElement = screen.getByText("Enviar");
//   expect(sendButtonElement).toBeInTheDocument();

//   // Verify that the send button is initially disabled
//   expect(sendButtonElement).toBeDisabled();

//   // Simulate filling out the form
//   const descriptionInput = screen.getByLabelText("Descripción:");
//   fireEvent.change(descriptionInput, { target: { value: "Estado actual" } });

//   const dateInput = screen.getByLabelText("Fecha:");
//   fireEvent.change(dateInput, { target: { value: "2024-05-10" } });

//   // Verify that the send button is enabled after filling out the form
//   expect(sendButtonElement).toBeEnabled();

//   // Simulate submitting the form
//   fireEvent.click(sendButtonElement);

//   // Wait for the form submission to complete
//   await waitFor(() => {
//     // Perform additional assertions after the form submission if necessary

//     // Verify that the form has been cleared after submission
//     expect(descriptionInput.value).toBe("");
//     expect(dateInput.value).toBe("");

//     // Verify that the user has been redirected to the result page
//     expect(history.location.pathname).toBe("/result");
//   });
// });

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getActualState, getOneActualState, deleteActualState, postActualState, updateActualState } from "../services/ActualStateService";
import { describe, it, expect, afterEach } from "@jest/globals";
import jest from "jest";

// Crear una instancia del adaptador de mock de axios
const mock = new MockAdapter(axios);

describe("Pruebas para los métodos CRUD", () => {
  afterEach(() => {
    mock.reset();
  });

  it("debería obtener los estados actuales correctamente", async () => {
    const mockData = [{ id: 1, name: "Estado Actual 1" }];
    mock.onGet("http://localhost:5000/actualstates").reply(200, mockData);

    const data = await getActualState();
    expect(data).toEqual(mockData);
  });

  it("debería obtener un estado actual por su ID correctamente", async () => {
    const mockData = { id: 1, name: "Estado Actual 1" };
    mock.onGet("http://localhost:5000/actualstates/1").reply(200, mockData);

    const response = await getOneActualState(1);
    expect(response.data).toEqual(mockData);
  });

  it("debería eliminar un estado actual correctamente", async () => {
    const mockId = 1;
    mock.onDelete(`http://localhost:5000/actualstates/${mockId}`).reply(200);

    const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(() => true);
    window.alert = jest.fn();

    await deleteActualState(mockId);
    expect(window.alert).toHaveBeenCalledWith("Eliminado correctamente");

    confirmSpy.mockRestore();
  });

  it("debería crear un estado actual correctamente", async () => {
    const mockData = { name: "Nuevo Estado Actual" };
    const mockResponse = { id: 1, ...mockData };
    mock.onPost("http://localhost:5000/actualstates").reply(200, mockResponse);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const response = await postActualState(mockData);
    expect(response.data).toEqual(mockResponse);
    expect(alertSpy).toHaveBeenCalledWith("EA creado exitosamente");

    alertSpy.mockRestore();
  });

  it("debería actualizar un estado actual correctamente", async () => {
    const mockId = 1;
    const mockData = { name: "Estado Actual Actualizado" };
    const mockResponse = { id: mockId, ...mockData };
    mock.onPut(`http://localhost:5000/actualstates/${mockId}`).reply(200, mockResponse);

    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const response = await updateActualState(mockId, mockData);
    expect(response).toEqual(mockResponse);
    expect(alertSpy).toHaveBeenCalledWith("Estado actual actualizado correctamente");

    alertSpy.mockRestore();
  });
});
