import connection_db from '../../database/connection_db'; // Importa connection_db
import ChallengeModel from '../../models/ChallengeModel.js';

describe('ChallengeModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.query('SET FOREIGN_KEY_CHECKS = 0');
      await connection_db.sync({ force: true }); // Sincroniza la base de datos
      await connection_db.query('SET FOREIGN_KEY_CHECKS = 1');
      console.log('Database synchronized successfully');
    } catch (error) {
      console.error('Error during database synchronization:', error);
      throw error; // Rethrow the error to fail the test if sync fails
    }
  });

  afterAll(async () => {
    try {
      await connection_db.close();
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error; // Rethrow the error to fail the test if closing fails
    }
  });

  it('should define ChallengeModel correctly', () => {
    expect(ChallengeModel).toBeDefined();
  });

  it('should have columns id, name, description, start_date, end_date, and tribe_id correctly defined', () => {
    const columns = ChallengeModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.name).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.start_date).toBeDefined();
    expect(columns.end_date).toBeDefined();
    expect(columns.tribe_id).toBeDefined();
  });

  it('should have the table "challenges" correctly configured', () => {
    expect(ChallengeModel.options.tableName).toBe('challenges');
  });
});
