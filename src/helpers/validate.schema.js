const Joi = require("joi");

module.exports = {
  // Auth schema
  authSchema: Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "client"),
    contracts: Joi.array(),
  }),

  // Contract schema
  contractSchema: Joi.object({
    startDate: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .message("startDate must be in format yyyy-mm-dd")
      .required(),
    endDate: Joi.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .message("endDate must be in format yyyy-mm-dd"),
    options: Joi.array().min(1).required(),
    users: Joi.array().min(1).required(),
    contractNumber: Joi.number(),
  }),
};
