import express from "express";
import "dotenv/config";
import ProductRoute from "./router/product.routes.ts";

export const app = express();
const port = process.env.PORT || 4000;

app.use("/api/v1/product", ProductRoute);

app.listen(port, () => {
    console.log("Server is up and running!");
});
