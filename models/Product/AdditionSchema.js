// Variables
import { Schema } from "#constants/variables.js"

const AdditionSchema = new Schema({
    title: {
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

export { AdditionSchema };