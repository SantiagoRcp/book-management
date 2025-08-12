import { Router } from "express";
import { zoodMiddleware } from "../middlewares/zood.middleware";
import { RegisteAuthorValid, UpdateAuthorValid } from "../validations/author.validation";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { AuthorController } from "../controller/author.controller";

const author = new AuthorController();

const route = Router();

route.get("/", authorizedMiddleware, author.getAllAuthor.bind(author));
route.get("/:id", authorizedMiddleware, author.getAuthorById.bind(author));

route.post("/", zoodMiddleware(RegisteAuthorValid), authorizedMiddleware, author.register.bind(author));
route.put("/:id", zoodMiddleware(UpdateAuthorValid), authorizedMiddleware, author.update.bind(author));
route.delete("/:id", authorizedMiddleware, author.deleted.bind(author));

export default route;
