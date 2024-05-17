import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import TaskModel from '../../models/TaskModel.js'; // Asegúrate de que la ruta sea correcta
import ExperimentModel from '../../models/ExperimentModel.js'; // Asegúrate de que la ruta sea correcta

describe('TaskModel', () => {
  let modelDescription;

  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
      modelDescription = await TaskModel.describe(); // Obtener la descripción del modelo
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  afterAll(async () => {
    try {
      await connection_db.close(); // Cerrar la conexión a la base de datos
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  });

  it('debería definir el modelo TaskModel correctamente', () => {
    expect(TaskModel).toBeDefined();
  });

  it('debería tener las columnas id, experiment_id, description, responsible, start_date, end_date_prev, end_date_real y state correctamente definidas', () => {
    expect(modelDescription.id).toBeDefined();
    expect(modelDescription.experiment_id).toBeDefined();
    expect(modelDescription.description).toBeDefined();
    expect(modelDescription.responsible).toBeDefined();
    expect(modelDescription.start_date).toBeDefined();
    expect(modelDescription.end_date_prev).toBeDefined();
    expect(modelDescription.end_date_real).toBeDefined();
    expect(modelDescription.state).toBeDefined();
  });

  it('debería tener la tabla "tasks" correctamente configurada', () => {
    expect(TaskModel.getTableName()).toBe('tasks');
  });
});
