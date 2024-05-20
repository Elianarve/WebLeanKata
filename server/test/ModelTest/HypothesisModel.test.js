import connection_db from '../../database/connection_db.js';
import HypothesisModel from '../../models/HypothesisModel.js';

describe('HypothesisModel', () => {
  beforeAll(async () => {
    try {
      // Eliminar las restricciones de clave foránea
      await connection_db.query('SET FOREIGN_KEY_CHECKS = 0');
      await connection_db.sync({ force: true });
      await connection_db.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('Database synchronized successfully');
    } catch (error) {
      console.error('Error during database synchronization:', error);
      throw error; // Vuelve a lanzar el error para que la prueba falle si la sincronización falla
    }
  });

  afterAll(async () => {
    try {
      await connection_db.close();
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error; // Vuelve a lanzar el error para que la prueba falle si el cierre falla
    }
  });

  it('should define HypothesisModel correctly', () => {
    expect(HypothesisModel).toBeDefined();
  });

  it('should have columns id, obstacle_id, description, plan_date, and state_hypothesis correctly defined', () => {
    const columns = HypothesisModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.obstacle_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.plan_date).toBeDefined();
    expect(columns.state_hypothesis).toBeDefined(); // Asegúrate de que corresponde con el nombre en el modelo
  });

  it('should have the table "hypothesis" correctly configured', () => {
    expect(HypothesisModel.options.tableName).toBe('hypothesis');
  });
});
