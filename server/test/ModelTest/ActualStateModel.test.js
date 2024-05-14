import { DataTypes } from "sequelize";
import connection_db from "../../database/connection_db";
import ActualStateModel from "../../models/ActualStateModel";

describe('ActualStateModel', () => {
  let modelDescription;

  // Antes de todas las pruebas, conectamos a la base de datos y sincronizamos los modelos
  beforeAll(async () => {
    // Se verifica si la conexión a la base de datos está establecida
    if (!connection_db.isConnected) {
      await connection_db.authenticate(); // Se autentica la conexión a la base de datos
    }
    // Se sincronizan los modelos con la base de datos
    await connection_db.sync();
    // Se obtiene la descripción del modelo
    modelDescription = await ActualStateModel.describe();
  });

  // Después de todas las pruebas, cierra la conexión a la base de datos
  afterAll(async () => {
    // Se verifica si la conexión a la base de datos está establecida
    if (connection_db.isConnected) {
      await connection_db.close(); // Se cierra la conexión a la base de datos
    }
  });

  // Prueba para verificar si el modelo se ha definido correctamente
  it('debería definir el modelo ActualStateModel correctamente', () => {
    expect(ActualStateModel).toBeDefined();
  });

  // Prueba para verificar la definición de columnas del modelo
  it('debería tener las columnas id, description y date correctamente definidas', () => {
    // Verificar que las columnas estén definidas y tengan los tipos de datos esperados
    expect(modelDescription.id.type).toBeInstanceOf(DataTypes.INTEGER); // Se verifica el tipo de datos de la columna id
    expect(modelDescription.description.type).toBeInstanceOf(DataTypes.TEXT); // Se verifica el tipo de datos de la columna description
    expect(modelDescription.date.type).toBeInstanceOf(DataTypes.DATEONLY); // Se verifica el tipo de datos de la columna date
  });

  // Prueba para verificar la configuración de la tabla
  it('debería tener la tabla "actualstates" correctamente configurada', () => {
    // Verificar que el nombre de la tabla sea el esperado
    expect(ActualStateModel.tableName).toBe('actualstates');
  });

  // Puedes agregar más pruebas aquí para cubrir otros aspectos del modelo...
});
