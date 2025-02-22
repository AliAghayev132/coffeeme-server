// Models
import Otp from "#models/Otp.js";
// Packages
import otpGenerator from "otp-generator";

class OtpService {
    static async generateUniqueOtp() {
        let otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        while (await Otp.findOne({ otp })) {
            otp = otpGenerator.generate(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
        }
        return otp;
    }
}

export { OtpService };