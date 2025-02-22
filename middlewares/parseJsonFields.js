const parseJsonFields = (req, res, next) => {
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            try {
                req.body[key] = JSON.parse(req.body[key]);
            } catch (e) {
                // JSON.parse başarısız olursa, hiçbir şey yapma
                continue;
            }
        }
    }
    next();
};

export { parseJsonFields };