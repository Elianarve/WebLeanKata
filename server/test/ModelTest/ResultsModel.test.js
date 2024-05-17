import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import ResultsModel from '../../models/ResultsModel.js'; // Asegúrate de que la ruta sea correcta
import ExperimentModel from '../../models/ExperimentModel.js'; // Asegúrate de que la ruta sea correcta

describe('ResultsModel', () => {
  let modelDescription;

  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
      modelDescription = await ResultsModel.describe(); // Obtener la descripción del modelo
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

  it('debería definir el modelo ResultsModel correctamente', () => {
    expect(ResultsModel).toBeDefined();
  });

  it('debería tener las columnas id, experiment_id, description, date, analysis, expected_results, results_obtained, conclusion y next_step correctamente definidas', () => {
    expect(modelDescription.id).toBeDefined();
    expect(modelDescription.experiment_id).toBeDefined();
    expect(modelDescription.description).toBeDefined();
    expect(modelDescription.date).toBeDefined();
    expect(modelDescription.analysis).toBeDefined();
    expect(modelDescription.expected_results).toBeDefined();
    expect(modelDescription.results_obtained).toBeDefined();
    expect(modelDescription.conclusion).toBeDefined();
    expect(modelDescription.next_step).toBeDefined();
  });

  it('debería tener la tabla "results" correctamente configurada', () => {
    expect(ResultsModel.getTableName()).toBe('results');
  });
});
