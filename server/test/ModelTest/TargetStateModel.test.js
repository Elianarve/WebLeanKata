import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import TargetStateModel from '../../models/TargetStateModel.js'; // Asegúrate de que la ruta sea correcta
import ChallengeModel from '../../models/ChallengeModel.js'; // Asegúrate de que la ruta sea correcta

describe('TargetStateModel', () => {
  let modelDescription;

  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
      modelDescription = await TargetStateModel.describe(); // Obtener la descripción del modelo
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

  it('debería definir el modelo TargetStateModel correctamente', () => {
    expect(TargetStateModel).toBeDefined();
  });

  it('debería tener las columnas id, description, date_goal, challenge_id y start_date correctamente definidas', () => {
    expect(modelDescription.id).toBeDefined();
    expect(modelDescription.description).toBeDefined();
    expect(modelDescription.date_goal).toBeDefined();
    expect(modelDescription.challenge_id).toBeDefined();
    expect(modelDescription.start_date).toBeDefined();
  });

  it('debería tener la tabla "targetstates" correctamente configurada', () => {
    expect(TargetStateModel.getTableName()).toBe('targetstates');
  });
});
