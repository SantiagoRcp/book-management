import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import authorRoutes from "./routes/author.routes";
import genreRoutes from "./routes/genre.routes";
import bookRoures from "./routes/book.routes";
import { globalErrorHandler } from "./middlewares/error.middleware";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/author", authorRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/book", bookRoures);

app.use(globalErrorHandler);

export default app;
