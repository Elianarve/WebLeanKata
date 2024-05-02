import { DataTypes } from "sequelize";
import connection_db from "../../database/connection_db";
import ActualStateModel from "../../models/ActualStateModel";

describe('ActualStateModel', () => {
  // Antes de todas las pruebas, conectamos a la base de datos y sincronizamos los modelos
  beforeAll(async () => {
    await connection_db.sync(); // Esto sincronizará todos los modelos con la base de datos
  });

  // Después de todas las pruebas, cerramos la conexión a la base de datos
  afterAll(async () => {
    await connection_db.close(); // Esto cerrará la conexión a la base de datos
  });

  // Prueba para verificar si el modelo se ha definido correctamente
  it('debería definir el modelo ActualStateModel correctamente', () => {
    expect(ActualStateModel).toBeDefined();
  });

  // Prueba para verificar la definición de columnas del modelo
  it('debería tener las columnas id, description y date correctamente definidas', () => {
    const columns = ActualStateModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.date).toBeDefined();
  });

  // Prueba para verificar la configuración de la tabla
  it('debería tener la tabla "actualstates" correctamente configurada', () => {
    expect(ActualStateModel.options.tableName).toBe('actualstates');
  });

  // Puedes agregar más pruebas aquí para cubrir otros aspectos del modelo...
});

