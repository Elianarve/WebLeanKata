import { Sequelize } from "sequelize";
import { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_TEST_NAME, NODE_ENV } from '../config.js';

const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME;  //Escogiendo nuestra conexion con la base de datos de test
// ? es un if y : un else.

const connection_db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => {
    // Filtrar los mensajes que comienzan con 'Executing' para mostrar solo las consultas ejecutadas
    return msg.startsWith('Executing');
  }
});

export default connection_db;