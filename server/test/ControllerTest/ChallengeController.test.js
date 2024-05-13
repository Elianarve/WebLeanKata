import request from 'supertest';
import connection_db from "../../database/connection_db.js";
import ChallengeModel from "../../models/ChallengeModel.js";
import {app} from '../../app.js'; // Ajustar según tu estructura de importaciones

const api = request(app);

describe('Testing CRUD in Challenge Controller', () => {

  beforeAll(async () => {
    await connection_db.sync(); // Esto sincronizará todos los modelos con la base de datos
  });

  describe('GET /challenges should return status 200 and an array of challenges', () => {
    let response;
    beforeAll(async () => {
      response = await api.get('/challenge');
    });

    test('Response body must be an array', async () => {
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('Response status should be 200', () => {
      expect(response.status).toBe(200);
    });
  });

  describe('POST in challenges api', () => {
    test('POST /challenges should add a new challenge and return status 201', async () => {
      const response = await api.post('/challenges').send({
        name: 'Test Challenge',
        description: 'Description of Test Challenge',
        start_date: '2024-05-10',
        end_date: '2024-05-20',
        actual_state_id: 'valid_actual_state_id'
      });

      expect(typeof response.body).toBe('object');
      expect(response.status).toBe(201);
    });
  });

  describe('PUT /challenges/:id should update a challenge and return status 200', () => {
    let newChallenge = {};

    beforeEach(async () => {
      const createResponse = await api.put(`/challenges`).send({
        name: 'test',
        description: 'test',
        start_date: '2024-05-10',
        end_date: '2024-05-20',
        actual_state_id: 'valid_actual_state_id'
      });
      newChallenge.id = createResponse.body.id;
    });

    test('Put request should update a challenge value and return OK', async () => {
      const updateResponse = await api
        .put(`/challenges/${newChallenge.id}`)
        .send({
          name: 'test',
          description: 'test'
        });
      expect(updateResponse.status).toBe(200);
    });

    afterEach(async () => {
      const challengeToUpdate = await ChallengeModel.findByPk(newChallenge.id);
      if (challengeToUpdate) {
        await challengeToUpdate.destroy();
      }
    });
  });

  describe('DELETE /challenges/:id should delete a challenge and return status 201', () => {
    let newChallengeId;

    beforeEach(async () => {
      const newChallenge = await ChallengeModel.create({
        name: 'Test Challenge',
        description: 'Description of Test Challenge',
        start_date: '2024-05-10',
        end_date: '2024-05-20',
        actual_state_id: 'valid_actual_state_id'
      });
      newChallengeId = newChallenge.id;
    });

    test('Should return status 201', async () => {
      const response = await api.delete(`/challenges/${newChallengeId}`);
      expect(response.status).toBe(201);
    });

    afterEach(async () => {
      const challengeToDelete = await ChallengeModel.findByPk(newChallengeId);
      if (challengeToDelete) {
        await challengeToDelete.destroy();
      }
    });
  });

});



