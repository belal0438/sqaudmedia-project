import { Router } from "express";
import {
  registerUser,
  loginUser,
  allUsers,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/users").get(allUsers);

export default router;
