// Packages
import fs from "fs";
import path from "path";

class MessagesService {
    static error = {};
    static success = {};
    static validation = {};

    static readMessagesFromJson() {
        const messagesPath = path.resolve('messages.json');
        try {
            const data = fs.readFileSync(messagesPath, 'utf-8');
            const messages = JSON.parse(data);
            this.error = messages.error;
            this.success = messages.success;
            this.validation = messages.validation;
        } catch (error) {
            console.error("Error reading or parsing messages.json:", error);
        }
    }
}

export { MessagesService };