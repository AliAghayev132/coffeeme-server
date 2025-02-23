// Variables
import { Router } from "#constants/variables.js";
// Routes
import { UserRouter } from "./admin/userRoutes.js";
import { AuthRouter } from "./admin/authRoutes.js";
import { ShopRouter } from "./admin/shopRoutes.js";
import { PartnerRouter } from "./admin/partnerRoutes.js";
import { ProductRouter } from "./admin/productRoutes.js";
import { SubscriberRouter } from "./admin/subscriberRoutes.js";

const AdminRouter = Router();

AdminRouter.use("/auth", AuthRouter);
AdminRouter.use("/shop", ShopRouter);
AdminRouter.use("/user", UserRouter);
AdminRouter.use("/partner", PartnerRouter);
AdminRouter.use("/product", ProductRouter);
AdminRouter.use("/subscriber", SubscriberRouter);


export { AdminRouter };