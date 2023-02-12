import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMIddleware.js";
import { gamesSchema } from "../schemas/gameSchema.js";
import { getGames, newGames } from "../controllers/gamesController.js";

const gamesRouter = Router()

gamesRouter.get("/games", getGames)

gamesRouter.post("/games",validateSchema(gamesSchema), newGames)

export default gamesRouter