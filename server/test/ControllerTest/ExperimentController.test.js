import request from 'supertest';
import {app} from '../../app.js'; // Ajustar según tu estructura de importaciones
import connection_db from "../../database/connection_db.js";
import ExperimentModel from '../../models/ExperimentModel.js';

const api = request(app);

describe('Testing CRUD in experiments API', () => {

    beforeAll(async () => {
        await connection_db.sync(); // Esto sincronizará todos los modelos con la base de datos
    });

    describe('GET request from experiments API', () => {
        let response;
        beforeEach(async () => {
            response = await api.get('/api/experiments');
        });

        test('Response body must be an array', async () => {
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Response status should be 200', () => {
            expect(response.status).toBe(200);
        });
    });

    describe('PUT request on experiments API', () => {
        let newExperiment = {};
        beforeEach(async () => {
            newExperiment = await ExperimentModel.create({
                "description": "Test Experiment",
                "start_date": "2024-05-10",
                "end_date": "2024-05-20",
                "goals": "Test goals",
                "methodology": "Test methodology",
                "variables": "Test variables",
                "control_group": "Test control group",
                "success_criteria": "Test success criteria",
                "responsible": "Test responsible",
                "state_experiment": "Test state"
            });
        });

        test('Put request should update an experiment value and return OK', async () => {
            const response = await api.put(`/api/experiments/${newExperiment.id}`).send({
                "description": "Updated description",
                "start_date": "2024-05-15"
            });
            expect(response.status).toBe(200);
        });

        afterAll(async () => {
            await ExperimentModel.destroy({ where: { id: newExperiment.id } });
        });
    });

    describe('POST in experiments API', () => {
        test('Response should return status 201 and type object', async () => {
            const response = await api.post('/api/experiments').send({
                "description": "Test Experiment",
                "start_date": "2024-05-10",
                "end_date": "2024-05-20",
                "goals": "Test goals",
                "methodology": "Test methodology",
                "variables": "Test variables",
                "control_group": "Test control group",
                "success_criteria": "Test success criteria",
                "responsible": "Test responsible",
                "state_experiment": "Test state"
            });
            expect(typeof response.body).toBe('object');
            expect(response.status).toBe(201);
        });
        afterAll(async () => {
            await ExperimentModel.destroy({ where: { description: 'Test Experiment' } });
        });
    });

    describe('DELETE request in experiments API', () => {
        let newExperiment = {};
        beforeEach(async () => {
            newExperiment = await ExperimentModel.create({
                "description": "Test Experiment",
                "start_date": "2024-05-10",
                "end_date": "2024-05-20",
                "goals": "Test goals",
                "methodology": "Test methodology",
                "variables": "Test variables",
                "control_group": "Test control group",
                "success_criteria": "Test success criteria",
                "responsible": "Test responsible",
                "state_experiment": "Test state"
            });
        });

        test('Should return status 201', async () => {
            const response = await api.delete(`/api/experiments/${newExperiment.id}`);
            expect(response.status).toBe(201);
        });

        afterAll(async () => {
            await ExperimentModel.destroy({ where: { id: newExperiment.id } });
        });
    });

    afterAll(() => {
        connection_db.close();
    });

});
