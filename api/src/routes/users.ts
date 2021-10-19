import express from "express";
import {
  getAllUser,
  // getUser,
  loginUser,
  registerUser,
} from "../controllers/user";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("users route");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/:id", getUser);
router.get("/allusers", getAllUser);

export default router;
