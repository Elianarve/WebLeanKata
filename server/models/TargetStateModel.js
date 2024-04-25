import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";
import ChallengeModel from "./ChallengeModel";

const TargetStateModel = connection_db.define('TargetState', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ChallengeModel,
            key: 'id' 
        } 
    }    
});

ChallengeModel.hasMany(TargetStateModel, { foreingKey: 'challenge_id' });

export default TargetStateModel;