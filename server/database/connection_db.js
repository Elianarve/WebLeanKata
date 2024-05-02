import { Sequelize } from "sequelize";
import { DB_DEV_NAME, DB_USER, DB_PASSWORD } from '../config.js';

const connection_db = new Sequelize(DB_DEV_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    // Filtrar los mensajes que comienzan con 'Executing' para mostrar solo las consultas ejecutadas
    return msg.startsWith('Executing');
  }
});

export default connection_db;