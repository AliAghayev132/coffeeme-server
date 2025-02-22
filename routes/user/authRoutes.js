// Variables
import { Router } from "#constants/variables.js";
// Controller
import authController from "#controllers/user/authController.js";
// Middlewares
import { userAuthenticateTokenWithRefresh, userAuthenticateTokenWithRegister } from "#middlewares/userAuthenticateToken.js";

const AuthRouter = Router();


/**
 * @swagger
 * /create-account-step-one:
 *   post:
 *     summary: Hesap oluşturma adımı 1
 *     description: Kullanıcı, e-posta veya telefon numarasını kullanarak hesap oluşturma sürecini başlatır.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [email, phoneNumber]
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OTP başarıyla gönderildi
 *       400:
 *         description: Geçersiz giriş verisi
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/create-account-step-one", authController.createAccountStepOne);

/**
 * @swagger
 * /create-account-step-two:
 *   post:
 *     summary: Hesap oluşturma adımı 2
 *     description: Kullanıcı OTP kodunu doğrular ve geçici bir kayıt tokenı alır.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - otp
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP doğrulandı ve kayıt tokenı oluşturuldu
 *       404:
 *         description: OTP bulunamadı veya yanlış
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/create-account-step-two", authController.createAccountStepTwo);

/**
 * @swagger
 * /create-account-step-three:
 *   post:
 *     summary: Hesap oluşturma adımı 3
 *     description: Kullanıcı bilgilerini tamamlar ve hesabı oluşturur.
 *     tags:
 *       - User Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - birthDate
 *               - gender
 *               - password
 *               - firstName
 *               - secondName
 *             properties:
 *               birthDate:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               secondName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Kullanıcı hesabı başarıyla oluşturuldu
 *       400:
 *         description: Geçersiz giriş verisi
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/create-account-step-three", userAuthenticateTokenWithRegister, authController.createAccountStepThree);

/**
 * @swagger
 * /forgot-password-step-one:
 *   post:
 *     summary: Şifre sıfırlama adımı 1
 *     description: Kullanıcı, e-posta veya telefon numarasıyla OTP alır.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *     responses:
 *       201:
 *         description: OTP başarıyla gönderildi
 *       400:
 *         description: Kullanıcı bulunamadı veya eksik veri
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/forgot-password-step-one", authController.forgotPassowrdStepOne);

/**
 * @swagger
 * /forgot-password-step-two:
 *   post:
 *     summary: Şifre sıfırlama adımı 2
 *     description: Kullanıcı OTP kodunu doğrular ve şifre sıfırlama için token alır.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - otp
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP doğrulandı ve şifre sıfırlama tokenı oluşturuldu
 *       404:
 *         description: OTP bulunamadı veya yanlış
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/forgot-password-step-two", authController.createAccountStepTwo);

/**
 * @swagger
 * /forgot-password-step-three:
 *   post:
 *     summary: Şifre sıfırlama adımı 3
 *     description: Kullanıcı yeni şifresini belirler.
 *     tags:
 *       - User Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Şifre başarıyla güncellendi
 *       400:
 *         description: Geçersiz giriş verisi
 *       500:
 *         description: Sunucu hatası
 */
AuthRouter.post("/forgot-password-step-three", userAuthenticateTokenWithRegister, authController.forgotPassowrdStepThree);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Kullanıcı girişi yap
 *     description: Kullanıcı email veya telefon numarası ve şifre ile giriş yapar.
 *     tags:
 *       - User Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrPhone
 *               - password
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Başarıyla giriş yapıldı.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: "Giriş başarılı."
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Eksik veya hatalı bilgi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 messages:
 *                   type: string
 *                   example: "Eksik bilgi."
 *       404:
 *         description: Kullanıcı bulunamadı veya şifre hatalı.
 *       500:
 *         description: Sunucu hatası.
 */

/**
 * @swagger
 * /refresh-token:
 *   get:
 *     summary: Access Token yenile
 *     description: Kullanıcının refresh token'ı ile yeni bir access token almasını sağlar.
 *     tags:
 *       - User Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Yeni access token başarıyla oluşturuldu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 messages:
 *                   type: string
 *                   example: "Token başarıyla yenilendi."
 *       401:
 *         description: Geçersiz veya süresi dolmuş token.
 *       500:
 *         description: Sunucu hatası.
 */


// Login
AuthRouter.post("/login", authController.login);

// Refresh Token
AuthRouter.get('/refresh-token', userAuthenticateTokenWithRefresh, authController.refreshAccessToken);





export { AuthRouter };  