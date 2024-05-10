import request from 'supertest';
import connection_db from "../../database/connection_db";
import ChallengeModel from "../../models/ChallengeModel";
import app from '../../app';

const api = request(app);

describe('Testing CRUD in Challenge Controller', () => {

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


    describe('PUT /challenges/:id should update a challenge and return status 200', () => {
      let newChallenge = {};
      let response;
  
      beforeEach(async () => {
          newChallenge = await ChallengeModel.create({
              name: 'Initial Challenge',
              description: 'Description of Initial Challenge',
              start_date: '2024-05-10',
              end_date: '2024-05-20',
              actual_state_id: 'valid_actual_state_id'
          });
      });
  
      test('Put request should update a challenge value and return OK', async () => {
          const updateData = {
              name: 'Updated Challenge',
              description: 'Updated Description of Challenge'
          };
  
          response = await api.put(`/challenges/${newChallenge.id}`).send(updateData);
          
          expect(response.status).toBe(200);
      });
  
      afterAll(async () => {
          await ChallengeModel.destroy({ where: { name: 'Updated Challenge' } });
      });
  });
  

describe('POST in challenges api', () => {
  test('POST /challenges should add a new challenge and return status 201', async () => {
      const response = await api.post('/challenge').send({
      name: 'Test Challenge',
      description: 'Description of Test Challenge',
      start_date: '2024-05-10',
      end_date: '2024-05-20',
      actual_state_id: 'valid_actual_state_id'
    });

    expect(typeof response.body).toBe('object');
    expect(response.status).toBe(201);
  });

  afterAll(async () => {
    await ChallengeModel.destroy({ where: { name: 'Test Challenge' } });
  });
});


describe('DELETE /challenges/:id should delete a challenge and return status 201', () => {
    let newChallenge = {};
    let response;

    beforeEach(async () => {
    newChallenge = await ChallengeModel.create({
        name: 'Test Challenge',
        description: 'Description of Test Challenge',
        start_date: '2024-05-10',
        end_date: '2024-05-20',
        actual_state_id: 'valid_actual_state_id'
      });
    });
  
    test('Should return status 201', async () => {
      response = await api.delete(`/challenges/${newChallenge.id}`);
      expect(response.status).toBe(201);
    });
  
    afterEach(async () => {
      await ChallengeModel.destroy({ where: { name: 'Test Challenge' } });
    });
  });
});
