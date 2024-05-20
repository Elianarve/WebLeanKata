import { Sequelize } from "sequelize";
import { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_TEST_NAME, NODE_ENV, DB_HOST } from '../config.js';

const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME;

const connection_db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',

  logging: (msg) => {
    //   // Filtrar los mensajes que comienzan con 'Executing' para mostrar solo las consultas ejecutadas
     return msg.startsWith('Executing');
    }
  
  });

export default connection_db;
