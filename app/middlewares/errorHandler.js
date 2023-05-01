function errorHandler(err, req, res, next) {
    res.status(err.status).json(err);
}

module.exports = errorHandler;