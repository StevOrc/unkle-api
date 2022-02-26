const createError = require("http-errors");
const {
  contractSchema,
  contractResiliationSchema,
} = require("../helpers/validate.schema");
const {
  isValidDate,
  isDateAfter,
  isDateNow,
} = require("../helpers/date-validation");
const User = require("../models/user.model");
const Contract = require("../models/contract.model");
const { format } = require("date-fns");

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
      savedContract.users.forEach(async (el) => {
        const user = await User.findById(el);
        if (user) {
          user.contracts.push(savedContract._id);
          await user.save();
        }
      });
      res.status(200).send({ newContract: savedContract });
    } catch (error) {
      console.log("error creete contract ", error);
      next(error);
    }
  },
  /**
   * @UPDATE contract
   * Will update the contract, it's endDate and status properties
   * The User collection will also be modified, user will no longer have a reference to the id of the contract
   */
  async updateContract(req, res, next) {
    try {
      const result = await contractResiliationSchema.validateAsync(req.body);
      const { isContract: id, endDate } = result;
      if (!id) throw createError.BadRequest(`No id provided`);
      const contract = await Contract.findById(id);
      if (!contract)
        throw createError.BadRequest(
          `Contract not found with the given id : ${id}`
        );

      // If endDate is provided, we check if is a valid date
      if (!isValidDate(endDate))
        throw createError.BadRequest(`endDate - ${endDate} is invalid`);

      if (
        !isDateAfter(format(contract.startDate, "yyyy-MM-dd"), result.endDate)
      )
        throw createError.BadRequest(`endDate must be after the startDate`);

      //  Update the status of the contract depends on the endDate
      const resultDateNow = isDateNow(endDate);
      if (resultDateNow) contract.status = "finished";
      else contract.status = "active";

      // update the endDate property of the contract
      contract.endDate = result.endDate;

      contract.users.forEach(async (el) => {
        const user = await User.findById(el);
        if (user) {
          user.contracts.splice(user.contracts.indexOf(id), 1);
          await user.save();
        }
      });
      contract.users = [];
      await contract.save();
      res.status(200).send({ message: "with success" });
    } catch (error) {
      console.log("error delete contract ", error);
      next(error);
    }
  },

  // TEST PURPOSE DELETE ALL CONTRACS
  // async deleteAll(req, res, next) {
  //   try {
  //     await Contract.deleteMany({});
  //     res.status(200).send({ message: "Sucess delete ALL contracts" });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
