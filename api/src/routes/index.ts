import express, { Request, Response } from 'express';
import usersRoute from './users';
const router = express.Router();

/* GET home page. */
router.get("/", (_req: Request, res: Response) => {
  res.send("api is live");
});

// controllers for users route
router.use("/users", usersRoute);

export default router;
