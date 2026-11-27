import express from "express";
import "dotenv/config";
import ProductRoute from "./router/product.routes.ts";
import UserRoute from './router/auth.routes.ts'
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 4000;

app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/auth", UserRoute);

app.listen(port, () => {
    console.log("Server is up and running!");
});
