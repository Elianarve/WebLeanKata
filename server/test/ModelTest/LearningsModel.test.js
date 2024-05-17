import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import LearningModel from '../../models/LearningModel.js'; // Asegúrate de que la ruta sea correcta

describe('LearningModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define LearningModel correctly', () => {
    expect(LearningModel).toBeDefined();
  });

  it('should have columns id, results_id, description, and learning_date correctly defined', async () => {
    const columns = LearningModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.results_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.learning_date).toBeDefined();
  });

  it('should have the table "learnings" correctly configured', () => {
    expect(LearningModel.getTableName()).toBe('learnings');
  });
});
