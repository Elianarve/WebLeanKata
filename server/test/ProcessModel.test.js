import connection_db from "../database/connection_db.js";
import UsersModel from "./userModel.js";
import ProcessModel from "./processModel.js"; // Importa el modelo que quieres probar

describe('ProcessModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Autenticar la conexión
      await connection_db.sync({ force: true }); // Sincronizar todos los modelos y forzar la creación de tablas
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  it('should define ProcessModel correctly', () => {
    expect(ProcessModel).toBeDefined();
  });

  it('should have columns id and description correctly defined', async () => {
    const columns = ProcessModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.description).toBeDefined();
  });

  it('should have the table "process" correctly configured', () => {
    expect(ProcessModel.getTableName()).toBe('process');
  });

  it('should have a foreign key relationship with UsersModel', async () => {
    const association = UsersModel.hasMany(ProcessModel, { foreignKey: 'Id' });
    expect(association).toBeDefined();
  });
});
