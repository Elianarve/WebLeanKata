import request from 'supertest';
import connection_db from "../../database/connection_db.js";
import ActualStateModel from "../../models/ActualStateModel.js";
import { app } from '../../app.js'; // Ajustar según tu estructura de importaciones



const api = request(app);

describe('Testing CRUD in Actual State API', () => {

    beforeAll(async () => {
        await connection_db.authenticate(); // Esto sincronizará todos los modelos con la base de datos
      });


    describe('GET request from actual states API', () => {
        let response;

        beforeEach(async () => {
            response = await api.get('/actualstates');
        });

        test('Response body must be an array', async () => {
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

        test('Response should return status 201', async () => {
            expect(response.status).toBe(201);
        });

        test('Response body should contain the newly added actual state', async () => {
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

    describe('deleteActualState', () => {
        let response;

        beforeEach(async () => {
            const newActualState = await ActualStateModel.create({
                id: '1',
                description: 'Descripción del estado actual',
                date: new Date()
            });

            response = await api.delete(`/actualstates/${newActualState.id}`);
        });

        test('debería eliminar un estado actual existente y devolver un mensaje de éxito', async () => {
            expect(response.status).toBe(201); // Aquí se espera un status 201, lo cual es incorrecto
            expect(response.body).toEqual({ message: 'Challenge deleted' });
        });

        test('debería devolver un error 500 si hay un problema al eliminar el estado actual', async () => {
            // Puedes simular un problema aquí y ajustar el test según sea necesario
        });

 
    });

    afterAll( () =>{
        connection_db.close();
        // server.close();
    });
});


