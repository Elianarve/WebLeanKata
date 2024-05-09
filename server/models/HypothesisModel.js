import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ObstacleModel from "./ObstacleModel.js";

const HypothesisModel = connection_db.define('hypothesis', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    obstacle_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: ObstacleModel,
            key: 'id' 
        } 
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    plan_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    state_hypothesis: {
        type: DataTypes.TEXT,
        allowNull: false
    }    
 },{
    tableName: 'hypothesis',
    timestamps: false
});

// ObstacleModel.hasMany(HypothesisModel, { foreingKey: 'obstacle_id' });

 export default HypothesisModel;