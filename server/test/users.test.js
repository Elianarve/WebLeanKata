import request from 'supertest';
import { app, server } from '../app.js';
import connection_db from '../database/connection_db.js';
import UsersModel from '../models/userModel.js';
import { testUserAdmin, testUser, updatedTestUser, deleteUser } from './helpers/testHelpers.js';
import { tokenSign } from '../utils/token.js';

const api = request(app);

describe('TESTING CRUD users', () => {
    let newUser = {};
    let userToken;

    beforeEach(async () => {
        // Crear un nuevo usuario administrador para las pruebas
        newUser = await UsersModel.create(testUserAdmin);
        // Generar un token para el usuario
        userToken = tokenSign(newUser);
    });

    afterEach(async () => {
        // Eliminar el usuario creado después de cada prueba
        await UsersModel.destroy({ where: { id: newUser.id } });
    });

    describe('GET', () => {
        test('GET Response body must be an array and then show 200 status', async () => {
            const response = await api.get('/users').set('Authorization', `Bearer ${userToken}`);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.status).toBe(200);
        });
    });

    describe('POST', () => {
        test('POST response should be an object and then return status 201', async () => {
            const response = await api.post('/users').set('Authorization', `Bearer ${userToken}`).send(testUser);
            console.log(response.body);
            expect(response.status).toBe(201);
            expect(typeof response.body).toBe('object');
        });
    });

    describe('DELETE', () => {
        let newDeleteUser;
        let response;
        
        beforeEach(async () => {
            // Crear un usuario para la prueba de eliminación
            newDeleteUser = await UsersModel.create(deleteUser);
            // Realizar la solicitud de eliminación
            response = await api.delete(`/users/${newDeleteUser.id}`).set('Authorization', `Bearer ${userToken}`).send();
        });

        test('Delete response should show 201 status', async () => {
            expect(response.status).toBe(201);
        });
    });

    describe('PUT', () => {
        test('Put response should be an object and return status 200', async () => {
            const response = await api.put(`/users/${newUser.id}`).set('Authorization', `Bearer ${userToken}`).send(updatedTestUser);
            expect(response.status).toBe(200);
            expect(typeof response.body).toBe('object');
        });
    });

    afterAll(async () => {
        // Cerrar el servidor y sincronizar la base de datos después de todas las pruebas
        server.close();
        await connection_db.sync({ force: true });
        console.log('All databases are clean');
    });
});
