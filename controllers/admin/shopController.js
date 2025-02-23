// Models
import Shop from "#models/Shop.js";
// Variables
import { coverPhotoPath, logoPath } from "#constants/paths.js";
// Services
import { MessagesService } from "#services/MessagesService.js";
import { ValidatorService } from "#services/ValidatorService.js";
import { FileUploadService } from "#services/FileUploadService.js";
import { FileControlService } from "#services/FileControlService.js";
// Utils
import { partnerCreate } from "#utils/admin/partnerCreate.js";
import { addActivityToAdmin } from "#utils/admin/addActivity.js";


const createNewShop = async (req, res) => {
    try {
        const {
            name,
            address,
            settings,
            location,
            shortAddress,
            discountRate,
            operatingHours,
        } = req.body;

        const { logo, coverPhoto } = req.files || {};

        const validation = ValidatorService.validateShop({
            name,
            address,
            location,
            settings,
            shortAddress,
            discountRate,
            operatingHours,
        });

        if (!validation.isValid) {
            return res.status(400).json({ success: false, message: validation.message });
        }


        if (!logo || !coverPhoto) {
            return res.status(400).json({ success: false, message: MessagesService.validation.V100 });
        }

        const newShop = new Shop({
            name,
            address,
            location: {
                type: "Point",
                coordinates: location.coordinates,
            },
            settings,
            shortAddress,
            discountRate,
            operatingHours,
        });


        let fileUploadResult = await FileUploadService.Upload({
            file: logo,
            uploadPath: logoPath,
            newName: handleFileName({ file: logo, newName: newShop._id }),
        });


        if (!fileUploadResult.success) {
            return res.status(400).json({ success: false, message: fileUploadResult.message });
        }


        fileUploadResult = await FileUploadService.Upload({
            file: coverPhoto,
            uploadPath: coverPhotoPath,
            newName: newShop._id.toString(),
        });


        if (!fileUploadResult.success) {
            return res.status(400).json({ success: false, message: fileUploadResult.message });
        }


        newShop.logo = logo.name;
        newShop.coverPhoto = coverPhoto.name;

        // Kaydet

        await newShop.save();

        partnerCreate({ shopId: newShop._id });

        return res.status(201).json({ success: true, message: MessagesService.success.S201, shop: newShop });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

const deleteShop = async (req, res) => {
    try {
        const { shopId } = req.body;
        const shop = await Shop.findOne({ _id: shopId, isDeleted: false });

        if (!shop) {
            return res.status(404).json({ success: false, message: MessagesService.error.E404 });
        }

        shop.isDeleted = true;
        await shop.save();

        await addActivityToAdmin({ message: `Shop ${shopId} is deleted` });

        return res.status(200).json({ success: true, message: MessagesService.success.S200, shop });
    } catch (error) {
        console.error("Error deleting shop:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

const restoreShop = async (req, res) => {
    try {
        const { shopId } = req.body;
        const shop = await Shop.findOne({ _id: shopId, isDeleted: true });

        if (!shop) {
            return res.status(404).json({ success: false, message: MessagesService.error.E400 });
        }

        if (!shop.isDeleted) {
            return res.status(400).json({ success: false, message: MessagesService.error.E400 });
        }

        shop.isDeleted = false;
        await shop.save();

        // Aktivite kaydı ekleyelim
        await addActivityToAdmin({ message: `Shop ${shopId} has been restored` });

        return res.status(200).json({ success: true, message: MessagesService.success.S200 });
    } catch (error) {
        console.error("Error restoring shop:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find({ isDeleted: false });
        return res.status(200).json({ success: true, message: MessagesService.success.S200, shops });
    } catch (error) {
        console.error("Error restoring shop:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
}

const getAllShopsWithDeleted = async (req, res) => {
    try {
        const shops = await Shop.find({});
        return res.status(200).json({ success: true, message: MessagesService.success.S200, shops });
    } catch (error) {
        console.error("Error restoring shop:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
}

const editShop = async (req, res) => {
    try {
        const {
            name,
            shopId,
            address,
            settings,
            location,
            shortAddress,
            discountRate,
            operatingHours,
        } = req.body;

        const { logo, coverPhoto } = req.files || {};

        const validation = ValidatorService.validateShop({
            name,
            address,
            location,
            settings,
            shortAddress,
            discountRate,
            operatingHours,
        });

        if (!validation.isValid) {
            return res.status(400).json({ success: false, message: validation.message });
        }

        const existingShop = await Shop.findById(shopId);
        if (!existingShop) {
            return res.status(404).json({ success: false, message: "Shop not found." });
        }

        existingShop.name = name;
        existingShop.address = address;
        existingShop.shortAddress = shortAddress;
        existingShop.location = {
            type: "Point",
            coordinates: location.coordinates,
        };
        existingShop.settings = settings;
        existingShop.discountRate = discountRate;
        existingShop.operatingHours = operatingHours;

        if (logo) {
            let logoUploadResult = await FileUploadService.Upload({
                file: logo,
                uploadPath: logoPath,
                newName: existingShop._id.toString(),
            });

            if (!logoUploadResult.success) {
                return res.status(400).json({ success: false, message: logoUploadResult.message });
            }

            // Delete the old logo if it exists
            if (existingShop.logo) {
                FileControlService.Delete({ filePath: `${logoPath}/${existingShop.logo}` });
            }

            existingShop.logo = logo.name;
        }

        if (coverPhoto) {
            let coverPhotoUploadResult = await FileUploadService.Upload({
                file: coverPhoto,
                uploadPath: coverPhotoPath,
                newName: existingShop._id.toString(),
            });

            if (!coverPhotoUploadResult.success) {
                return res.status(400).json({ success: false, message: coverPhotoUploadResult.message });
            }

            // Delete the old cover photo if it exists
            if (existingShop.coverPhoto) {
                FileControlService.Delete({ filePath: `${coverPhotoPath}/${existingShop.coverPhoto}` });
            }

            existingShop.coverPhoto = coverPhoto.name;
        }

        // Save updated shop
        await existingShop.save();

        return res.status(200).json({ success: true, message: MessagesService.success.S200, shop: existingShop });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};


export default {
    editShop,
    deleteShop,
    restoreShop,
    getAllShops,
    createNewShop,
    getAllShopsWithDeleted,
};