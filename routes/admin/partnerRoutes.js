// Variables
import { Router } from "#constants/variables.js";
// Middlewares
import { adminAuthenticateToken } from "#middlewares/adminAuthenticateToken.js";
// Controllers
import partnerController from "#controllers/admin/partnerController.js";

const PartnerRouter = Router();


/**
 * @swagger
 * /admin/partner:
 *   get:
 *     tags: [Admin Partner]
 *     summary: Get all partners
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of all partners, excluding the password field in the partner accounts.
 *     responses:
 *       200:
 *         description: A list of all partners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Partners retrieved successfully."
 *                 partners:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The partner's unique ID
 *                         example: "507f191e810c19729de860ea"
 *                       shop:
 *                         type: string
 *                         description: The partner's associated shop ID
 *                         example: "507f191e810c19729de860eb"
 *                       email:
 *                         type: string
 *                         description: The partner's email address
 *                         example: "partner@example.com"
 *                       phone:
 *                         type: string
 *                         description: The partner's phone number
 *                         example: "+1234567890"
 *                       balance:
 *                         type: number
 *                         description: The partner's balance
 *                         example: 500
 *                       accounts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               description: The partner account ID
 *                               example: "507f191e810c19729de860ec"
 *                             fullName:
 *                               type: string
 *                               description: The full name of the partner account holder
 *                               example: "John Doe"
 *                             username:
 *                               type: string
 *                               description: The username of the partner account holder
 *                               example: "user_12345"
 *                             role:
 *                               type: string
 *                               description: The role of the partner account holder
 *                               example: "seller"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error restoring shop."
 */

PartnerRouter.get("/", adminAuthenticateToken, partnerController.getAllPartners);

/**
 * @swagger
 * /admin/partner:
 *   post:
 *     tags: [Admin Partner]
 *     summary: Create a new partner account
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new partner account, linking it with a specified partner by partnerId.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               partnerId:
 *                 type: string
 *                 description: The ID of the partner to add the account for
 *                 example: "507f191e810c19729de860ea"
 *               partnerAccount:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     description: The full name of the partner account holder
 *                     example: "John Doe"
 *                   username:
 *                     type: string
 *                     description: The username for the partner account
 *                     example: "user_12345"
 *                   password:
 *                     type: string
 *                     description: The password for the partner account
 *                     example: "securePassword123"
 *                   role:
 *                     type: string
 *                     description: The role of the partner account holder
 *                     example: "seller"
 *     responses:
 *       200:
 *         description: The partner account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Partner account created successfully."
 *       400:
 *         description: Invalid input or partner not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Partner not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error creating partner account."
 */
PartnerRouter.post("/", adminAuthenticateToken, partnerController.addPartnerAccount);

/**
 * @swagger
 * /admin/partner:
 *   delete:
 *     summary: Delete a partner's account
 *     description: This endpoint deletes a partner's account and removes it from the partner's accounts list.
 *     tags:
 *       - Admin Partner
 *     parameters:
 *       - in: body
 *         name: partnerId
 *         description: The ID of the partner whose account is to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "67b9aa1fb351e9187ea2e71b"
 *       - in: body
 *         name: accountId
 *         description: The ID of the account to be deleted.
 *         required: true
 *         schema:
 *           type: string
 *           example: "60d5ec49c083f80e6c5b1b9c"
 *     responses:
 *       200:
 *         description: Account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Account deleted successfully"
 *       400:
 *         description: Partner not found or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Partner not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while deleting the account."
 */
PartnerRouter.delete('/', adminAuthenticateToken, partnerController.deletePartnerAccount);

/**
 * @swagger
 * /admin/partner:
 *   put:
 *     summary: "Edit a partner account"
 *     description: "Updates a partner account's information using the provided partnerId, accountId, and partnerAccount data."
 *     tags:
 *       - Admin Partner
 *     parameters:
 *       - in: body
 *         name: body
 *         description: "Data for editing a partner account"
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - partnerId
 *             - accountId
 *             - partnerAccount
 *           properties:
 *             partnerId:
 *               type: string
 *               description: "ID of the partner."
 *               example: "67b9aa1fb351e9187ea2e71b"
 *             accountId:
 *               type: string
 *               description: "ID of the partner account to be updated."
 *               example: "60d5ec49c083f80e6c5b1b9c"
 *             partnerAccount:
 *               type: object
 *               description: "Object containing the fields to be updated for the partner account."
 *               properties:
 *                 fullName:
 *                   type: string
 *                   description: "Full name of the partner account holder."
 *                   example: "Jane Doe"
 *                 username:
 *                   type: string
 *                   description: "Username of the partner account holder."
 *                   example: "jane_doe_123"
 *                 password:
 *                   type: string
 *                   description: "Password of the partner account holder."
 *                   example: "newSecurePassword123"
 *                 role:
 *                   type: string
 *                   description: "Role of the partner account holder."
 *                   enum: ["seller", "admin", "manager"]
 *                   example: "admin"
 *     responses:
 *       200:
 *         description: "Partner account updated successfully."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             message:
 *               type: string
 *               example: "Partner account updated successfully."
 *       400:
 *         description: "Partner or account not found."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Partner not found or account not found."
 *       500:
 *         description: "Internal server error."
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: false
 *             message:
 *               type: string
 *               example: "Error editing partner account."
 */
PartnerRouter.put('/', adminAuthenticateToken, partnerController.editPartnerAccount);

export { PartnerRouter };