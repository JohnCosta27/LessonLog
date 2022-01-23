import express, { request, Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post('/auth/register', (req: Request, res: Response) => {
  res.status(400).send({ error: 'Request is missing parts of the body.' });
});

export = authRouter;
