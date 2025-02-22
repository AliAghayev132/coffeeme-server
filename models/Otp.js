// Variables
import { Schema, Model } from "#constants/variables.js";

const otpSchema = new Schema({
    email: {
        type: String,
        index: true,
        unique: true,
        default: null,
        sparse: true,
    },
    phoneNumber: {
        type: String,
        index: true,
        unique: true,
        sparse: true,
        default: null,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "2m",
    },
});

export default Model('Otp', otpSchema);    