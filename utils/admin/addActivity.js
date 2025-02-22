import Admin from "#models/Admin.js";

const addActivityToAdmin = async ({ message }) => {
    const admin = await Admin.findOne({});
    admin.activities.push({ message });
    await admin.save();
}
export { addActivityToAdmin };