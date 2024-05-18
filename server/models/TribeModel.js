import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ProcessModel from "./ProcessModel.js";
import UsersModel from "./userModel.js";

const TribeModel = connection_db.define('tribe', { 
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        onDelete: 'CASCADE'
    },
    name_tribe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    team_members: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    process_id: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
        references: {
            model: ProcessModel,
            key: 'id' 
        } 
    }
},{
    tableName: 'tribe',
    timestamps: false
});

UsersModel.hasMany(TribeModel, { foreignKey: 'userId' });


export default TribeModel;