import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import UsersModel from "./userModel.js";

const ProcessModel = connection_db.define('process', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        onDelete: 'CASCADE'
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        }
},{
    tableName: 'process',
    timestamps: false
});

UsersModel.hasMany(ProcessModel, { foreignKey: 'userId' });

export default ProcessModel;