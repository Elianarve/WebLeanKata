import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import ActualStateModel from '../../models/ActualStateModel.js'; // Asegúrate de que la ruta sea correcta

describe('ActualStateModel', () => {
  let modelDescription;

  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
      modelDescription = await ActualStateModel.describe(); // Obtener la descripción del modelo
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

  it('debería definir el modelo ActualStateModel correctamente', () => {
    expect(ActualStateModel).toBeDefined();
  });

  it('debería tener las columnas id, description y date correctamente definidas', () => {
    expect(modelDescription.id.type).toBeInstanceOf(DataTypes.INTEGER); // Verificar el tipo de datos de la columna id
    expect(modelDescription.description.type).toBeInstanceOf(DataTypes.TEXT); // Verificar el tipo de datos de la columna description
    expect(modelDescription.date.type).toBeInstanceOf(DataTypes.DATEONLY); // Verificar el tipo de datos de la columna date
  });

  it('debería tener la tabla "actualstates" correctamente configurada', () => {
    expect(ActualStateModel.getTableName()).toBe('actualstates'); // Verificar que el nombre de la tabla sea el esperado
  });
});
