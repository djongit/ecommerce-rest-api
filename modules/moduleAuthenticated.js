const ensureAuthenticated = async (req, res, next) => {
    return req.isAuthenticated()? next() : res.status(401).json({ message: 'Unauthorized' });
};

module.exports = { ensureAuthenticated };