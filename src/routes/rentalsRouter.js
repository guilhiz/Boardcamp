import { Router } from "express";
import { getRentals, newRental, rentalFinished, deleteRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

rentalsRouter.post("/rentals", newRental);

rentalsRouter.post("/rentals/:id/return", rentalFinished);

rentalsRouter.delete("/rentals/:id", deleteRental);

export default rentalsRouter;
