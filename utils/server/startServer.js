import { config } from "#config/config.js";

const startServer = (err) => {
    if (err) {
        console.error("❌ Failed to start the server:", err);
        process.exit(1);
    }

    console.log(`
      🚀 Server is running!             
      🌍 URL: http://localhost:${config.development.port}
    `);
};

export default startServer;
