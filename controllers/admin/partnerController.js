//// Models
import Partner from "#models/Partner.js";
import PartnerAccount from "#models/Partner/PartnerAccount.js";

// Services
import { MessagesService } from "#services/MessagesService.js";
import { ValidatorService } from "#services/ValidatorService.js";

// Utils
import { addActivityToAdmin } from "#utils/admin/addActivity.js";


const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find()
            .populate({
                path: 'accounts',
                select: '-password', // Exclude password from being populated
            })
            .populate({
                path: 'shop',
                select: 'name shortAddress' // Select only 'name' and 'shortAddress' from 'shop'
            });

        return res.status(200).json({ partners, success: true, message: MessagesService.success.S200 });
    } catch (error) {
        console.error("Error restoring shop:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
}


const addPartnerAccount = async (req, res) => {
    try {
        const { partnerId, partnerAccount } = req.body;

        const { isValid, message } = await ValidatorService.validatePartnerAccountData(partnerAccount);

        if (!isValid) {
            return res.status(400).json({ success: false, message });
        }

        const partner = await Partner.findById(partnerId);

        if (!partner) {
            return res.status(400).json({ success: false, message: MessagesService.error.E408 });
        }

        const newPartnerAccount = await PartnerAccount.create({
            ...partnerAccount,
            partner: partnerId,
        });

        partner.accounts.push(newPartnerAccount._id);
        await partner.save();

        addActivityToAdmin({
            message: `Partner ${partnerId} added new account,`
        });

        return res.status(200).json({ success: true, message: MessagesService.success.S200 });
    } catch (error) {
        console.error("Error adding partner account:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

// Delete Partner Account
const deletePartnerAccount = async (req, res) => {
    try {
        const { partnerId, accountId } = req.body;

        if (!partnerId || !accountId) { 
            return res.status(400).json({ success: false, message: MessagesService.validation.V100 });
        }

        const partner = await Partner.findById(partnerId);

        if (!partner) {
            return res.status(200).json({ success: true, message: MessagesService.error.E408 });
        }

        // Remove the account from the partner's accounts array
        partner.accounts = partner.accounts.filter(account => account.toString() !== accountId);

        // Delete the partner account itself
        await PartnerAccount.findByIdAndDelete(accountId);

        await partner.save();

        addActivityToAdmin({
            message: `
                Partner ${partnerId} deleted account with ID ${accountId}.
            `
        });

        return res.status(200).json({ success: true, message: MessagesService.success.S200 });
    } catch (error) {
        console.error("Error deleting partner account:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

// Edit Partner Account
const editPartnerAccount = async (req, res) => {
    try {
        const { partnerAccount, partnerId, accountId } = req.body;

        const partner = await Partner.findById(partnerId);

        if (!partner) {
            return res.status(200).json({ success: true, message: MessagesService.error.E408 });
        }

        const existPartnerAccount = await PartnerAccount.findById(accountId);

        if (!existPartnerAccount) {
            return res.status(200).json({ success: true, message: MessagesService.error.E409 });
        }

        // Update the partner account with new data
        Object.assign(existPartnerAccount, partnerAccount);
        await partnerAccount.save();

        addActivityToAdmin({
            message: `
                Partner ${partnerId} updated account with ID ${accountId}.
            `
        });

        return res.status(200).json({ success: true, message: MessagesService.success.S200 });
    } catch (error) {
        console.error("Error editing partner account:", error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};

export default {
    getAllPartners,
    addPartnerAccount,
    deletePartnerAccount,
    editPartnerAccount
};