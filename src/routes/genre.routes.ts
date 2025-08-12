import { Router } from "express";
import { zoodMiddleware } from "../middlewares/zood.middleware";
import { RegisterGenreValid, UpdateGenreValid } from "../validations/genre.validation";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { GenreController } from "../controller/genre.controller";

const genre = new GenreController();

const router = Router();

router.get("/", authorizedMiddleware, genre.getAllGenres.bind(genre));
router.get("/:id", authorizedMiddleware, genre.findGenreById.bind(genre));

router.post("/", zoodMiddleware(RegisterGenreValid), authorizedMiddleware, genre.registerGenre.bind(genre));
router.put("/:id", zoodMiddleware(UpdateGenreValid), authorizedMiddleware, genre.updateGenre.bind(genre));
router.delete("/:id", authorizedMiddleware, genre.deleteGenre.bind(genre));

export default router;
