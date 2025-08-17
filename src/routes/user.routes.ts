import { Router } from "express";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { UserController } from "../controller/user.controller";

const router = Router();
const user = new UserController();

// Obtine todos los usuarios
router.get("/", authorizedMiddleware, user.getAllUsers.bind(user));
// Obtine  un usuario en especifico.
router.get("/:id", authorizedMiddleware, user.getUserById.bind(user));

export default router;
