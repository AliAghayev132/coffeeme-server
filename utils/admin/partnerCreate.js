// Models
import Partner from "#models/Partner.js";
import PartnerAccount from "#models/Partner/PartnerAccount.js";
// Utils
import { addActivityToAdmin } from "./addActivity.js";


const partnerCreate = async ({ shopId }) => {
    try {
        const partner = await Partner.create({
            shop: shopId,
            activities: [
                {
                    date: Date.now(),
                    message: "Partner created",
                }
            ]
        });

        // Create the admin account for the new partner
        const newAccount = await PartnerAccount.create({
            fullName: "Admin",
            partner: partner._id,
            role: "admin",
        });

        partner.accounts.push(newAccount._id);
        await partner.save();

        addActivityToAdmin({ message: `New Partner created for ${shopId} as admin` });

        console.log("Partner and admin account created successfully");

    } catch (error) {
        console.log("Error creating partner or admin account:", error);
    }
};


export { partnerCreate };