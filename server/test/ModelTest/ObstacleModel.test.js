import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import ObstacleModel from '../../models/ObstacleModel.js';

describe('ObstacleModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define ObstacleModel correctly', () => {
    expect(ObstacleModel).toBeDefined();
  });

  it('should have columns id, target_state_id, and description correctly defined', async () => {
    const columns = ObstacleModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.target_state_id).toBeDefined();
    expect(columns.description).toBeDefined();
  });

  it('should have the table "obstacles" correctly configured', () => {
    expect(ObstacleModel.getTableName()).toBe('obstacles');
  });
});
