<<<<<<< HEAD
import express, { request, Request, Response, Router } from 'express';

const authRouter: Router = express.Router();

authRouter.post('/auth/register', (req: Request, res: Response) => {
  res.status(400).send({ error: 'Request is missing parts of the body.' });
});

export = authRouter;
=======
<<<<<<< HEAD
//======================================================
//
//  Auth Router
//
//  Provides all routes to do with authentication.
//
//======================================================

import express, { Request, Response } from 'express';
=======
import express, { Request, Response, Router } from 'express';

const authRouter: Router = express.Router();
>>>>>>> 954ea168fdaad66fe8e33570af89586eca036d08
>>>>>>> abbbd08896f95ed1eb89843ce109d613bf7e0150
