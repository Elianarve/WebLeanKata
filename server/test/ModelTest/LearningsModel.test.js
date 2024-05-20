import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import LearningModel from '../../models/LearningsModel';
import ResultsModel from '../../models/ResultsModel';

describe('LearningModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define LearningModel correctly', () => {
    expect(LearningModel).toBeDefined();
  });

  it('should have columns id, results_id, description, and learning_date correctly defined', () => {
    const columns = LearningModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.results_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.learning_date).toBeDefined();
  });

  it('should have the table "learnings" correctly configured', () => {
    expect(LearningModel.options.tableName).toBe('learnings');
  });
});
