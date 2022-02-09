//======================================================
//
//  Index file
//
//  This is the starting point of the project, it starts
//  the express server and integrates all the different
//  routers that are needed.
//
//======================================================

import { createServer } from './app';
import { Application } from 'express';

const app: Application = createServer();
app.listen(5000, async () => console.log('Server running'));
