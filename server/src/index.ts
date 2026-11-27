import express from "express";
import "dotenv/config";
import ProductRoute from "./router/product.routes.ts";
import UserRoute from './router/auth.routes.ts'
import cookieParser from "cookie-parser";
import cors from 'cors';

export const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

const port = process.env.PORT || 4000;

app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/auth", UserRoute);

app.listen(port, () => {
    console.log("Server is up and running!");
});
