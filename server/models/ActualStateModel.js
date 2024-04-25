import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";

const ActualStateModel = connection_db.define('actualstate', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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