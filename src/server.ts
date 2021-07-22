import express from 'express';
import cluster from 'cluster';
import mongo from './config/database';
import userControllers from './user/controllers';
import authControllers from './auth/controllers';
import config from './config/config';
import helmet from 'helmet';
const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || 'dev';

if (cluster.isMaster) {
  if(ENV === 'dev' || ENV === 'qa' || ENV === 'prod'){
    for(let i=0; i < config.clusters[ENV]; i++){
      cluster.fork();
    }
  } else {
    throw new Error('Your ENV variable is not one of three dev | qa | prod');
  }
} else {
  // Default Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  // Error handling
  process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  }).on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });
  
  // Routers

  app.listen(PORT, (): void => {
    console.log('\x1b[33m ' + new Date() + ' Your app is running on port ' + PORT + '\x1b[0m');
  });
  mongo.connect((db: any) => {
    userControllers(app, db);
    authControllers(app, db);   
    console.log('\x1b[33m ' + new Date() + ' Connected to MongoDB  \x1b[0m');
  });
}
