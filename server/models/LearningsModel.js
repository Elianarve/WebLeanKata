import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ResultsModel from "./ResultsModel.js";

const LearningModel = connection_db.define('learning', {
    id: {
        type: DataTypes.STRING,
        // autoIncrement: true,
        primaryKey: true,
    },
    results_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: ResultsModel,
            key: 'id' 
        } 
    },
    description: { 
        type: DataTypes.TEXT,
        allowNull: false
        },
    learning_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },    
},{
    tableName: 'learnings',
    timestamps: false
});

// ResultsModel.hasOne(LearningModel, { foreignKey: 'results_id' });

export default LearningModel;