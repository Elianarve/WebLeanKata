import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";

const ActualStateModel = connection_db.define('actualstate', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
},{
    tableName: 'actualstates',
    timestamps: false
});

export default ActualStateModel;