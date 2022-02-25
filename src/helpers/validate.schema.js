const Joi = require("joi");

module.exports = {
  authSchema: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "client"),
    contracts: Joi.array(),
  }),
};
