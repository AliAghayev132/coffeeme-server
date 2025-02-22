import fs from "fs";

class FileControlService {
    static Delete({ filePath }) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        } else {
            console.warn(`FileControlService: ${filePath} is not exists.`)
        }
    }
}

export {
    FileControlService
};