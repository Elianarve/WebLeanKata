import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db';
import ExperimentModel from '../../models/ExperimentModel';
import HypothesisModel from '../../models/HypothesisModel';

describe('ExperimentModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  it('should define ExperimentModel correctly', () => {
    expect(ExperimentModel).toBeDefined();
  });

  it('should have columns id, hiphotesis_id, description, start_date, end_date, goals, methodology, variables, control_group, success_criteria, responsible, and state_experiment correctly defined', () => {
    const columns = ExperimentModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.hiphotesis_id).toBeDefined();
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

  it('should have the table "experiments" correctly configured', () => {
    expect(ExperimentModel.options.tableName).toBe('experiments');
  });
});
