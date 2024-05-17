import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";

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

export default ProcessModel;