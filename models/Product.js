// Variables
import { Schema, Model } from "#constants/variables.js";
// Schemas
import { SizeSchema } from "./Product/SizeSchema.js";
import { AdditionSchema } from "./Product/AdditionSchema.js";
// Enums
import { servingTypes } from "#constants/enums/common.js";


const productSchema = new Schema({
    image: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    rating: {
        min: 0,
        max: 5,
        default: 5,
        type: Number,
    },
    reviewCount: {
        default: 0,
        type: Number,
    },
    totalSales: {
        default: 0,
        type: Number,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    additionalOptions: [
        {
            _id: false,
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: false,
            },
            options: [AdditionSchema],
        }
    ],
    shop: {
        ref: "Shop",
        required: true,
        type: Schema.Types.ObjectId
    },
    servingType: {
        type: String,
        required: true,
        enum: servingTypes
    },
    sizes: [SizeSchema],
}, { timestamps: true });

export default Model("Product", productSchema);