// Models
import Shop from "#models/Shop.js";
import Product from "#models/Product.js";
// Services
import { MessagesService } from "#services/MessagesService.js";
import { ValidatorService } from "#services/ValidatorService.js";
import { FileUploadService } from "#services/FileUploadService.js";
import { FileControlService } from "#services/FileControlService.js";
// Variables
import { productPath } from "#constants/paths.js";
// Utils
import { addActivityToAdmin } from "#utils/admin/addActivity.js";



// Add & Edit
const addNewProduct = async (req, res) => {
    try {
        const {
            shopId,
            product,
        } = req.body;

        const {
            title,
            sizes,
            description,
            servingType,
            additionalOptions
        } = product;


        const validationResult = ValidatorService.validateProduct(product);

        if (!validationResult.isValid) {
            return res.status(400).json({
                success: false,
                message: validationResult.message
            });
        }

        const image = req.files?.image;
        const shop = await Shop.findById(shopId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: MessagesService.error.E409
            });
        }

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: MessagesService.error.E410
            });
        }

        const newProduct = new Product({
            title,
            sizes,
            description,
            servingType,
            shop: shopId,
            additionalOptions,
        })

        const fileUploadResult = await FileUploadService.Upload({
            file: image,
            uploadPath: productPath,
            newName: newProduct._id.toString(),
        })

        newProduct.image = image.name;

        if (!fileUploadResult.success) {
            return res.status(400).json({ success: false, message: fileUploadResult.message });
        }

        shop.products.push(newProduct._id);

        await shop.save();
        await newProduct.save();

        addActivityToAdmin({ message: `New product ${newProduct._id} added` });

        return res.status(201).json({
            success: true,
            message: MessagesService.success.S201
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
};

const editProduct = async (req, res) => {
    try {
        const { productId, product } = req.body;

        const {
            title,
            sizes,
            description,
            servingType,
            additionalOptions
        } = product;

        // 1. Ürün doğrulama
        const validationResult = ValidatorService.validateProduct(product);

        if (!validationResult.isValid) {
            return res.status(400).json({
                success: false,
                message: validationResult.message
            });
        }

        // 2. Ürünü bulma
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: MessagesService.error.E411 // Ürün bulunamadı
            });
        }

        // 4. Resim kontrolü (isteğe bağlı, eğer yeni resim varsa)
        const image = req.files?.image;
        let fileUploadResult;

        if (image) {
            fileUploadResult = await FileUploadService.Upload({
                file: image,
                uploadPath: productPath,
                newName: existingProduct._id.toString(),
            });

            if (!fileUploadResult.success) {
                return res.status(400).json({ success: false, message: fileUploadResult.message });
            }

            FileControlService.Delete({ filePath: `${productPath}/${existingProduct.image}` });

            existingProduct.image = image.name;
        }

        // 5. Ürün bilgilerini güncelleme
        existingProduct.title = title;
        existingProduct.sizes = sizes;
        existingProduct.description = description;
        existingProduct.servingType = servingType;
        existingProduct.additionalOptions = additionalOptions;

        // 6. Ürünü kaydetme
        await existingProduct.save();

        addActivityToAdmin({ message: `Product ${existingProduct._id} edited` });

        
        return res.status(200).json({
            success: true,
            message: MessagesService.success.S202 // Başarılı güncelleme
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
};


// Delete & Restore
const deleteProduct = async (req, res) => {
    try {
        const {
            productId,
        } = req.body;

        const product = await Product.findByIdAndUpdate(productId,
            {
                isDeleted: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: true,
                message: MessagesService.success.E411
            });
        }

        addActivityToAdmin({ message: `Product ${product._id} deleted` });


        return res.status(201).json({
            success: true,
            message: MessagesService.success.S200
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
}

const restoreProduct = async (req, res) => {
    try {
        const {
            productId,
        } = req.body;

        const product = await Product.findByIdAndUpdate(productId,
            {
                isDeleted: false,
            }
        );

        if (!product) {
            return res.status(404).json({
                success: true,
                message: MessagesService.success.E411
            });
        }

        addActivityToAdmin({ message: `Product ${product._id} restored` });

        
        return res.status(201).json({
            success: true,
            message: MessagesService.success.S200
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
}


// Get
const getAllProducts = async (req, res) => {
    try {
        const {
            shopId,
        } = req.body;

        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({
                success: false,
                message: MessagesService.error.E410
            });
        }

        const products = await Product.find({
            shop: shopId,
            isDeleted: false,
        })

        return res.status(201).json({
            products,
            success: true,
            message: MessagesService.success.S200
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
}

const getAllProductsWithDeleted = async (req, res) => {
    try {
        const {
            shopId,
        } = req.body;

        const shop = await Shop.findById(shopId);

        if (!shop) {
            return res.status(404).json({
                success: true,
                message: MessagesService.success.E410
            });
        }

        const products = await Product.find({
            shop: shopId,
        })

        return res.status(201).json({
            products,
            success: true,
            message: MessagesService.success.S200
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: MessagesService.error.E500 });
    }
}



export default {
    editProduct,
    addNewProduct,
    deleteProduct,
    restoreProduct,
    getAllProducts,
    getAllProductsWithDeleted,
};