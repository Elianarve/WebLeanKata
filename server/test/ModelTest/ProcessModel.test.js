import { DataTypes } from "sequelize";
import connection_db from "../../database/connection_db";
import ProcessModel from "../../models/ProcessModel";

describe('ProcessModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  it('should define the ProcessModel correctly', () => {
    expect(ProcessModel).toBeDefined();
  });

  it('should have the columns id and description correctly defined', () => {
    const columns = ProcessModel.describe();
    expect(columns.id.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.description.type).toBeInstanceOf(DataTypes.TEXT);
  });

  it('should have the table name "process" correctly configured', () => {
    expect(ProcessModel.tableName).toBe('process');
  });
});
