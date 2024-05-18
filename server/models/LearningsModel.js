import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ResultsModel from "./ResultsModel.js";
import UsersModel from "./userModel.js";

const LearningModel = connection_db.define('learning', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
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

UsersModel.hasMany(LearningModel, { foreignKey: 'userId' });

export default LearningModel;