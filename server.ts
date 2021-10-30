import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import indexRoutes from './routes/index.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import startJobs from './jobs/jobs';
import createSeedData from './seed';


const db = require('./models');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  (<any>req).db = db;
  next();
});

app.use(`/`, indexRoutes);
app.use(`/`, userRoutes);
app.use(`/`, authRoutes);

db.sequelize.authenticate().then(
  () => {
    console.log('Connected to DB');
    db.sequelize.sync();

    if (!!process.env.SEED) {
      createSeedData(db);
    }
    
    startJobs();
  },
  (reason: any) => {
    console.error('Error connecting to DB', reason);
  }
);

app.listen(3000, () => {
  console.log('listening on port 3000');
});

