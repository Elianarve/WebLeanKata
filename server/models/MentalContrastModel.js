import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TargetStateModel from "./TargetStateModel.js";

const MentalContrastModel = connection_db.define('mentalContrast', {
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, 
            max: 10
        }
    },
    target_state_id: {
        type: DataTypes.INTEGER,
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

// TargetStateModel.hasOne(MentalContrastModel, { foreignKey: 'target_state_id' });


export default MentalContrastModel;