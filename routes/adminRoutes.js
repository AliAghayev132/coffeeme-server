// Variables
import { Router } from "#constants/variables.js";
// Routes
import { AuthRouter } from "./admin/authRoutes.js";
import { ShopRouter } from "./admin/shopRoutes.js";

const AdminRouter = Router();

AdminRouter.use("/auth", AuthRouter);
AdminRouter.use("/shop", ShopRouter);

export { AdminRouter };