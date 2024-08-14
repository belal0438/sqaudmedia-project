import { Router } from "express";
import {
  registerUser,
  loginUser,
  allUsers,
  userDetail,
  deleteUser,
  userUpdate,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/details").get(allUsers);

router.route("/:id").get(userDetail);

router.route("/user/:id").put(userUpdate);

router.route("/delete/:id").delete(deleteUser);

export default router;
