// Packages
import bcrypt from "bcrypt"

class HashService {
    /**
     * Datanı sinxron olaraq hashleyir.
     * @param {string} data - Hashlenecek veri.
     * @returns {string} - Hashlenmiş string.
     */
    
    static HashSync(data) {
        return bcrypt.hashSync(data, 12);
    }


    /**
     * Hashlenmiş datanı müqaiyesi edir.
     * @param {string} data - Kullanıcının girdiği veri.
     * @param {string} encryptedData - Hashlenmiş veri.
     * @returns {Promise<boolean>} - Eşleşirse `true`, aksi halde `false` döner.
     */
    static async Compare(data, encryptedData) {
        return await bcrypt.compare(data, encryptedData);
    }
}

export { HashService };