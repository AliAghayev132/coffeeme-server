// Variables
import { Router } from "#constants/variables.js";
// Routes
import { AuthRouter } from "./user/authRoutes.js";
import { AccountRouter } from "./user/accountRoutes.js";


const UserRouter = Router();

UserRouter.use("/auth", AuthRouter);
UserRouter.use("/account", AccountRouter);

export { UserRouter };