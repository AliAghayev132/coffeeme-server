import { Schema, Model } from "#constants/variables.js";

const RecentCloseNotificationSchema = new Schema({
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

const PartnerSchema = new Schema({
    distance: { type: Number, default: 5 },
    email: { type: String },
    fullName: { type: String },
    username: {
        type: String,
        unique: true,
        default: () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    },
    password: { type: String },
    shop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    totalRevenue: { type: Number, default: 0 },
    phone: { type: String },
    role: { type: String, default: "partner" },
    shopPercentage: { type: Number, default: 25 },
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    balance: { type: Number, default: 0 },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    nearbyUsers: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            lastLocationUpdate: { type: Date, default: Date.now },
        },
    ],
    recentCloseNotifications: [RecentCloseNotificationSchema],
    notifications: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
    withdrawals: [{ type: Schema.Types.ObjectId, ref: "WithdrawPartner" }],
    customers: [
        {
            user: { type: Schema.Types.ObjectId, ref: "User" },
            visitCount: { type: Number, default: 0 },
        },
    ],
    dailyReports: [{ type: Schema.Types.ObjectId, ref: "DailyReport" }],
    timers: {
        csvExport: {
            attemptCount: { type: Number, default: 0 },
            lastAttemptDate: { type: Date, default: Date.now },
        },
    },
});

export default Model("Partner", PartnerSchema);
