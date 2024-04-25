import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import ActualStateModel from "./ActualStateModel.js";

const ChallengeModel = connection_db.define('challenges', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        onDelete: 'CASCADE'
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
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
        references: {
            model: ActualStateModel,
            key: 'id' 
        } 
       },     
  },{
    tableName: 'challenges',
    timestamps: false
});

export default ChallengeModel;

