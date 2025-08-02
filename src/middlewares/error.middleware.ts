import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

function sendErrorDev(error: AppError, res: Response) {
  console.log("Error", error);
  res.status(error.statusCode).json({ status: error.status, error, message: error.message, stack: error.stack });
}

function sendErrorProd(error: AppError, res: Response){
    if(error.isOperational){
        res.status(error.statusCode).json({status: error.status, message: error.message})
    } else {
        console.log(`Error: ${error}`);
        res.status(500).json({ status: error.status, message: "Something went wrong" });
    }
}


export function globalErrorHandler (error: AppError, req: Request, res: Response, next: NextFunction){
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";


    if(process.env.NODE_ENV === 'development') {
        sendErrorDev(error, res)
    } else if(process.env.NODE_ENV === 'production'){
        sendErrorProd(error, res)
    }

}