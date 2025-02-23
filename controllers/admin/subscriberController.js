// Models
import Subscriber from "#models/Subscriber.js";
// Services
import { MessagesService } from "#services/MessagesService.js";

const getSubscribers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalSubscribers = await Subscriber.countDocuments();

        const subscribers = await Subscriber.find().skip(skip).limit(limit);

        res.status(200).json({
            success: true,
            message: MessagesService.success.S200,
            data: {
                subscribers,
                totalPages: Math.ceil(totalSubscribers / limit),
                currentPage: page,
                totalSubscribers
            }
        });
    } catch (error) {
        res.status(500).json({ message: MessagesService.error.E500 });
    }
};

export default { getSubscribers };