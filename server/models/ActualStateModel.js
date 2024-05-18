import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ChallengeModel from "./ChallengeModel.js";
import UsersModel from "./userModel.js";

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
    challenge_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ChallengeModel,
            key: 'id' 
        } 
    }
},{
    tableName: 'actualstates',
    timestamps: false
});

UsersModel.hasMany(ActualStateModel, { foreignKey: 'userId' });

export default ActualStateModel;