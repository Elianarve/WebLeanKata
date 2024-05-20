import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ObstacleModel from "./ObstacleModel.js";
import UsersModel from "./userModel.js";

const HypothesisModel = connection_db.define('hypothesis', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
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

UsersModel.hasMany(HypothesisModel, { foreignKey: 'userId' });

 export default HypothesisModel;