import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import HypothesisModel from '../../models/HypothesisModel.js'; // Asegúrate de que la ruta sea correcta

describe('HypothesisModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define HypothesisModel correctly', () => {
    expect(HypothesisModel).toBeDefined();
  });

  it('should have columns id, obstacle_id, description, plan_date, and state_hypothesis correctly defined', async () => {
    const columns = HypothesisModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.obstacle_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.plan_date).toBeDefined();
    expect(columns.state_hypothesis).toBeDefined();
  });

  it('should have the table "hypothesis" correctly configured', () => {
    expect(HypothesisModel.getTableName()).toBe('hypothesis');
  });
});
