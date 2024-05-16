import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import ExperimentModel from '../../models/ExperimentModel.js'; // Asegúrate de que la ruta sea correcta

describe('ExperimentModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define ExperimentModel correctly', () => {
    expect(ExperimentModel).toBeDefined();
  });

  it('should have columns id, hypothesis_id, description, start_date, end_date, goals, methodology, variables, control_group, success_criteria, responsible, and state_experiment correctly defined', async () => {
    const columns = ExperimentModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.hypothesis_id).toBeDefined();
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
    expect(ExperimentModel.getTableName()).toBe('experiments');
  });
});
