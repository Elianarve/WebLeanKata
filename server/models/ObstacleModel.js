import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";
import TargetStateModel from "./TargetStateModel";

const ObstacleModel = connection_db.define('Obstacle', { 
    id: {
        type: DataTypes.INTEGER,
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
});

ObstacleModel.hasMany(TargetStateModel, { foreingKey: 'target_state_id' });

export default ObstacleModel;