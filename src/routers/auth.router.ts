//======================================================
//
//  Auth Router
//
//  Provides all routes to do with authentication.
//
//======================================================

import express, { Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.get('/', (req, res) => {
  res.status(200).json({ hello: 'world' });
});

authRouter.post('/register', (req: Request, res: Response) => {
  res.status(400).json({ error: 'Request is missing parts of the body.' });
});

export = authRouter;
