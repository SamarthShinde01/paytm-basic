import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoute.js";
import accountRoutes from "./routes/accountRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT;
import cors from "cors";

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/account", accountRoutes);

app.get("/", (req, res) => res.send("server is live.."));

app.use(notFound);
app.use(errorHandler);

console.log(`port is ${PORT}`);

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
