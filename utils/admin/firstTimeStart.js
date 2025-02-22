

// Models
import Admin from "#models/Admin.js";
import { HashService } from "#services/HashService.js";


const checkAdmin = async () => {
    try {
        const existAdmin = await Admin.findOne();

        if (existAdmin) {
            console.log("Admin account already exists");
            return;
        }

        const newAdmin = new Admin({
            username: "adminCoffeeMe",
            password: HashService.HashSync('adminpassword'),
            activities: [
                {
                    message: "Admin account created for first time",
                }
            ]
        })

        await newAdmin.save();
        console.log("New Admin account created");
    } catch (error) {
        console.log("ERROR:firstTimeStart file:Check Admin Method", error);
    }
};


const firstTimeStart = async () => {
    await checkAdmin();
};

export { firstTimeStart };