// Enums
import { membershipLevels } from "#constants/enums/user.js";
// Models
import User from "#models/User.js";
// Services
import { HashService } from "#services/HashService.js";
import { MessagesService } from "#services/MessagesService.js";
// Utils
import { addActivityToAdmin } from "#utils/admin/addActivity.js";

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments({ isDeleted: false });

        const users = await User.find({ isDeleted: false }).select("isDeleted firstName secondName image email phoneNumber accountStatus birthDate gender balance membershipLevel").skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
            data: {
                users,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                totalUsers
            }
        });
    } catch (error) {
        res.status(500).json({ message: MessagesService.error.E500 });
    }
};
const getUsersWithDeleted = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalUsers = await User.countDocuments();

        const users = await User.find().select("isDeleted firstName secondName image email phoneNumber accountStatus birthDate gender balance membershipLevel").skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
            data: {
                users,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                totalUsers
            }
        });
    } catch (error) {
        res.status(500).json({ message: MessagesService.error.E500 });
    }
};
const restoreUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { isDeleted: false },
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or not deleted" });
        }

        addActivityToAdmin({ message: `User ${user._id} restored` });

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { isDeleted: true },
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or not deleted" });
        }

        addActivityToAdmin({ message: `User ${user._id} deleted` });

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};
const blockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { accountStatus: "blocked" },
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or not deleted" });
        }

        addActivityToAdmin({ message: `User ${user._id} blocked` });

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};
const unBlockUser = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const user = await User.findOneAndUpdate(
            { _id: userId },
            { accountStatus: "active" },
        );

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found or not deleted" });
        }

        addActivityToAdmin({ message: `User ${user._id} unblocked` });

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};
const createUser = async (req, res) => {
    try {
        const {
            email,
            gender,
            password,
            birthDate,
            firstName,
            secondName,
            phoneNumber,
            membershipLevel,
        } = req.body;

        if (!password || !membershipLevel || !birthDate || !firstName || !secondName || !gender) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided.",
            });
        }

        if (!email && !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: MessagesService.validation.V100,
            });
        }

        if (!membershipLevels.includes(membershipLevel)) { 
            return res.status(400).json({
                success: false,
                message: "Invalid Membership level.",
            });
        }

        if (email && !ValidationService.validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format.",
            });
        }

        if (phoneNumber && !ValidationService.validateAzerbaijanPhoneNumber(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Azerbaijan phone number format.",
            });
        }

        const validationResult = ValidationService.validateRegister({
            birthDate,
            gender,
            password,
            firstName,
            secondName,
        });

        if (!validationResult.isValid) {
            return res.status(400).json({
                success: false,
                message: validationResult.message,
            });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email or phone number is already in use.",
            });
        }

        const newUser = new User({
            email,
            gender,
            password: HashService.HashSync(password),
            birthDate,
            firstName,
            secondName,
            phoneNumber,
            membershipLevel,
        });

        await newUser.save();

        addActivityToAdmin({ message: `User ${newUser._id} created` });

        
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            userId: newUser._id,
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: "Internal Server Error." });
    }
};



export default {
    getUsers,
    blockUser,
    createUser,
    deleteUser,
    unBlockUser,
    restoreUser,
    getUsersWithDeleted
};