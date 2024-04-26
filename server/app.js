import connection_db from "./database/connection_db.js";
import express from 'express';
import { PORT } from './config.js';
import cors from 'cors';
import challengeRouter from './routes/challengeRouter.js';
import targetStateRouter from './routes/targetStateRouter.js';
import actualstateRouter from './routes/actualstateRouter.js';
import mentalContrastRouter from './routes/mentalContrastRouter.js';
import obstacleRouter from './routes/obstacleRouter.js';
import hypothesisRouter from './routes/hypothesisRouter.js';
import experimentRouter from './routes/experimentRouter.js';
import taskRouter from './routes/taskRouter.js';
import resultRouter from './routes/resultRouter.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/challenge', challengeRouter);
app.use('/actualstates', actualstateRouter);
app.use('/targetstate', targetStateRouter);
app.use('/mentalcontrast', mentalContrastRouter);
app.use('/obstacle', obstacleRouter);
app.use('/hypothesis', hypothesisRouter);
app.use('/experiment', experimentRouter);
app.use('/task', taskRouter);
app.use('/result', resultRouter);

try {
    await connection_db.authenticate();
    console.log('Connection has been established successfully.👏👏');

    connection_db.sync();

    console.log('Models connected correctly 📋👏👏👏');

   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }

export const server = app.listen(PORT, () => {
    console.log(`La API se esta escuchando en el puerto http://localhost:${PORT}`);
});

export default app;