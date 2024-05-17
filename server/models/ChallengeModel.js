import { DataTypes } from "sequelize";
import connection_db from "../database/connection_db.js";
import TribeModel from "./TribeModel.js";

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
    tribe_id: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
        references: {
            model: TribeModel,
            key: 'id' 
        } 
       },     
  },{
    tableName: 'challenges',
    timestamps: false
});

export default ChallengeModel;

