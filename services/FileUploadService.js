import fs from "fs";
import { MessagesService } from "#services/MessagesService.js";
import { validateFile } from "#utils/core/validateFile.js";
import { handleFileName } from "#utils/core/handleFileName.js";

class FileUploadService {
    /**
     * Dosyayı yükler, doğrular ve yeniden adlandırır.
     * 
     * @function Upload
     * @param {Object} params - Yükleme parametreleri.
     * @param {Object} params.file - Yüklenen dosya nesnesi.
     * @param {string} params.uploadPath - Dosyanın yükleneceği dizin.
     * @param {string} params.newName - Yeni dosya adı.
     * @returns {Object} - Başarı durumu ve mesaj.
     */
    static async Upload({ file, uploadPath, newName }) {
        try {
            // Validate the file
            if (!file) {
                throw new Error(MessagesService.error.E411); // Dosya eksik
            }

            const fileValidation = validateFile(file);
            if (!fileValidation.isValid) {
                throw new Error(fileValidation.message); // Geçersiz dosya
            }

            // Handle file renaming
            file.name = handleFileName({ file, newName });


            // Check and create the upload directory if needed
            
            
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }



            // Move the file to the specified path

            await file.mv(`${uploadPath}/${file.name}`);

            return { success: true, message: "Dosya başarıyla yüklendi." };
        } catch (error) {
            return { success: false, message: error.message || Messages.error.E500 };
        }
    }
}

export { FileUploadService };