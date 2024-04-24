import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db";
import ActualStateModel from "./ActualStateModel";

const ChallengeModel = connection_db.define('Challenge', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
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
      actual_state_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: ActualStateModel,
            key: 'id' 
        } 
       },     
  });

ChallengeModel.hasOne(ActualStateModel, { foreignKey: 'actual_state_id' });


export default ChallengeModel;