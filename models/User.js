// Enums
import { accountStatus, gender, membershipLevel } from "#constants/enums/user.js";
// Variables
import { Schema, Model } from "#constants/variables.js";
// Schemas
import balanceActivitySchema from "./User/BalanceActivitySchema.js";


const userSchema = new Schema(
    {
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
        firstName: {
            type: String,
            default: null,
            required: true
        },
        secondName: {
            type: String,
            default: null,
            required: true
        },
        image: {
            type: String,
            default: null
        },
        email: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
        },
        phoneNumber: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
        },
        password: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: gender,
            required: true
        },
        membershipLevel: {
            type: String,
            enum: membershipLevel,
            default: membershipLevel[0],
        },
        balance: {
            type: Number,
            default: 1000
        },
        loyaltyPoints: {
            type: Number,
            default: 0
        },
        favoriteItems: {
            shops: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
            products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
        },
        followedShops: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
        actualOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        streakDetails: {
            streakCount: { type: Number, default: 0 },
            lastOrderDate: { type: Date, default: Date.now() },
        },
        fingerTips: {
            coffees: { type: [String], default: [] },
            desserts: { type: [String], default: [] },
            coffeeShops: { type: [String], default: [] },
        },
        recentSearches: {
            shops: [
                { item: { type: Schema.Types.ObjectId, ref: "Shop", required: true } },
            ],
            products: [
                { item: { type: Schema.Types.ObjectId, ref: "Product", required: true } },
            ],
        },
        lastLocationUpdate: {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            location: {
                latitude: { type: Number },
                longitude: { type: Number },
            },
        },
        additionalDetails: {
            topVisitedShop: { type: Schema.Types.ObjectId, ref: "Shop" },
            mostOrderedProducts: [
                { type: Schema.Types.ObjectId, ref: "Product" },
            ],
            overallRating: {
                averageRating: {
                    type: Number,
                    default: 0,
                },
                reviewCount: {
                    type: Number,
                    default: 0,
                },
            },
            referralCode: { type: String },
            referredBy: {
                type: Schema.Types.ObjectId,
                ref: "User",
                default: null,
            },
            visitedShops: [
                {
                    visitCount: { type: Number, default: 1 },
                    shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
                },
            ],
            orderedProducts: [
                {
                    quantity: { type: Number, default: 1 },
                    productId: { type: Schema.Types.ObjectId, ref: "Product" },
                },
            ],
        },
        notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
        balanceActivities: [balanceActivitySchema],
        accountStatus: {
            status: {
                type: String,
                enum: accountStatus,
                default: accountStatus[0],
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
        activities: [
            {
                _id: false,
                message: {
                    type: String,
                    required: true,
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },

    { versionKey: false }
);

userSchema.index({ "additionalDetails.referralCode": 1 }, { unique: true });

export default Model("User", userSchema);
