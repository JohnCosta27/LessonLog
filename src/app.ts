//======================================================
//
//  App file
//
//  This is the export file for the app, the express
//  server starts here and is ran in index.ts.
//
//  This file exports the create server function, this
//  does exactly what you think and creates an express
//  server.
//
//  Note that this file does not start the application.
//  It does not start listening on a port.
//
//======================================================

import express, { Application, NextFunction, Request, Response } from 'express';
var bodyParser = require('body-parser');
import authRouter from './routers/auth.router';

export const createServer = (): Application => {
  const app: Application = express();

<<<<<<< HEAD
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.contentType('application/json');
    next();
  });

  app.use(bodyParser.json());
  app.use(authRouter);
=======
  app.use('/auth', authRouter);
>>>>>>> b892c6a68c2d80fe7e77eab5be18d0c65aa0e736

  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ data: 'Hello' });
  });

  return app;
};
