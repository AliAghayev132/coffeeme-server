// Variables
import { Schema } from "#constants/variables.js";

const RecentCloseNotificationSchema = new Schema({
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default RecentCloseNotificationSchema;