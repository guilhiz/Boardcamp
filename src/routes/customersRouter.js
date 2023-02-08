import { Router } from "express";
import { getCustomers, getCustomersById, newCustomers, updateCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);

customersRouter.get("/customers/:id", getCustomersById);

customersRouter.post("/customers", newCustomers);

customersRouter.put("/customers/:id", updateCustomers);

export default customersRouter
