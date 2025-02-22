// Packages
import mongoose from "mongoose";
// Config
import { config } from "./config.js";


const connectToMongoDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${config.development.db.username}:${config.development.db.password}@${config.development.db.host}/?retryWrites=true&w=majority&appName=${config.development.db.clusterName}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
};

export { connectToMongoDb };