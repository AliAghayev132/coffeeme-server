// Variables
import { Router } from "#constants/variables.js";
// Middlewares
import { adminAuthenticateToken } from "#middlewares/adminAuthenticateToken.js";
// Controllers
import userController from "#controllers/admin/userController.js";

const UserRouter = Router();


/**
 * @swagger
 * /admin/user:
 *   get:
 *     summary: Get a paginated list of users without deleted
 *     description: Retrieve a list of users with pagination support. Only accessible by admin.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
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
 *         description: Successfully fetched paginated users list
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           firstName:
 *                             type: string
 *                           secondName:
 *                             type: string
 *                           image:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phoneNumber:
 *                             type: string
 *                           accountStatus:
 *                             type: string
 *                             enum: ["active", "inactive", "banned"]
 *                           birthDate:
 *                             type: string
 *                             format: date
 *                           gender:
 *                             type: string
 *                             enum: ["male", "female", "other"]
 *                           balance:
 *                             type: number
 *                           membershipLevel:
 *                             type: string
 *                             enum: ["basic", "premium", "vip"]
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalUsers:
 *                       type: integer
 *       401:
 *         description: Unauthorized, admin access required
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /admin/user/all:
 *   get:
 *     summary: Get a paginated list of users with deleted users
 *     description: Retrieve a list of users with pagination support. Only accessible by admin.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
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
 *         description: Successfully fetched paginated users list
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
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           firstName:
 *                             type: string
 *                           secondName:
 *                             type: string
 *                           image:
 *                             type: string
 *                           email:
 *                             type: string
 *                           phoneNumber:
 *                             type: string
 *                           accountStatus:
 *                             type: string
 *                             enum: ["active", "inactive", "banned"]
 *                           birthDate:
 *                             type: string
 *                             format: date
 *                           gender:
 *                             type: string
 *                             enum: ["male", "female", "other"]
 *                           balance:
 *                             type: number
 *                           membershipLevel:
 *                             type: string
 *                             enum: ["basic", "premium", "vip"]
 *                     totalPages:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     totalUsers:
 *                       type: integer
 *       401:
 *         description: Unauthorized, admin access required
 *       500:
 *         description: Server error
 */

UserRouter.get("/", adminAuthenticateToken, userController.getUsers);
UserRouter.get("/all", adminAuthenticateToken, userController.getUsersWithDeleted);


/**
 * @swagger
 * /admin/user/restore:
 *   put:
 *     summary: Restore a deleted user
 *     description: Restore a user that was previously marked as deleted.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to restore.
 *     responses:
 *       200:
 *         description: User successfully restored.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: User not found or not deleted.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /admin/user:
 *   delete:
 *     summary: Soft delete a user
 *     description: Mark a user as deleted instead of permanently removing them.
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to delete.
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: User not found or not deleted.
 *       500:
 *         description: Internal server error.
 */

UserRouter.delete("/", adminAuthenticateToken, userController.deleteUser);
UserRouter.put("/restore", adminAuthenticateToken, userController.restoreUser);


/**
 * @swagger
 * /admin/user/block:
 *   put:
 *     summary: Block a user
 *     description: Block a user by updating their account status to "blocked".
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to block.
 *     responses:
 *       200:
 *         description: User successfully blocked.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 * /admin/user/unblock:
 *   put:
 *     summary: Unblock a user
 *     description: Unblock a user by updating their account status to "active".
 *     tags: [Admin User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user to unblock.
 *     responses:
 *       200:
 *         description: User successfully unblocked.
 *       400:
 *         description: User ID is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

UserRouter.put("/block", adminAuthenticateToken, userController.blockUser);
UserRouter.put("/unblock", adminAuthenticateToken, userController.unBlockUser);

/**
 * @swagger
 * /admin/user:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the system.
 *     tags:
 *       - Admin User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - membershipLevel
 *               - birthDate
 *               - firstName
 *               - secondName
 *               - gender
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address.
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number (Azerbaijan format).
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *                 description: User's gender.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: "Must contain at least 8 characters, one uppercase, one lowercase, one digit, and one special character."
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: User's birth date (YYYY-MM-DD format).
 *               firstName:
 *                 type: string
 *                 description: User's first name.
 *               secondName:
 *                 type: string
 *                 description: User's last name.
 *               membershipLevel:
 *                 type: string
 *                 enum: [basic, premium, vip]
 *                 description: Membership level of the user.
 *     responses:
 *       201:
 *         description: User created successfully.
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
 *                   example: "User created successfully."
 *                 userId:
 *                   type: string
 *                   format: uuid
 *                   example: "64e2b2f6f1c14e3b8a1c1d2a"
 *       400:
 *         description: Validation error.
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
 *                   example: "Email or phone number is already in use."
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal Server Error."
 */
UserRouter.post("/",adminAuthenticateToken,userController.createUser);


export { UserRouter };