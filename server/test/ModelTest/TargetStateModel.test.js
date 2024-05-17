import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import TargetStateModel from '../../models/TargetStateModel';
import ChallengeModel from '../../models/ChallengeModel';

describe('TargetStateModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define TargetStateModel correctly', () => {
    expect(TargetStateModel).toBeDefined();
  });

  it('should have columns id, description, date_goal, challenge_id, and start_date correctly defined', () => {
    const columns = TargetStateModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.date_goal).toBeDefined();
    expect(columns.challenge_id).toBeDefined();
    expect(columns.start_date).toBeDefined();
  });

  it('should have the table "targetstates" correctly configured', () => {
    expect(TargetStateModel.options.tableName).toBe('targetstates');
  });
});
