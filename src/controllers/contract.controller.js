const createError = require("http-errors");
const { contractSchema } = require("../helpers/validate.schema");
const { isValidDate, isDateAfter } = require("../helpers/date-validation");
const User = require("../models/user.model");
const Contract = require("../models/contract.model");

module.exports = {
  /**
   * @GET all contracts
   */
  async getAllContracts(req, res, next) {
    res.status(200).send({ message: "GET ALL CONTRCAT" });
  },

  /**
   * @POST new contract
   */
  async createContract(req, res, next) {
    try {
      const result = await contractSchema.validateAsync(req.body);
      if (!isValidDate(result.startDate))
        throw createError.BadRequest(
          `startDate - ${result.startDate} is an invalid date`
        );
      // If endDate is provided, we check if is a valid date
      if (result.endDate) {
        if (!isValidDate(result.endDate))
          throw createError.BadRequest(
            `endDate - ${result.endDate} is an invalid date`
          );

        if (!isDateAfter(result.startDate, result.endDate))
          throw createError.BadRequest(`endDate must be after the startDate`);
        result.status = "active";
      }
      const newContract = Contract({
        ...result,
        contractNumber:
          result.contractNumber || Math.floor(Math.random() * 100),
      });
      const savedContract = await newContract.save();
      res.status(200).send({ newContract });
    } catch (error) {
      console.log("ERROR ");
      next(error);
    }
  },
};
