import request from 'supertest';
import app from '../../app.js'; // Suponiendo que tu aplicación Express se exporta desde app.js
import connection_db from "../../database/connection_db";

const { sequelize } = connection_db; // Obtén la instancia de Sequelize de la conexión

beforeAll(async () => {
  // Sincronizamos la base de datos antes de ejecutar las pruebas
  await sequelize.sync();
});

describe('CRUD Operations for ActualState', () => {
  let actualStateId;

  it('should create a new actual state', async () => {
    const newActualState = { /* Datos para crear un nuevo estado actual */ };
    const response = await request(app)
      .post('/actual-states')
      .send(newActualState);
    
    expect(response.statusCode).toBe(201);
    actualStateId = response.body.id;
  });

  it('should retrieve the created actual state', async () => {
    const response = await request(app).get(`/actual-states/${actualStateId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(actualStateId);
  });

  it('should update the created actual state', async () => {
    const updatedActualState = { /* Datos actualizados */ };
    const response = await request(app)
      .put(`/actual-states/${actualStateId}`)
      .send(updatedActualState);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Actualizado correctamente');
  });

  it('should delete the created actual state', async () => {
    const response = await request(app).delete(`/actual-states/${actualStateId}`);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Challenge deleted');
  });
});

afterAll(async () => {
  // Cerramos la conexión con la base de datos después de ejecutar las pruebas
  await sequelize.close();
});

