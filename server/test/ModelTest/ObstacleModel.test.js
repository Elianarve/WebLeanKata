import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import ObstacleModel from '../../models/ObstacleModel';
import TargetStateModel from '../../models/TargetStateModel';

describe('ObstacleModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define ObstacleModel correctly', () => {
    expect(ObstacleModel).toBeDefined();
  });

  it('should have columns id, target_state_id, and description correctly defined', () => {
    const columns = ObstacleModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.target_state_id).toBeDefined();
    expect(columns.description).toBeDefined();
  });

  it('should have the table "obstacles" correctly configured', () => {
    expect(ObstacleModel.options.tableName).toBe('obstacles');
  });
});
