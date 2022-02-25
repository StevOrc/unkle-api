const User = require("../models/user.model");
const createError = require("http-errors");

module.exports = {
  async isAdmin(req, res, next) {
    const { sub } = req.payload;
    if (!sub)
      return next(createError.BadRequest("No id provided in the request..."));
    const user = await User.findById(sub);
    if (!user)
      return next(
        createError.BadRequest("User not found with the given ID...")
      );
    if (user.role !== "admin")
      return next(
        createError.Unauthorized(
          "Only admin users are authorized for this ressource"
        )
      );

    next();
  },
};
