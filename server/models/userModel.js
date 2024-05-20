import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";


const UsersModel = connection_db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        allowNull: false
    },
},{
    tableName: 'users',
    timestamps: false
});

export default UsersModel;