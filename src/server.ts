import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configurations/connection";
import mongoose from "mongoose";
import routes from "./routes/index"
import { corsOptions } from "./configurations/cors";
import cors from "cors"

dotenv.config();

connectDB();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use( cors(corsOptions) )

app.use(  express.json( {
  limit: "100mb"
} ) )

app.use( '/api', routes )

app.get("/", (req: Request, res: Response) => {
  res.send("KasiHive Server");
});

mongoose.connection.once('open', () => {
  console.log("⚡️[server]: Connection To Database Successful")
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
})