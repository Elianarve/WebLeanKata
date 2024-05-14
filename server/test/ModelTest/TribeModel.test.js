import { DataTypes } from "sequelize";
import connection_db from "../../database/connection_db";
import TribeModel from "../../models/TribeModel";
import ProcessModel from "../../models/ProcessModel";

describe('TribeModel', () => {
  beforeAll(async () => {
    await connection_db.sync();
  });

  it('should define the TribeModel correctly', () => {
    expect(TribeModel).toBeDefined();
  });

  it('should have the columns id, name_tribe, team_members, and process_id correctly defined', () => {
    const columns = TribeModel.describe();
    expect(columns.id.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.name_tribe.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.team_members.type).toBeInstanceOf(DataTypes.STRING);
    expect(columns.process_id.type).toBeInstanceOf(DataTypes.STRING);
  });

  it('should have the table name "tribe" correctly configured', () => {
    expect(TribeModel.tableName).toBe('tribe');
  });

  it('should have a foreign key reference to the ProcessModel', async () => {
    const foreignKey = TribeModel.associations.process.foreignKey;
    expect(foreignKey).toBe('process_id');
    const targetKey = TribeModel.associations.process.targetKey;
    expect(targetKey).toBe('id');
    expect(TribeModel.associations.process.target.name).toBe(ProcessModel.name);
  });
});
