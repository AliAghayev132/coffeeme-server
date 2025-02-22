import { Schema, Model } from "#constants/variables.js";

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
});

const Admin = Model("Admin", adminSchema);
export default Admin;
