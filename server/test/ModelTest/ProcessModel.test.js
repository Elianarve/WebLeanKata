import connection_db from '../../database/connection_db'; // Importa connection_db
import ProcessModel from '../../models/ProcessModel.js';

describe('ProcessModel', () => {
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

  it('should define ProcessModel correctly', () => {
    expect(ProcessModel).toBeDefined();
  });

  it('should have columns id and description correctly defined', () => {
    const columns = ProcessModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.description).toBeDefined();
  });

  it('should have the table "process" correctly configured', () => {
    expect(ProcessModel.options.tableName).toBe('process');
  });
});
