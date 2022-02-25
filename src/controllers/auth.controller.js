const User = require("../models/user.model");
const createError = require("http-errors");
const { authSchema } = require("../helpers/validate.schema");
const { signAccessToken } = require("../helpers/jwt-helper");

module.exports = {
  // REGISTER
  async register(req, res, next) {
    try {
      if (!req.body.email || !req.body.password)
        throw createError.BadRequest("Email or password is missing");

      const result = await authSchema.validateAsync(req.body);
      const isExist = await User.findOne({ email: result.email });
      if (isExist) {
        throw createError.Conflict(
          `${result.email} is already been registered`
        );
      }
      const user = new User(result);
      const userSaved = await user.save();
      const accessToken = await signAccessToken(`${userSaved._id}`);
      res.send({
        message: "User registered with success",
        accessToken,
      });
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },

  // Signin with {email / password}
  async signin(req, res, next) {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user)
        throw createError.NotFound(
          `User not found with the given email : ${result.email}`
        );

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch)
        throw createError.Unauthorized("Username/password not valid");

      const accessToken = await signAccessToken(`${user._id}`);
      res.status(200).send({ jwtToken: accessToken });
    } catch (error) {
      console.log("error login ", error);
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
};
