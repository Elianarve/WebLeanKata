import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ChallengeModel from "./ChallengeModel.js";

const TargetStateModel = connection_db.define('targetstate', { 
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },    
},{
    tableName: 'targetstates',
    timestamps: false
});

// ChallengeModel.hasMany(TargetStateModel, { foreingKey: 'challenge_id' });

export default TargetStateModel;