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
import learningRouter from './routes/learningRouter.js';

// import ChallengeModel from './models/ChallengeModel.js';
// import ActualStateModel from "./models/ActualStateModel.js";
// import ExperimentModel from './models/ExperimentModel.js';
// import HypothesisModel from "./models/HypothesisModel.js";
// import LearningsModel from './models/LearningsModel.js';
// import MentalContrastModel from './models/MentalContrastModel.js';
// import ObstacleModel from "./models/ObstacleModel.js";
// import ResultsModel from "./models/ResultsModel.js";
// import TargetStateModel from "./models/TargetStateModel.js";
// import TaskModel from './models/TaskModel.js';

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
app.use('/results', resultRouter);
app.use('/learning', learningRouter);
app.use('/search', challengeRouter);
app.use('/search', actualstateRouter);

try {
    await connection_db.authenticate();
    console.log('Connection has been established successfully.👏👏');

    connection_db.sync();
    // await ActualStateModel.sync();
    // await ChallengeModel.sync();
    // await TargetStateModel.sync();
    // await ObstacleModel.sync();
    // await MentalContrastModel.sync();
    // await HypothesisModel.sync();
    // await ExperimentModel.sync();
    // await ResultsModel.sync();
    // await TaskModel.sync();
    // await LearningsModel.sync();
    console.log('Models connected correctly 📋👏👏👏');

   } catch (error) {
    console.error('Unable to connect to the database:', error);
   }

export const server = app.listen(PORT, () => {
    console.log(`La API se esta escuchando en el puerto http://localhost:${PORT}`);
});

export default app;