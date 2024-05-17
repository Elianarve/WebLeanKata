import { DataTypes } from 'sequelize';
import connection_db from '../../database/connection_db.js';
import TribeModel from '../../models/TribeModel.js'; // Asegúrate de que la ruta sea correcta
import ProcessModel from '../../models/ProcessModel.js'; // Asegúrate de que la ruta sea correcta

describe('TribeModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
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

  it('debería definir el modelo TribeModel correctamente', () => {
    expect(TribeModel).toBeDefined();
  });

  it('debería tener las columnas id, name_tribe, team_members y process_id correctamente definidas', async () => {
    const columns = await TribeModel.describe();
    expect(columns.id.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(columns.name_tribe.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.team_members.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.process_id.type).toBeInstanceOf(DataTypes.INTEGER);
  });

  it('debería tener la tabla "tribe" correctamente configurada', () => {
    expect(TribeModel.tableName).toBe('tribe');
  });

  it('debería tener una clave externa referenciada al modelo ProcessModel', async () => {
    const foreignKey = TribeModel.associations.process.foreignKey;
    const targetKey = TribeModel.associations.process.targetKey;
    const targetName = TribeModel.associations.process.target.name;

    expect(foreignKey).toBe('process_id');
    expect(targetKey).toBe('id');
    expect(targetName).toBe('ProcessModel');
  });
});
