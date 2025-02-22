// Packages
import cors from "cors";
import http from "http";
import express from "express";
import fileUpload from "express-fileupload";

// Config
import { setupSwagger } from "#config/swagger.js";
import { connectToMongoDb } from "#config/configDb.js";
import { config, corsConfig } from "#config/config.js";

// Services
import { MessagesService } from "#services/MessagesService.js";

// Utils
import startServer from "#utils/server/startServer.js";
import { firstTimeStart } from "#utils/admin/firstTimeStart.js";

// Routers
import { UserRouter } from "#routes/userRoutes.js";
import { AdminRouter } from "#routes/adminRoutes.js";

// Variables
const app = express();



//Setup Methods
const setupDb = async () => connectToMongoDb();
const setupServer = () => http.createServer(app);
const setupSwaggerDocs = () => setupSwagger(app);
const setupServices = () => MessagesService.readMessagesFromJson();

const setupMiddleWares = () => {
    app.use(fileUpload());
    app.use(express.json());
    app.use(cors(corsConfig));
    app.use('/public', express.static('public'));
    app.use(express.urlencoded({ extended: true }));
}

const setupRoutes = () => {
    app.use("/api/user", UserRouter);
    app.use("/api/admin", AdminRouter);
}

const startApp = async () => {
    await setupDb();
    await firstTimeStart();
    setupMiddleWares();
    setupServices();
    setupRoutes();
    setupSwaggerDocs();
    const server = setupServer();

    server.listen(config.development.port, startServer);

};



startApp();