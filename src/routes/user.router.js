import { Router } from "express";
import {
  registerUser,
  loginUser,
  allUsers,
  userDetail,
  deleteUser,
  userUpdate,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/details").get(verifyJWT, allUsers);

router.route("/:id").get(verifyJWT, userDetail);

router.route("/user/:id").put(verifyJWT, userUpdate);

router.route("/delete/:id").delete(verifyJWT, deleteUser);

export default router;
