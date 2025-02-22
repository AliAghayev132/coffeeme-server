// Variables
import { Router } from "#constants/variables.js";
// Controller
import authController from "#controllers/admin/authController.js";

// Middlewares
import { adminAuthenticateToken, adminAuthenticateTokenWithRefresh } from "#middlewares/adminAuthenticateToken.js";

/**
 * @swagger
 * tags:
 *   name: Admin Auth
 *   description: API endpoints for user authentication (register, login, refreshToken)
 */

/**
 * @swagger
 * /admin/auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     description: Kullanıcının refresh token'ını kullanarak yeni bir access token alır.
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Refresh token
 *     responses:
 *       200:
 *         description: Başarılı token yenileme
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Yeni erişim token'ı
 *                 success:
 *                   type: boolean
 *                   description: İşlem durumu
 *                 messages:
 *                   type: string
 *                   description: Başarı mesajı
 *       400:
 *         description: Refresh token eksik veya geçersiz
 *       401:
 *         description: Refresh token geçersiz
 *       404:
 *         description: Admin bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /admin/auth/login:
 *   post:
 *     summary: Admin Giriş Yap
 *     description: Admin'in kullanıcı adı ve şifresi ile giriş yapmasını sağlar.
 *     tags: [Admin Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Admin kullanıcı adı
 *               password:
 *                 type: string
 *                 description: Admin şifresi
 *     responses:
 *       200:
 *         description: Başarılı giriş ve token üretimi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: İşlem durumu
 *                 messages:
 *                   type: string
 *                   description: Başarı mesajı
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Erişim token'ı
 *                     refreshToken:
 *                       type: string
 *                       description: Refresh token
 *       400:
 *         description: Hatalı şifre veya kullanıcı adı
 *       404:
 *         description: Admin bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /admin/auth/change-password:
 *   put:
 *     summary: Admin Şifre Değiştirme
 *     description: Admin'in mevcut şifresini doğrulayarak yeni bir şifre belirlemesini sağlar.
 *     tags: [Admin Auth]
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
 *                 description: Mevcut şifre
 *               newPassword:
 *                 type: string
 *                 description: Yeni şifre
 *     responses:
 *       200:
 *         description: Başarılı şifre değişikliği
 *       400:
 *         description: Eksik veya hatalı şifre
 *       404:
 *         description: Admin bulunamadı
 *       500:
 *         description: Sunucu hatası
 */

const AuthRouter = Router();

// Login
AuthRouter.post('/login', authController.login);
// Refresh Token
AuthRouter.post("/refresh-token", adminAuthenticateTokenWithRefresh, authController.refreshAccessToken);
// Change Password
AuthRouter.put('/change-password', adminAuthenticateToken, authController.changePassword);




export { AuthRouter };  