import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ChallengeModel from "./ChallengeModel.js";
import UsersModel from "./userModel.js";

const TargetStateModel = connection_db.define('targetstate', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    date_goal: {
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
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },    
},{
    tableName: 'targetstates',
    timestamps: false
});

 ChallengeModel.hasMany(TargetStateModel, { foreignKey: 'challenge_id' });
 UsersModel.hasMany(TargetStateModel, { foreignKey: 'userId' });

export default TargetStateModel;