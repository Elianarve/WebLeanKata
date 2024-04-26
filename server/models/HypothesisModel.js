import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ObstacleModel from "./ObstacleModel.js";

const HypothesisModel = connection_db.define('hypothesis', {
    id: {
        type: DataTypes.STRING,
        // autoIncrement: true,
        primaryKey: true,
    },
    obstacle_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ObstacleModel,
            key: 'id' 
        } 
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    state_hipothesis: {
        type: DataTypes.TEXT,
        allowNull: false
    }    
 },{
    tableName: 'hypothesis',
    timestamps: false
});

// ObstacleModel.hasMany(HypothesisModel, { foreingKey: 'obstacle_id' });

 export default HypothesisModel;