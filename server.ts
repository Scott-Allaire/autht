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

// put the database in the requests for controllers
app.use((req, res, next) => {
  (<any>req).db = db;
  next();
});

// add routes
app.use(`/`, indexRoutes);
app.use(`/`, userRoutes);
app.use(`/`, authRoutes);

// 404 handler
app.use(function (req, res, next) {
  console.warn('Route not found', req.url);
  res.status(404).send("Route not found");
})

// default error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send('Unexpected error');
})

// connect to the database
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

// start the server
app.listen(3000, () => {
  console.log('listening on port 3000');
});

