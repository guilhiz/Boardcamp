import { Router } from "express";
import { validateSchema } from "../middlewares/schemaMIddleware.js";
import { customersSchema } from "../schemas/customerSchema.js";
import { getCustomers, getCustomersById, newCustomers, updateCustomers } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);

customersRouter.get("/customers/:id", getCustomersById);

customersRouter.post("/customers",validateSchema(customersSchema), newCustomers);

customersRouter.put("/customers/:id", updateCustomers);

export default customersRouter
