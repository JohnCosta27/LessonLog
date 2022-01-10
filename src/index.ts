//======================================================
//
//  Index file
//
//  This is the starting point of the project, it starts
//  the express server and integrates all the different
//  routers that are needed.
//
//======================================================

import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(5000, async () => console.log('Server running'));
