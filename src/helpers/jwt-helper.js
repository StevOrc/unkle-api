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
};
