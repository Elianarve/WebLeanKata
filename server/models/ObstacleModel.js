import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TargetStateModel from "./TargetStateModel.js";
import UsersModel from "./userModel.js";

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

UsersModel.hasMany(ObstacleModel, { foreignKey: 'userId' });

export default ObstacleModel;