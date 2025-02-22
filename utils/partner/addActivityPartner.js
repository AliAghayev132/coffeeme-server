// Models
import Partner from "#models/Partner";

const addActivityToAdmin = async ({ partnetId, message }) => {
    const partner = await Partner.findById(partnetId);
    partner.activities.push({ message });
    await partner.save();
}
export { addActivityToAdmin };