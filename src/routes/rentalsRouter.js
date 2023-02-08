import { Router } from "express";

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)

rentalsRouter.post("/rentals", newRental)

rentalsRouter.post("/rentals/:id/return", rentalFinished)

rentalsRouter.delete("/rentals/:id", deleteRental)