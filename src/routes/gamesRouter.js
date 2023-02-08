import { Router } from "express";
import { getGames, newGames } from "../controllers/gamesController.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)

gamesRouter.post("/games", newGames)