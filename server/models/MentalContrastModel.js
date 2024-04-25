import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";
import TargetStateModel from "./TargetStateModel";

const MentalContrastModel = connection_db.define('MentalContrast', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1, // Valor mínimo permitido
            max: 10
        }
    },
    target_state_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TargetStateModel,
            key: 'id' 
        } 
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

MentalContrastModel.hasOne(TargetStateModel, { foreignKey: 'target_state_id' });


export default MentalContrastModel;