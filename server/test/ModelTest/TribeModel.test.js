import connection_db from '../../database/connection_db'; // Importa connection_db
import TribeModel from '../../models/TribeModel.js';

describe('TribeModel', () => {
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

  it('should define TribeModel correctly', () => {
    expect(TribeModel).toBeDefined();
  });

  it('should have columns id, name_tribe, team_members, and process_id correctly defined', () => {
    const columns = TribeModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.name_tribe).toBeDefined();
    expect(columns.team_members).toBeDefined();
    expect(columns.process_id).toBeDefined();
  });

  it('should have the table "tribe" correctly configured', () => {
    expect(TribeModel.options.tableName).toBe('tribe');
  });
});
