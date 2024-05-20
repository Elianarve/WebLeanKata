import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import ResultsModel from '../../models/ResultsModel';
import ExperimentModel from '../../models/ExperimentModel';

describe('ResultsModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define ResultsModel correctly', () => {
    expect(ResultsModel).toBeDefined();
  });

  it('should have columns id, experiment_id, description, date, analysis, expected_results, results_obtained, conclusion, and next_step correctly defined', () => {
    const columns = ResultsModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.experiment_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.date).toBeDefined();
    expect(columns.analysis).toBeDefined();
    expect(columns.expected_results).toBeDefined();
    expect(columns.results_obtained).toBeDefined();
    expect(columns.conclusion).toBeDefined();
    expect(columns.next_step).toBeDefined();
  });

  it('should have the table "results" correctly configured', () => {
    expect(ResultsModel.options.tableName).toBe('results');
  });
});
