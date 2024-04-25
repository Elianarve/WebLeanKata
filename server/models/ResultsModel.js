import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ExperimentModel from "./ExperimentModel.js";

const ResultsModel = connection_db.define('result', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    experiment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
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

// ExperimentModel.hasOne(ResultsModel, { foreignKey: 'experiment_id' });

export default ResultsModel;