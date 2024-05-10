import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TargetStateModel from "./TargetStateModel.js";

const ObstacleModel = connection_db.define('obstacle', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    target_state_id: {
        type: DataTypes.STRING,
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
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    tableName: 'obstacles',
    timestamps: false
});

// ObstacleModel.hasMany(TargetStateModel, { foreingKey: 'target_state_id' });

export default ObstacleModel;