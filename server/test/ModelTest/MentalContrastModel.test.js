import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import MentalContrastModel from '../../models/MentalContrastModel.js';

describe('MentalContrastModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define MentalContrastModel correctly', () => {
    expect(MentalContrastModel).toBeDefined();
  });

  it('should have columns id, points, evaluation_date, and target_state_id correctly defined', async () => {
    const columns = MentalContrastModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.points).toBeDefined();
    expect(columns.evaluation_date).toBeDefined();
    expect(columns.target_state_id).toBeDefined();
  });

  it('should have the table "mentalContrasts" correctly configured', () => {
    expect(MentalContrastModel.getTableName()).toBe('mentalContrasts');
  });
});
