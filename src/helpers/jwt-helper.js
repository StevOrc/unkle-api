const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  /**
   * TOKEN CREATION, sign the token
   */
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      try {
        const payload = {
          sub: userId,
        };

        const options = {
          expiresIn: "1h",
          issuer: userId,
        };

        JWT.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
          if (err) {
            console.log(err.message);
            reject(createError.InternalServerError());
          }
          resolve(token);
        });
      } catch (error) {
        console.log(error);
      }
    });
  },
  /**
   * VERIFY TOKEN. It will be used as a middleware to protect routes
   */
  verifyAccessToken: (req, res, next) => {
    return new Promise((resolve, reject) => {
      const authHeader = req.headers["authorization"];
      if (!authHeader)
        return next(createError.Unauthorized("No bearer token provided"));
      const bearerToken = authHeader.split(" ");
      const token = bearerToken[1];
      JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
          return err.name === "JsonWebTokenError"
            ? next(createError.Unauthorized())
            : next(createError.Unauthorized(err.message));
        }
        req.payload = payload;
        next();
      });
    });
  },
};
