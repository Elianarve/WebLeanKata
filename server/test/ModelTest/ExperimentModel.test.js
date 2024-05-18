import connection_db from '../../database/connection_db.js';
import ExperimentModel from '../../models/ExperimentModel.js';

describe('ExperimentModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.query('SET FOREIGN_KEY_CHECKS = 0');
      await connection_db.sync({ force: true });
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

  it('should define ExperimentModel correctly', () => {
    expect(ExperimentModel).toBeDefined();
  });

  it('should have columns id, hyphotesis_id, description, start_date, end_date, goals, methodology, variables, control_group, success_criteria, responsible, and state_experiment correctly defined', () => {
    const columns = ExperimentModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.hyphotesis_id).toBeDefined(); // Verifica "hyphotesis_id"
    expect(columns.description).toBeDefined();
    expect(columns.start_date).toBeDefined();
    expect(columns.end_date).toBeDefined();
    expect(columns.goals).toBeDefined();
    expect(columns.methodology).toBeDefined();
    expect(columns.variables).toBeDefined();
    expect(columns.control_group).toBeDefined();
    expect(columns.success_criteria).toBeDefined();
    expect(columns.responsible).toBeDefined();
    expect(columns.state_experiment).toBeDefined();
  });

  it('should have the table "experiment" correctly configured', () => {
    expect(ExperimentModel.options.tableName).toBe('experiments');
  });
});
