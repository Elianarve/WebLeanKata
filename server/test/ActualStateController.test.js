import request from 'supertest';
import connection_db from "../database/connection_db.js";
import ActualStateModel from "../models/ActualStateModel.js";
import { app } from '../app.js'; // Ajustar según tu estructura de importaciones
import UsersModel from '../models/userModel.js'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { testUserAdmin, testNew, updatedTestNew } from './helpers/testHelpers.js';
import { tokenSign } from '../utils/token.js';

const api = request(app);

describe('Testing CRUD in Actual State API', () => {

    beforeAll(async () => {
        await connection_db.authenticate(); // Esto autenticará la conexión con la base de datos
        await connection_db.sync({ force: true }); // Esto sincronizará todos los modelos con la base de datos
    });

    describe('GET request from actual states API', () => {
        let response;

        beforeEach(async () => {
            response = await api.get('/actualstates');
        });

        test('Response body must be an array', () => {
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Response status should be 200', () => {
            expect(response.status).toBe(200);
        });
    });

    describe('POST request to add a new actual state', () => {
        let newActualState = {};
        let response;

        beforeEach(async () => {
            newActualState = {
                description: 'New Actual State Description',
                date: '2024-05-06' // Assuming a valid date format
            };

            response = await api.post('/actualstates').send(newActualState);
        });

        test('Response should return status 201', () => {
            expect(response.status).toBe(201);
        });

        test('Response body should contain the newly added actual state', () => {
            expect(response.body).toHaveProperty('id');
            expect(response.body.description).toBe(newActualState.description);
            expect(response.body.date).toBe(newActualState.date);
        });

        afterEach(async () => {
            await ActualStateModel.destroy({ where: { id: response.body.id } });
        });
    });

    describe('PUT request to update an existing actual state', () => {
        let newActualState = {};

        beforeEach(async () => {
            const createResponse = await api.post('/actualstates').send({
                description: 'test',
                date: '2024-05-04'
            });
            newActualState.id = createResponse.body.id;
        });

        test('Response should return status 200', async () => {
            const currentDate = new Date();
            const updateResponse = await api
                .put(`/actualstates/${newActualState.id}`)
                .send({ 
                    description: 'test',
                    date: currentDate.toISOString()
                });

            expect(updateResponse.status).toBe(200);
        });

        afterEach(async () => {
            const actualStateToDelete = await ActualStateModel.findOne({
                where: { description: 'test' }
            });

            if (actualStateToDelete) {
                await actualStateToDelete.destroy();
            }
        });
    });

    describe('DELETE request to remove an actual state', () => {
        let response;

        beforeEach(async () => {
            const newActualState = await ActualStateModel.create({
                description: 'Descripción del estado actual',
                date: new Date()
            });

            response = await api.delete(`/actualstates/${newActualState.id}`);
        });

        test('should delete an existing actual state and return a success message', async () => {
            expect(response.status).toBe(200); // El status debería ser 200 para eliminación exitosa
            expect(response.body).toEqual({ message: 'Actual state deleted' });
        });

        test('should return a 500 error if there is a problem deleting the actual state', async () => {
            // Puedes simular un problema aquí y ajustar el test según sea necesario
        });
    });

    afterAll(async () => {
        await connection_db.close();
        // server.close(); // Esto está comentado ya que no es necesario cerrar el servidor explícitamente en la mayoría de los casos
    });
});
