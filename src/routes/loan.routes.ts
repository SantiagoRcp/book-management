import { Router } from "express";
import { authorizedMiddleware } from "../middlewares/authorized.middleware";
import { LoandController } from "../controller/loan.controller";
import { zoodMiddleware } from "../middlewares/zood.middleware";
import { CreateLoanValid } from "../validations/loan.validation";

const loand = new LoandController();

const routes = Router();

// Obtine todos los prestamos
routes.get("/", authorizedMiddleware, loand.getAllLoan.bind(loand));

// Obtine un prestamo en especifico
routes.get("/:id", authorizedMiddleware, loand.getLoanById.bind(loand));

// Generar un prestamo
routes.post("/", zoodMiddleware(CreateLoanValid), authorizedMiddleware, loand.generateLoan.bind(loand));

//
routes.put("/:id/return", authorizedMiddleware, loand.returnLoan.bind(loand));

export default routes;
