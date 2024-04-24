import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";
import ObstacleModel from "./ObstacleModel";

const HypothesisModel = connection_db.define('Hypothesis', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    obstacle_id: {
        type: DataTypes.INTEGER,
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
 });

HypothesisModel.hasMany(ObstacleModel, { foreingKey: 'obstacle_id' });

 export default HypothesisModel;