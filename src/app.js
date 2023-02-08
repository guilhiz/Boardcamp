import express, { json } from "express";
import * as dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();
app.use(cors());
app.use(json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running in port: ${port}`);
});
