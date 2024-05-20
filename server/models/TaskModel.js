import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ExperimentModel from "./ExperimentModel.js";
import UsersModel from "./userModel.js";

const TaskModel = connection_db.define('task', {
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

ExperimentModel.hasMany(TaskModel, { foreignKey: 'experiment_id' });
UsersModel.hasMany(TaskModel, { foreignKey: 'userId' });

export default TaskModel;