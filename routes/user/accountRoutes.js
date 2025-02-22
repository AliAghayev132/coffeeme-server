// Variables
import { Router } from "#constants/variables.js";
// Controller
import accountController from "#controllers/user/accountController.js";
// Middlewares
import { userAuthenticateToken } from "#middlewares/userAuthenticateToken.js";

const AccountRouter = Router();

/**
 * @swagger
 * /user-me:
 *   get:
 *     summary: Get current user's profile
 *     description: Fetches the profile of the currently authenticated user.
 *     operationId: getUserMe
 *     tags:
 *       - User Account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     secondName:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                       format: date
 *                     email:
 *                       type: string
 *                       format: email
 *                     phoneNumber:
 *                       type: string
 *                     membershipLevel:
 *                       type: string
 *                     balance:
 *                       type: number
 *                       format: float
 *                     recentSearches:
 *                       type: array
 *                       items:
 *                         type: string
 *                     favoriteItems:
 *                       type: array
 *                       items:
 *                         type: string
 *                 success:
 *                   type: boolean
 *                 messages:
 *                   type: string
 *       '404':
 *         description: User not found or unauthorized access
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /change-password:
 *   put:
 *     summary: Change user's password
 *     description: Allows the user to change their password.
 *     operationId: changePassword
 *     tags:
 *       - User Account
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password the user wants to set.
 *     responses:
 *       '200':
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 messages:
 *                   type: string
 *       '404':
 *         description: User not found, validation error, or old password does not match
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /upload-profile-photo:
 *   put:
 *     summary: Upload a new profile photo for the authenticated user
 *     description: This endpoint allows an authenticated user to upload a profile photo. The old profile photo (if exists) is deleted before saving the new one.
 *     tags: 
 *       - User Account
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The profile image file to be uploaded
 *     responses:
 *       200:
 *         description: Profile photo uploaded successfully
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
 *                   example: Profile photo uploaded successfully.
 *       400:
 *         description: File validation failed or upload error
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
 *                   example: Invalid file format.
 *       404:
 *         description: User not found or no file uploaded
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
 *                   example: User not found!
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
 *                   example: Internal server error.
 */


AccountRouter.get("/user-me", userAuthenticateToken, accountController.getUserMe);
AccountRouter.put("/change-password", userAuthenticateToken, accountController.changePassword);
AccountRouter.put("/upload-profile-photo", userAuthenticateToken, accountController.uploadProfilePhoto);


export { AccountRouter };  
