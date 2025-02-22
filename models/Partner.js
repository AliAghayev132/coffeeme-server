// Enums
import { roles } from "#constants/enums/partner.js";
// Variables
import { Schema, Model } from "#constants/variables.js";
// Schemas
import RecentCloseNotificationSchema from "./User/BalanceActivitySchema.js";


const PartnerSchema = new Schema({
    shop: {
        ref: "Shop",
        required: true,
        type: Schema.Types.ObjectId,
    },
    totalRevenue: {
        default: 0,
        type: Number,
    },
    phone: {
        unique: true,
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    distance: {
        default: 5,
        type: Number,
    },
    balance: {
        default: 0,
        type: Number,
    },
    accounts: [
        {
            ref: "PartnerAccount",
            type: Schema.Types.ObjectId,
        }
    ],
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






    // TODO: Bunları əlavə et sonra





    // actualOrders: [
    //     {
    //         ref: "Order",
    //         type: Schema.Types.ObjectId,
    //     }
    // ],
    // orderHistory: [
    //     {
    //         ref: "Order",
    //         type: Schema.Types.ObjectId,
    //     }
    // ],

    // followers: [
    //     {
    //         ref: "User",
    //         type: Schema.Types.ObjectId,
    //     }
    // ],
    // nearbyUsers: [
    //     {
    //         user: { type: Schema.Types.ObjectId, ref: "User" },
    //         lastLocationUpdate: { type: Date, default: Date.now },
    //     },
    // ],
    // recentCloseNotifications: [RecentCloseNotificationSchema],
    // notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    // withdrawals: [{ type: Schema.Types.ObjectId, ref: "WithdrawPartner" }],
    // customers: [
    //     {
    //         user: { type: Schema.Types.ObjectId, ref: "User" },
    //         visitCount: { type: Number, default: 0 },
    //     },
    // ],
    // dailyReports: [{ type: Schema.Types.ObjectId, ref: "DailyReport" }],
    // timers: {
    //     csvExport: {
    //         attemptCount: { type: Number, default: 0 },
    //         lastAttemptDate: { type: Date, default: Date.now },
    //     },
    // },
});

export default Model("Partner", PartnerSchema);
