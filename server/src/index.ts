import express from "express";
import "dotenv/config";
import { db } from "./db/index.ts";
import { sql } from "drizzle-orm";

const app = express();
const port = process.env.PORT || 4000;

app.get("/", async (_, res) => {
  const result = await db.execute(sql`SELECT * from users`);
  console.log(result);
  res.json(result);
});

app.listen(port, () => {
  console.log("Server is up and running!");
});
