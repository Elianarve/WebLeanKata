import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import HypothesisModel from "./HypothesisModel.js";

const ExperimentModel = connection_db.define('experiment', {
    id: {
        type: DataTypes.STRING,
        // autoIncrement: true,
        primaryKey: true,
    },
    hiphotesis_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: HypothesisModel,
            key: 'id' 
        } 
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    start_date: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
     },
    end_date: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
        },  
    goals: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    methodology: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    variables: {
        type: DataTypes.TEXT,
        allowNull: false
    },  
    control_group: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    success_criteria: {
        type: DataTypes.TEXT,
        allowNull: false 
    },
    responsible:{
        type: DataTypes.STRING,
        allowNull: false
    },  
    state_experiment: {
        type: DataTypes.TEXT,
        allowNull: false 
    }    
},{
    tableName: 'experiments',
    timestamps: false
});

// HypothesisModel.hasMany(ExperimentModel, { foreingKey: 'hiphotesis_id' });

export default ExperimentModel;