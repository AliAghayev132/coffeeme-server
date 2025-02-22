// Models
import User from "#models/User.js";
// Utils
import { addActivityToUser } from "#utils/user/addActivity.js";
// Services
import { HashService } from "#services/HashService.js";
import { MessagesService } from "#services/MessagesService.js";
import { ValidatorService } from "#services/ValidatorService.js";
import { FileUploadService } from "#services/FileUploadService.js";
import { FileControlService } from "#services/FileControlService.js";
// Variables
import { profilePhotoPath } from "#constants/paths.js";


const getUserMe = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).select("firstName secondName birthDate email phoneNumber membershipLevel balance recentSearches favoriteItems")

        return res.status(200).json({
            user,
            success: true,
            messages: MessagesService.success.S200,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, messages: MessagesService.error.E500 });
    }
}

const changePassword = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id);

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(404).json({ messages: MessagesService.validation.V100, success: false });
        }

        if (oldPassword == newPassword) {
            return res.status(400).json({ messages: MessagesService.validation.V104, success: false });
        }


        const passwordMatch = await HashService.Compare(oldPassword, user.password);

        if (!passwordMatch) {
            return res.status(404).json({ messages: MessagesService.error.E407, success: false });
        }

        if (!ValidatorService.validatePassword(newPassword)) {
            return res.status(404).json({ messages: MessagesService.validation.V103, success: false });
        }

        const hashedNewPassword = HashService.HashSync(newPassword);

        user.password = hashedNewPassword;

        await user.save();

        addActivityToUser({ user, message: "User password changed" });

        return res.status(200).json({
            success: true,
            messages: MessagesService.success.S200,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, messages: MessagesService.error.E500 });
    }
}

const uploadProfilePhoto = async (req, res) => {
    try {
        const { id } = req.user;
        const uploadedFile = req.files?.file;

        if (!uploadedFile) {
            return res.status(404).json({ success: false, message: MessagesService.error.E411 });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        const fileUploadResult = await FileUploadService.Upload({
            uploadPath: profilePhotoPath,
            newName: user._id.toString(),
            file: uploadedFile,
        });


        if (!fileUploadResult.success) {
            return res.status(400).json({ success: false, message: fileUploadResult.message });
        }

        if (user.image) {
            FileControlService.Delete({ filePath: `${profilePhotoPath}/${user.image}` });
        }

        user.image = uploadedFile.name;  // Assuming the 'image' field stores the filename

        await user.save();

        // Log the activity
        addActivityToUser({ user, message: "Profile photo changed" });

        return res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: MessagesService.error.E500 });
    }
};


export default { getUserMe, changePassword, uploadProfilePhoto };