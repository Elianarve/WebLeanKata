import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TargetStateModel from "./TargetStateModel.js";
import UsersModel from "./userModel.js";

const MentalContrastModel = connection_db.define('mentalContrast', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            max: 10
        }
    },
    evaluation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    target_state_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
            model: TargetStateModel,
            key: 'id' 
        } 
    }
},{
    tableName: 'mentalContrasts',
    timestamps: false
});

UsersModel.hasMany(MentalContrastModel, { foreignKey: 'userId' });

export default MentalContrastModel;