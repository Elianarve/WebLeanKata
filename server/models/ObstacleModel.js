import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TargetStateModel from "./TargetStateModel.js";

const ObstacleModel = connection_db.define('obstacle', { 
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true,
    },
    target_state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TargetStateModel,
            key: 'id' 
        } 
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
    },

},{
    tableName: 'obstacles',
    timestamps: false
});

// TargetStateModel.hasMany(ObstacleModel, { foreingKey: 'target_state_id' });

export default ObstacleModel;