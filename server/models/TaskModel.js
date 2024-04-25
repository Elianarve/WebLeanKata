import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ExperimentModel from "./ExperimentModel.js";

const TaskModel = connection_db.define('task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    experiment_id: {
        type: DataTypes.INTEGER,
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
    responsible:{
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
     },
    end_date_prev: { 
        type: DataTypes.DATEONLY,
        allowNull: false,
         },  
    end_date_real: { 
       type: DataTypes.DATEONLY,
       allowNull: false,
        },
    state: {
        type: DataTypes.TEXT,
        allowNull: false
    }               
},{
    tableName: 'tasks',
    timestamps: false
});      

// ExperimentModel.hasMany(TaskModel, { foreignKey: 'experiment_id' });

export default TaskModel;