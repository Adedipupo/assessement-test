import express, { Request, Response } from 'express';
import { registerUser } from '../controllers/user';
const router = express.Router();


router.get("/", (req, res) => {
  res.send("users route");
});

router.post("/register", registerUser);

export default router;
