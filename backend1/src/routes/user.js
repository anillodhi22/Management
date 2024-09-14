import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.js";
import {
  loginUser,
  logoutUser,
  registerUser,
  updatesAccocuntDetails,
} from "../controllers/user.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/update-account").patch(verifyJWT, updatesAccocuntDetails);

export default router;
