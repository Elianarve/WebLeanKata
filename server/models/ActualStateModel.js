import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TribeModel from "./TribeModel.js";

const ActualStateModel = connection_db.define('actualstate', { 
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
        },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }, 
    tribe_id: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
        references: {
            model: TribeModel,
            key: 'id' 
        } 
    }
},{
    tableName: 'actualstates',
    timestamps: false
});

export default ActualStateModel;