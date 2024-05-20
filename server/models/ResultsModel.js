import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ExperimentModel from "./ExperimentModel.js";
import UsersModel from "./userModel.js";

const ResultsModel = connection_db.define('result', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    experiment_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: ExperimentModel,
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
    analysis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expected_results: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    results_obtained: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    conclusion: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    next_step: {
        type: DataTypes.TEXT,
        allowNull: false 
    }    
},{
    tableName: 'results',
    timestamps: false
});

UsersModel.hasMany(ResultsModel, { foreignKey: 'userId' });

export default ResultsModel;