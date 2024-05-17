import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import ChallengeModel from '../../models/ChallengeModel.js'; // Asegúrate de que la ruta sea correcta

describe('ChallengeModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('debería definir el modelo ChallengeModel correctamente', () => {
    expect(ChallengeModel).toBeDefined();
  });

  it('debería tener las columnas id, name, description, start_date, end_date y actual_state_id correctamente definidas', async () => {
    const columns = ChallengeModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.name).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.start_date).toBeDefined();
    expect(columns.end_date).toBeDefined();
    expect(columns.actual_state_id).toBeDefined();
  });

  it('debería tener la tabla "challenges" correctamente configurada', () => {
    expect(ChallengeModel.getTableName()).toBe('challenges');
  });
});
