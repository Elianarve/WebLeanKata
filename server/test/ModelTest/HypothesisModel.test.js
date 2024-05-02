import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import HypothesisModel from '../../models/HypothesisModel';
import ObstacleModel from '../../models/ObstacleModel';

describe('HypothesisModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define HypothesisModel correctly', () => {
    expect(HypothesisModel).toBeDefined();
  });

  it('should have columns id, obstacle_id, description, plan_date, and state_hipothesis correctly defined', () => {
    const columns = HypothesisModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.obstacle_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.plan_date).toBeDefined();
    expect(columns.state_hipothesis).toBeDefined();
  });

  it('should have the table "hypothesis" correctly configured', () => {
    expect(HypothesisModel.options.tableName).toBe('hypothesis');
  });
});
