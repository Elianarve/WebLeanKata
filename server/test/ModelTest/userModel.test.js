import connection_db from '../../database/connection_db.js'; // Importa connection_db
import UsersModel from '../../models/userModel.js';

describe('UsersModel', () => {
  beforeAll(async () => {
    try {
      await connection_db.authenticate(); // Verifica la conexión a la base de datos
      console.log('Database connection successful');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      await connection_db.close(); // Cierra la conexión a la base de datos
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  });

  it('should define UsersModel correctly', () => {
    expect(UsersModel).toBeDefined();
  });

  it('should have columns id, name, email, password, and rol correctly defined', () => {
    const columns = UsersModel.rawAttributes;
    expect(columns.id).toBeDefined();
    expect(columns.name).toBeDefined();
    expect(columns.email).toBeDefined();
    expect(columns.password).toBeDefined();
    expect(columns.rol).toBeDefined();
  });

  it('should have the table "users" correctly configured', () => {
    expect(UsersModel.options.tableName).toBe('users');
  });

  it('should have unique email constraint', () => {
    const emailColumn = UsersModel.rawAttributes.email;
    expect(emailColumn.unique).toBe(true);
  });

  it('should have allowNull false for name, email, and password', () => {
    const nameColumn = UsersModel.rawAttributes.name;
    const emailColumn = UsersModel.rawAttributes.email;
    const passwordColumn = UsersModel.rawAttributes.password;

    expect(nameColumn.allowNull).toBe(false);
    expect(emailColumn.allowNull).toBe(false);
    expect(passwordColumn.allowNull).toBe(false);
  });

  it('should have default value "user" for rol', () => {
    const rolColumn = UsersModel.rawAttributes.rol;
    expect(rolColumn.defaultValue).toBe('user');
  });
});
