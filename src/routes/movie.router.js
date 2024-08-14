import { Router } from "express";
import { movieList } from "../controllers/movie.controllers.js";

const router = Router();

router.route("/").get(movieList);

export default router;
