// Variables
import { Schema, Model } from "#constants/variables.js";



const shopSchema = new Schema({
    onlineStatus: {
        isOnline: {
            type: Boolean,
            default: false,
        },
        lastSeenAt: {
            type: Date,
            default: null,
        }
    },
    logo: {
        type: String,
        default: null,
        required: false,
    },
    coverPhoto: {
        type: String,
        default: null,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    shortAddress: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            latitude: {
                type: Number,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            }
        },
    },
    products: [
        { type: Schema.Types.ObjectId, ref: "Product" }
    ],
    rating: {
        type: Number,
        required: false,
        default: 5,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    operatingHours: {
        open: {
            type: String,
            default: "10",
        },
        close: {
            type: String,
            default: "20",
        },
    },
    discountRate: {
        type: Number,
        required: true,
        default: 10,
    },
    settings: {
        machineLearning: {
            isWorking: {
                type: Boolean,
                default: true,
            },
            startingLimit: {
                type: Number,
                default: 30
            }
        }
    },
    totalSales: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
});

export default Model("Shop", shopSchema);



