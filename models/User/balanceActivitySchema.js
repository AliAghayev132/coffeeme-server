// Variables
import { Schema } from "#constants/variables.js";

const BalanceActivitySchema = new Schema({
    category: {
        type: String,
        enum: ["refund", "topUp", "refer", "order", "gift", "coupon"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
});

export default BalanceActivitySchema;