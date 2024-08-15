import { Router } from "express";
import { movieList } from "../controllers/movie.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, movieList);

export default router;
