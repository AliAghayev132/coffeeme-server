// Models
import Otp from "#models/Otp.js";
import User from "#models/User.js";
// Services
import { OtpService } from "#services/OtpService.js";
import { MailService } from "#services/MailService.js";
import { HashService } from "#services/HashService.js";
import { MessagesService } from "#services/MessagesService.js";
import { AuthTokenService } from "#services/AuthTokenService.js";
import { ValidatorService } from "#services/ValidatorService.js";
// Utils
import { addActivityToUser } from "#utils/user/addActivity.js";


// Creact Account
const createAccountStepOne = async (req, res) => {
    try {
        const { email, phoneNumber, type, password } = req.body;

        if (!password) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        } else if (!ValidatorService.validatePassword(password)) {
            return res.status(400).json({ messages: MessagesService.validation.V103, success: false });
        }

        if (!type) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }

        if (type === "email") {
            if (!ValidatorService.validateEmail(email)) {
                return res.status(400).json({ messages: MessagesService.validation.V101, success: false });
            }
        } else if (type === "phoneNumber") {
            if (!ValidatorService.validateAzerbaijanPhoneNumber(phoneNumber)) {
                return res.status(400).json({ messages: MessagesService.validation.V102, success: false });
            }
        } else {
            return res.status(400).json({ messages: MessagesService.error.E403, success: false });
        }


        const [existingUser, _] = await Promise.all([
            User.findOne({
                $or: [
                    { email: { $eq: email, $ne: null } },
                    { phoneNumber: { $eq: phoneNumber, $ne: null } }
                ]
            }),
            Otp.findOneAndDelete(
                {
                    $or: [
                        { email: { $eq: email, $ne: null } },
                        { phoneNumber: { $eq: phoneNumber, $ne: null } }
                    ]
                },
            )
        ]);

        const otp = await OtpService.generateUniqueOtp();

        if (existingUser) {
            return res.status(400).json({ messages: MessagesService.error.E402, success: false });
        }


        await Otp.create({
            otp,
            [type]: phoneNumber || email,
        });

        MailService.mailSender({
            email,
            body: `<h1>Please confirm your OTP</h1> <p>Here is your OTP code: ${otp}</p>`,
            title: "CoffeeMe Otp",
        })


        res.status(201).json({ messages: MessagesService.success.S201, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}
const createAccountStepTwo = async (req, res) => {
    try {
        const { emailOrPhone, otp } = req.body;

        if (!emailOrPhone) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }

        const isEmail = emailOrPhone.includes("@");


        const filter = {
            otp,
            [isEmail ? "email" : "phoneNumber"]: emailOrPhone,
        };



        const existingOtp = await Otp.findOneAndDelete(filter);

        if (!existingOtp) {
            return res.status(404).json({ messages: MessagesService.error.E405, success: false });
        }

        const payload = { emailOrPhone };

        const token = AuthTokenService.generateRegisterToken(payload);

        return res.status(200).json({ messages: MessagesService.success.S200, success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}
const createAccountStepThree = async (req, res) => {
    try {
        const { emailOrPhone } = req.user;
        const { birthDate, gender, password, firstName, secondName } = req.body;

        if (!emailOrPhone) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }

        const existingUser = await User.findOne({
            $or: [
                { email: { $eq: emailOrPhone, $ne: null } },
                { phoneNumber: { $eq: emailOrPhone, $ne: null } }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ messages: MessagesService.error.E402, success: false });
        }

        const validationResult = ValidatorService.validateRegister({
            birthDate, gender, password, firstName, secondName
        });

        if (!validationResult.isValid) {
            return res.status(400).json({ success: false, message: validationResult.message });
        }

        const isEmail = emailOrPhone.includes("@");

        await User.create({
            gender,
            firstName,
            birthDate,
            secondName,
            password: HashService.HashSync(password),
            [isEmail ? "email" : "phoneNumber"]: emailOrPhone,
        })

        return res.status(200).json({ messages: MessagesService.success.S201, success: true });
    } catch (error) {
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}

// Forgot Password
const forgotPassowrdStepOne = async (req, res) => {
    try {
        const { emailOrPhone } = req.body;

        if (!emailOrPhone) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }


        const [existingUser, _] = await Promise.all([
            User.findOne({
                $or: [
                    { email: { $eq: emailOrPhone, $ne: null } },
                    { phoneNumber: { $eq: emailOrPhone, $ne: null } }
                ]
            }),
            Otp.findOneAndDelete(
                {
                    $or: [
                        { email: { $eq: emailOrPhone, $ne: null } },
                        { phoneNumber: { $eq: emailOrPhone, $ne: null } }
                    ]
                },
            )
        ]);

        const isEmail = emailOrPhone.includes("@");

        if (!existingUser) {
            return res.status(400).json({ messages: MessagesService.error.E404, success: false });
        }

        const otp = await OtpService.generateUniqueOtp();


        await Otp.create({
            otp,
            [isEmail ? "email" : "phoneNumber"]: emailOrPhone,
        });

        console.log({ emailOrPhone });


        MailService.mailSender({
            email: emailOrPhone,
            body: `<h1>Please confirm your OTP</h1> <p>Here is your OTP code: ${otp}</p>`,
            title: "CoffeeMe Otp",
        })


        res.status(201).json({ messages: MessagesService.success.S201, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}
const forgotPassowrdStepThree = async (req, res) => {
    try {
        const { password } = req.body;
        const { emailOrPhone } = req.user;

        if (!emailOrPhone) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }

        const isEmail = emailOrPhone.includes("@");

        const existingUser = await User.findOne({
            $or: [
                { [isEmail ? "email" : "phoneNumber"]: { $eq: emailOrPhone, $ne: null } },
            ]
        });

        if (!existingUser) {
            return res.status(404).json({ messages: MessagesService.error.E406, success: false });
        }

        if (!ValidatorService.validatePassword(password)) {
            return res.status(400).json({ success: false, message: MessagesService.validation.V103 });
        }

        existingUser.password = HashService.HashSync(password);

        addActivityToUser({ user: existingUser, message: "Password changed" });

        await existingUser.save();

        addActivityToUser({ user, message: "User password changed" });

        return res.status(200).json({ messages: MessagesService.success.S200, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}

// Login
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;


        if (!emailOrPhone || !password) {
            return res.status(400).json({ messages: MessagesService.validation.V100, success: false });
        }

        const isEmail = emailOrPhone.includes("@");

        const user = await User.findOne({
            [isEmail ? "email" : "phoneNumber"]: emailOrPhone
        })


        if (!user) {
            return res.status(404).json({ messages: MessagesService.error.E404, success: false });
        }

        const id = user._id;

        const passwordMatch = await HashService.Compare(password, user.password);



        if (!passwordMatch) {
            return res.status(404).json({ messages: MessagesService.error.E407, success: false });
        }

        const accessToken = AuthTokenService.generateAccessToken({ id });
        const refreshToken = AuthTokenService.generateRefreshToken({ id });

        res.status(200).json({
            success: true,
            messages: MessagesService.success.S200,
            tokens: { accessToken, refreshToken },
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ messages: MessagesService.error.E500, success: false });
    }
}
// Refresh Token

const refreshAccessToken = async (req, res) => {
    try {
        const { id } = req.user;


        const accessToken = AuthTokenService.generateAccessToken({ id });


        return res.status(200).json({
            accessToken,
            success: true,
            messages: MessagesService.success.S200,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, messages: MessagesService.error.E500 });
    }
}




export default {
    login,
    refreshAccessToken,
    createAccountStepOne,
    createAccountStepTwo,
    createAccountStepThree,
    forgotPassowrdStepOne,
    forgotPassowrdStepThree,
};