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

import express, { Application, Request, Response } from 'express';

export const createServer = () => {
  const app: Application = express();

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello');
  });

  return app;
};
