import request from 'supertest';
import connection_db from "../../database/connection_db";
import ActualStateModel from "../../models/ActualStateModel";
import app from '../../app'; 

const api = request(app);

describe('Testing CRUD in Actual State API', () => {

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
            // Cleanup: Delete the newly added actual state from the database
            await ActualStateModel.destroy({ where: { id: response.body.id } });
        });
    });



    describe('PUT request to update an existing actual state', () => {
      let newActualState = {}; // Se declara un objeto vacío para almacenar el nuevo estado actual
  
      beforeEach(async () => {
          // Se crea un nuevo estado actual y se guarda su ID
          const createResponse = await api.post('/actualstates').send({
              description: 'test',
              date: 'test'
          });
          newActualState.id = createResponse.body.id; // Se guarda el ID en newActualState
      });
  
      test('Response should return status 200', async () => {
          // Se utiliza el ID guardado para hacer la solicitud de actualización
          const updateResponse = await api
              .put(`/actualstates/${newActualState.id}`)
              .send({ description: 'Updated Description' });
  
          expect(updateResponse.status).toBe(200); // Se espera que la respuesta tenga un estado 200
      });
  
      afterEach(async () => {
        // Buscar el estado actual a eliminar basado en su descripción
        const actualStateToDelete = await ActualStateModel.findOne({
            where: { description: 'test' } // Modificar según el criterio de búsqueda que desees utilizar
        });
    
        // Verificar si se encontró el estado actual antes de intentar eliminarlo
        if (actualStateToDelete) {
            // Eliminar el estado actual encontrado
            await actualStateToDelete.destroy();
        }
    });
  });
  



    describe('DELETE request to delete an existing actual state', () => {
        let newActualState = {};
        let deleteResponse;

        beforeEach(async () => {
          newActualState = await ActualStateModel.create({
              description: 'test',
              date: 'test' // Assuming a valid date format
          });
      
          deleteResponse = await api.delete(`/actualstates/${newActualState.id}`);
      });

        test('Response should return status 201', async () => {
            expect(deleteResponse.status).toBe(201);
        });

        afterEach(async () => {
          // Buscar el estado actual a eliminar basado en su descripción
          const actualStateToDelete = await ActualStateModel.findOne({
              where: { description: 'test' } // Modificar según el criterio de búsqueda que desees utilizar
          });
      
          // Verificar si se encontró el estado actual antes de intentar eliminarlo
          if (actualStateToDelete) {
              // Eliminar el estado actual encontrado
              await actualStateToDelete.destroy();
          }
      });
    });
});



