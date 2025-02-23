// Variables
import { Router } from "#constants/variables.js";
// Middlewares
import { adminAuthenticateToken } from "#middlewares/adminAuthenticateToken.js";
// Controllers
import subscriberController from "#controllers/admin/subscriberController.js";

const SubscriberRouter = Router();

/**
 * @swagger
 * /admin/subscribers:
 *   get:
 *     summary: Get a paginated list of subscribers
 *     description: Retrieve a list of subscribers with pagination support.
 *     tags: [Admin Subscriber]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of records per page (default is 10)
 *     responses:
 *       200:
 *         description: Successfully fetched paginated subscribers list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     subscribers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalSubscribers:
 *                       type: integer
 *       500:
 *         description: Server error
 */
SubscriberRouter.get("/", adminAuthenticateToken, subscriberController.getSubscribers);

export { SubscriberRouter };