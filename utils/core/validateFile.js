/**
 * @module validateFile
 * @description Yüklenen dosyanın tipini ve boyutunu kontrol eder.
 */

/**
 * Dosya yükleme doğrulaması yapar.
 * 
 * @function validateFile
 * @param {Object} file - Yüklenen dosya nesnesi (req.files.file gibi).
 * @param {Array<string>} [allowedTypes=["image/jpeg", "image/png", "image/webp"]] - İzin verilen MIME tipleri.
 * @param {number} [maxSize=2 * 1024 * 1024] - Maksimum dosya boyutu (byte cinsinden, varsayılan 2MB).
 * @returns {Object} - Geçerlilik durumu (`isValid: true/false`) ve hata mesajı (`message`).
 * 
 * @example
 * import { validateFile } from "./utils/validateFile";
 * 
 * const file = req.files.file;
 * const validation = validateFile(file);
 * if (!validation.isValid) {
 *     return res.status(400).json({ success: false, message: validation.message });
 * }
 */

const validateFile = (
    file,
    allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
    maxSize = 2 * 1024 * 1024
) => {
    if (!file) return { isValid: false, message: "Dosya yüklenmedi!" };

    // Ensure mimeType exists
    if (!file.mimetype || !allowedTypes.includes(file.mimetype)) {
        return { isValid: false, message: `Geçersiz dosya formatı! İzin verilen türler: ${allowedTypes.join(", ")}` };
    }

    // Ensure size exists
    if (!file.size || file.size > maxSize) {
        return { isValid: false, message: `Dosya boyutu ${maxSize / (1024 * 1024)}MB'yi geçemez!` };
    }

    return { isValid: true };
};

export { validateFile };