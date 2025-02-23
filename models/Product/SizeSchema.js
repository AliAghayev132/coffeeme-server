// Variables
import { Schema } from "#constants/variables.js"
// Enums
import { sizes } from "#constants/enums/common.js";


const SizeSchema = new Schema({
    label: {
        enum: sizes,
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountRate: {
        type: Number,
        required: true,
    },
    baseDiscountRate: {
        type: Number,
        required: true,
    }
})

export { SizeSchema };