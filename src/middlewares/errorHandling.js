module.exports = {
  errorHandling(err, req, res, next) {
    if (err) {
      const status = err.status || 500;
      return res.status(status).send({
        status,
        message: err.message,
      });
    }

    next();
  },
};
