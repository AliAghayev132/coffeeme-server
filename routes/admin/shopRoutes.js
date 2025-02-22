// Variables
import { Router } from "#constants/variables.js";
// Middlewares
import { parseJsonFields } from "#middlewares/parseJsonFields.js";
import { adminAuthenticateToken } from "#middlewares/adminAuthenticateToken.js";
// Controllers
import shopController from "#controllers/admin/shopController.js";

const ShopRouter = Router();

/**
 * @swagger
 * /admin/shop:
 *   get:
 *     summary: Get all active shops
 *     tags: [Admin Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved active shops
 */
ShopRouter.get(
    "/",
    adminAuthenticateToken,
    shopController.getAllShops,
)
/**
 * @swagger
 * /admin/shop/all:
 *   get:
 *     summary: Get all shops including deleted ones
 *     tags: [Admin Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all shops
 */
ShopRouter.get(
    "/all",
    adminAuthenticateToken,
    shopController.getAllShopsWithDeleted,
)
/**
 * @swagger
 * /admin/shop:
 *   post:
 *     summary: Create a new shop
 *     description: Creates a new shop with details such as name, address, location, logo, cover photo, operating hours, discount rate, and settings.
 *     tags:
 *       - Admin Shops
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the shop.
 *                 example: "Cafe Latte"
 *               address:
 *                 type: string
 *                 description: The full address of the shop.
 *                 example: "123 Coffee St, City Center"
 *               shortAddress:
 *                 type: string
 *                 description: A shorter version of the address.
 *                 example: "123 Coffee St"
 *               location:
 *                 type: object
 *                 description: The location coordinates of the shop.
 *                 properties:
 *                   coordinates:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                         description: The latitude of the shop.
 *                         example: 40.7128
 *                       longitude:
 *                         type: number
 *                         description: The longitude of the shop.
 *                         example: -74.0060
 *               discountRate:
 *                 type: number
 *                 description: The discount rate for the shop.
 *                 example: 10
 *               operatingHours:
 *                 type: object
 *                 description: The operating hours for the shop.
 *                 properties:
 *                   open:
 *                     type: string
 *                     description: The opening hour of the shop.
 *                     example: "08"
 *                   close:
 *                     type: string
 *                     description: The closing hour of the shop.
 *                     example: "20"
 *               settings:
 *                 type: object
 *                 description: The settings for the shop.
 *                 properties:
 *                   machineLearning:
 *                     type: object
 *                     properties:
 *                       isWorking:
 *                         type: boolean
 *                         description: Whether the machine learning system is active.
 *                         example: true
 *                       startingLimit:
 *                         type: number
 *                         description: The starting limit for machine learning.
 *                         example: 30
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo image for the shop.
 *               coverPhoto:
 *                 type: string
 *                 format: binary
 *                 description: The cover photo image for the shop.
 *     responses:
 *       201:
 *         description: Successfully created the new shop
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
 *                   example: "Shop created successfully"
 *                 shop:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109c8"
 *                     name:
 *                       type: string
 *                       example: "Cafe Latte"
 *                     address:
 *                       type: string
 *                       example: "123 Coffee St, City Center"
 *                     shortAddress:
 *                       type: string
 *                       example: "123 Coffee St"
 *                     location:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "Point"
 *                         coordinates:
 *                           type: object
 *                           properties:
 *                             latitude:
 *                               type: number
 *                               example: 40.7128
 *                             longitude:
 *                               type: number
 *                               example: -74.0060
 *                     operatingHours:
 *                       type: object
 *                       properties:
 *                         open:
 *                           type: string
 *                           example: "08"
 *                         close:
 *                           type: string
 *                           example: "20"
 *                     discountRate:
 *                       type: number
 *                       example: 10
 *                     logo:
 *                       type: string
 *                       example: "logo.png"
 *                     coverPhoto:
 *                       type: string
 *                       example: "cover-photo.jpg"
 *       400:
 *         description: Bad request, missing required fields or invalid data
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
 *                   example: "Shop name is required and must be a valid string."
 *       500:
 *         description: Server error
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
 *                   example: "An error occurred while creating the shop"
 */
