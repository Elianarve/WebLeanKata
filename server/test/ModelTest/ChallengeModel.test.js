import { DataTypes } from "sequelize";
import connection_db from "../../database/connection_db";
import ChallengeModel from "../../models/ChallengeModel";

describe('ChallengeModel', () => {
  // Antes de todas las pruebas, conectamos a la base de datos y sincronizamos los modelos
  beforeAll(async () => {
    await connection_db.sync(); // Esto sincronizará todos los modelos con la base de datos
  });

  // Después de todas las pruebas, cerramos la conexión a la base de datos
  afterAll(async () => {
    await connection_db.close(); // Esto cerrará la conexión a la base de datos
  });

  // Prueba para verificar si el modelo se ha definido correctamente
  it('debería definir el modelo ChallengeModel correctamente', () => {
    expect(ChallengeModel).toBeDefined();
  });

  // Prueba para verificar la definición de columnas del modelo
  it('debería tener las columnas id, name, description, start_date, end_date y actual_state_id correctamente definidas', () => {
    const columns = ChallengeModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.name).toBeDefined();
    expect(columns.description).toBeDefined();
    expect(columns.start_date).toBeDefined();
    expect(columns.end_date).toBeDefined();
    expect(columns.actual_state_id).toBeDefined();
  });

  // Prueba para verificar la configuración de la tabla
  it('debería tener la tabla "challenges" correctamente configurada', () => {
    expect(ChallengeModel.options.tableName).toBe('challenges');
  });

  // Puedes agregar más pruebas aquí para cubrir otros aspectos del modelo...
});
