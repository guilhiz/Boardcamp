import { Router } from "express";
import { rentalFinishedMiddleware, newRentalMiddleware } from "../middlewares/rentalMiddleware.js";
import { validateSchema } from "../middlewares/schemaMIddleware.js";
import { rentalSchema } from "../schemas/rentalSchema.js";
import { getRentals, newRental, rentalFinished, deleteRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

rentalsRouter.post("/rentals", validateSchema(rentalSchema), newRentalMiddleware, newRental);

rentalsRouter.post("/rentals/:id/return", rentalFinishedMiddleware, rentalFinished);

rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
