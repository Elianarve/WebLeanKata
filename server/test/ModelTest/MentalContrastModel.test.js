import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import MentalContrastModel from '../../models/MentalContrastModel';
import TargetStateModel from '../../models/TargetStateModel';

describe('MentalContrastModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define MentalContrastModel correctly', () => {
    expect(MentalContrastModel).toBeDefined();
  });

  it('should have columns id, points, evaluation_date, and target_state_id correctly defined', () => {
    const columns = MentalContrastModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.points).toBeDefined();
    expect(columns.evaluation_date).toBeDefined();
    expect(columns.target_state_id).toBeDefined();
  });

  it('should have the table "mentalContrasts" correctly configured', () => {
    expect(MentalContrastModel.options.tableName).toBe('mentalContrasts');
  });
});
