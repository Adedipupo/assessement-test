import express, { Request, Response } from 'express';
import { loginUser, registerUser } from '../controllers/user';
const router = express.Router();


router.get("/", (req, res) => {
  res.send("users route");
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
