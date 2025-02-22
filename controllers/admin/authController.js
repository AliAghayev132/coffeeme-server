// Models
import Admin from "#models/Admin.js";
// Services
import { HashService } from "#services/HashService.js";
import { MessagesService } from "#services/MessagesService.js";
import { AuthTokenService } from "#services/AuthTokenService.js";
// Utils
import { addActivityToAdmin } from "#utils/admin/addActivity.js";


// Refresh Token
const refreshAccessToken = async (req, res) => {
    try {
        const { id } = req.user;
        const accessToken = AuthTokenService.generateAdminAccessToken({ id });

        return res.status(200).json({
            accessToken,
            success: true,
            messages: MessagesService.success.S200,
        });

    } catch (error) {
        return res.status(500).json({ success: false, messages: MessagesService.error.E500 });
    }
}

// Login
const login = async (req, res) => {
    try {
        const { password, username } = req.body;


        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: MessagesService.error.E404, success: false })
        }

        const passwordMatch = await HashService.Compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: MessagesService.error.E404, success: false });
        }

        const id = admin._id;

        const accessToken = AuthTokenService.generateAdminAccessToken({ id });
        const refreshToken = AuthTokenService.generateAdminRefreshToken({ id });


        res.status(200).json({
            success: true,
            messages: MessagesService.success.S200,
            tokens: { accessToken, refreshToken },
        });

    } catch (error) {
        res.status(500).json({ message: MessagesService.error.E500 });
    }
}

// Change Password
const changePassword = async (req, res) => {
    try {
        const { id } = req.user;
        const admin = await Admin.findById(id);

        const { newPassword, oldPassword } = req.body;
        console.log({ newPassword, oldPassword });


        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: MessagesService.validation.V100 });
        }

        const isMatch = await HashService.Compare(oldPassword, admin.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: MessagesService.error.E400 });
        }

        const hashedPassword = HashService.HashSync(newPassword);
        admin.password = hashedPassword;
        addActivityToAdmin({ message: "Admin password changed" });

        await admin.save();
        return res.status(200).json({ success: true, message: MessagesService.success.S200 });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
}



export default { login, changePassword, refreshAccessToken };