ShopRouter.post(
    "/",
    parseJsonFields,
    adminAuthenticateToken,
    shopController.createNewShop
);
/**
 * @swagger
 * /admin/shop:
 *   delete:
 *     summary: Delete a shop by ID
 *     description: Marks a shop as deleted by setting `isDeleted` to true. Requires admin authentication.
 *     tags:
 *       - Admin Shops
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                 type: string
 *                 description: The ID of the shop to be deleted.
 *                 example: "60d0fe4f5311236168a109c8"
 *     responses:
 *       200:
 *         description: Successfully deleted the shop
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
 *                   example: "Shop deleted successfully"
 *                 shop:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109c8"
 *                     name:
 *                       type: string
 *                       example: "My Shop"
 *                     isDeleted:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Shop not found or already deleted
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
 *                   example: "Shop not found"
 *       500:
 *         description: Server error
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
 *                   example: "An error occurred while deleting the shop"
 */
ShopRouter.delete(
    "/",
    adminAuthenticateToken,
    shopController.deleteShop,
)
/**
 * @swagger
 * /admin/shop/restore:
 *   put:
 *     summary: Restore a soft-deleted shop
 *     tags: [Admin Shops]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shopId
 *             properties:
 *               shopId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully restored shop
 */
ShopRouter.put(
    "/restore",
    adminAuthenticateToken,
    shopController.restoreShop,
)
/**
 * @swagger
 * /admin/shop:
 *   put:
 *     summary: Edit an existing shop
 *     description: Update the details of a shop, including its name, address, location, settings, shortAddress, discountRate, operating hours, logo, and cover photo.
 *     operationId: editShop
 *     tags:
 *       - Admin Shops
 *     parameters:
 *       - in: body
 *         name: body
 *         description: The details of the shop to be updated
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             shopId:
 *               type: string
 *               description: The ID of the shop to be updated
 *             name:
 *               type: string
 *               description: The name of the shop
 *             address:
 *               type: string
 *               description: The full address of the shop
 *             location:
 *               type: object
 *               description: The location coordinates of the shop.
 *               properties:
 *                 coordinates:
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                       description: The latitude of the shop.
 *                       example: 40.7128
 *                     longitude:
 *                       type: number
 *                       description: The longitude of the shop.
 *                       example: -74.0060
 *             settings:
 *               type: object
 *               description: The settings related to the shop
 *             shortAddress:
 *               type: string
 *               description: The short address of the shop
 *             discountRate:
 *               type: number
 *               format: float
 *               description: The discount rate for the shop
 *             operatingHours:
 *               type: object
 *               properties:
 *                 opening:
 *                   type: string
 *                   format: time
 *                   description: The opening time of the shop
 *                 closing:
 *                   type: string
 *                   format: time
 *                   description: The closing time of the shop
 *             logo:
 *               type: string
 *               format: file
 *               description: The new logo image for the shop (optional)
 *             coverPhoto:
 *               type: string
 *               format: file
 *               description: The new cover photo image for the shop (optional)
 *     responses:
 *       200:
 *         description: Shop updated successfully
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
 *                   example: "Shop updated successfully."
 *                 shop:
 *                   $ref: '#/components/schemas/Shop'
 *       400:
 *         description: Invalid input or file upload error
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
 *                   example: "Error message describing what went wrong"
 *       404:
 *         description: Shop not found
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
 *                   example: "Shop not found."
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
 *                   example: "An error occurred while processing the request."
 * components:
 *   schemas:
 *     Shop:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         shortAddress:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *             coordinates:
 *               type: array
 *               items:
 *                 type: number
 *         settings:
 *           type: object
 *         discountRate:
 *           type: number
 *           format: float
 *         operatingHours:
 *           type: object
 *           properties:
 *             opening:
 *               type: string
 *               format: time
 *             closing:
 *               type: string
 *               format: time
 *         logo:
 *           type: string
 *         coverPhoto:
 *           type: string
 */
ShopRouter.put(
    "/",
    parseJsonFields,
    adminAuthenticateToken,
    shopController.editShop
)



export { ShopRouter };