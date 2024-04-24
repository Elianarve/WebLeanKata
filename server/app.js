import connection_db from "./database/connection_db.js";
import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/reto');

try {
    connection_db.authenticate();
    console.log('Connection has been established successfully.👏👏');

    // NewsModel.sync();
    // console.log('Model News connected correctly 📋');

    // UsersModel.sync();
    // console.log('Model Users connected correctly 👤👤');

   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }

export const server = app.listen(PORT, () => {
    console.log(`La API se esta escuchando en el puerto http://localhost:${PORT}`);
});

export default app;