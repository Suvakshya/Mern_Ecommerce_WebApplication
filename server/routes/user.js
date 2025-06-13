import express from "express";
import { loginUser, myProfile, verifyUser } from "../controller/user.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/user/login", loginUser);
router.post("/user/verify", verifyUser);
router.get("/user/me", isAuth, myProfile);

export default router;
