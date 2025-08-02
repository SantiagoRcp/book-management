import { Router } from "express";
import { zoodMiddleware } from "../middlewares/zood.middleware";
import { RegisterUserValid, LoginUserValid } from "../validations/auth.validation";
import { AuthController } from "../controller/auth.controller";

const route = Router();
const auth = new AuthController();

route.post("/register", zoodMiddleware(RegisterUserValid), auth.register.bind(auth));
route.post("/login", zoodMiddleware(LoginUserValid), auth.login.bind(auth));

export default route;
