import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import TaskModel from '../../models/TaskModel';
import ExperimentModel from '../../models/ExperimentModel';

describe('TaskModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  afterAll(async () => {
    await connection_db.close();
  });

  it('should define TaskModel correctly', () => {
    expect(TaskModel).toBeDefined();
  });

  it('should have columns id, experiment_id, description, responsible, start_date, end_date_prev, end_date_real, and state correctly defined', () => {
    const columns = TaskModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.experiment_id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.responsible).toBeDefined();
    expect(columns.start_date).toBeDefined();
    expect(columns.end_date_prev).toBeDefined();
    expect(columns.end_date_real).toBeDefined();
    expect(columns.state).toBeDefined();
  });

  it('should have the table "tasks" correctly configured', () => {
    expect(TaskModel.options.tableName).toBe('tasks');
  });
});
