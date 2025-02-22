import path from "path";

/**
 * Dosya adını yeni bir isimle yeniden adlandırır.
 * 
 * @function handleFileName
 * @param {Object} file - Yüklenen dosya nesnesi (req.files.file gibi).
 * @param {string} newName - Yeni dosya ismi (genellikle kullanıcının ID'si vb).
 * @returns {string} - Yeni dosya adı.
 * 
 * @example
 * const newFileName = handleFileName({ file: req.files.file, newName: user._id });
 */
const handleFileName = ({ file, newName }) => {
    if (!newName) throw new Error("Yeni dosya adı geçerli değil.");

    const fileExtension = path.extname(file.name);
    return `${newName}_${Date.now()}${fileExtension}`;
};

export { handleFileName };