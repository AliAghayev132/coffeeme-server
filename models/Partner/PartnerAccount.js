// Enums
import { roles } from "#constants/enums/partner.js";
// Variables
import { Schema, Model } from "#constants/variables.js";


export const PartnerAccountSchema = new Schema({
    fullName: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        default: () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    },
    password: {
        type: String,
        default: () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    },
    role: {
        enum: roles,
        type: String,
        default: "seller",
    },
    partner: {
        ref: "Partner",
        required: true,
        type: Schema.Types.ObjectId,
    }
});

export default Model("PartnerAccount", PartnerAccountSchema);