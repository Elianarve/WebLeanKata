import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";

const ActualStateModeleModel = connection_db.define('ActualState', { 
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
});

export default ActualStateModeleModel;