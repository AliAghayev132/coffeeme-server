// Variables
import { Router } from "#constants/variables.js";
// Middlewares
import { parseJsonFields } from "#middlewares/parseJsonFields.js";
import { adminAuthenticateToken } from "#middlewares/adminAuthenticateToken.js";
// Controllers
import productController from "#controllers/admin/productController.js";


const ProductRouter = Router();

// Get All Products

/**
 * @swagger
 * /admin/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products available.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   inStock:
 *                     type: boolean
 *                   rating:
 *                     type: number
 *                   reviewCount:
 *                     type: number
 *                   totalSales:
 *                     type: number
 *                   isDeleted:
 *                     type: boolean
 *                   shop:
 *                     type: string
 *                   servingType:
 *                     type: string
 *                   sizes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                         price:
 *                           type: number
 *                         discountRate:
 *                           type: number
 *                         baseDiscountRate:
 *                           type: number
 *       401:
 *         description: Unauthorized access, invalid token.
 *       500:
 *         description: Internal server error.
 */

ProductRouter.get('/', adminAuthenticateToken, productController.getAllProducts);

/**
 * @swagger
 * /admin/product/all:
 *   get:
 *     summary: Get all products including deleted ones
 *     description: Retrieve a list of all products, including those marked as deleted.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all products, including deleted ones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   image:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   inStock:
 *                     type: boolean
 *                   rating:
 *                     type: number
 *                   reviewCount:
 *                     type: number
 *                   totalSales:
 *                     type: number
 *                   isDeleted:
 *                     type: boolean
 *                   shop:
 *                     type: string
 *                   servingType:
 *                     type: string
 *                   sizes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                         price:
 *                           type: number
 *                         discountRate:
 *                           type: number
 *                         baseDiscountRate:
 *                           type: number
 *       401:
 *         description: Unauthorized access, invalid token.
 *       500:
 *         description: Internal server error.
 */

ProductRouter.get('/all', adminAuthenticateToken, productController.getAllProductsWithDeleted);


/**
 * @swagger
 * /admin/product:
 *   post:
 *     summary: Add a new product
 *     description: Create a new product with the provided details.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               shopId:
 *                  type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               product:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   additionalOptions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         options:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                               discountRate:
 *                                 type: number
 *                               baseDiscountRate:
 *                                 type: number
 *                   servingType:
 *                     type: string
 *                   sizes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                         price:
 *                           type: number
 *                         discountRate:
 *                           type: number
 *                         baseDiscountRate:
 *                           type: number
 *     responses:
 *       201:
 *         description: Product successfully added.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized access, invalid token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /admin/product:
 *   put:
 *     summary: Edit an existing product
 *     description: Update the details of an existing product.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               product:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   additionalOptions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         title:
 *                           type: string
 *                         description:
 *                           type: string
 *                         options:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               title:
 *                                 type: string
 *                               price:
 *                                 type: number
 *                               discountRate:
 *                                 type: number
 *                               baseDiscountRate:
 *                                 type: number
 *                   servingType:
 *                     type: string
 *                   sizes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                         price:
 *                           type: number
 *                         discountRate:
 *                           type: number
 *                         baseDiscountRate:
 *                           type: number
 *     responses:
 *       200:
 *         description: Product successfully updated.
 *       400:
 *         description: Bad request, invalid input data.
 *       401:
 *         description: Unauthorized access, invalid token.
 *       500:
 *         description: Internal server error.
 */

ProductRouter.post('/',
    parseJsonFields,
    adminAuthenticateToken,
    productController.addNewProduct
);


ProductRouter.put('/',
    parseJsonFields,
    adminAuthenticateToken,
    productController.editProduct
);

/**
 * @swagger
 * /admin/product:
 *   delete:
 *     summary: Delete a product
 *     description: Restore a previously deleted product by its ID.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product successfully restored.
 *       401:
 *         description: Unauthorized access, invalid token.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */

ProductRouter.delete('/',
    adminAuthenticateToken,
    productController.deleteProduct
);


/**
 * @swagger
 * /admin/product/restore:
 *   put:
 *     summary: Restore a deleted product
 *     description: Restore a previously deleted product by its ID.
 *     tags: [Admin Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product successfully restored.
 *       401:
 *         description: Unauthorized access, invalid token.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Internal server error.
 */

ProductRouter.put('/restore',
    adminAuthenticateToken,
    productController.restoreProduct
);


export { ProductRouter };