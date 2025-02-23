import { Schema, Model } from "#constants/variables.js";

const subscriberSchema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

export default Model("Subscriber", subscriberSchema);