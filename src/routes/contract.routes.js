const express = require("express");
const contractController = require("../controllers/contract.controller");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = express.Router();

// GET ALL only admin
router.get("/", [
  verifyAccessToken,
  isAdmin,
  contractController.getAllContracts,
]);

// GET ALL of given user
router.get("/user-contract", [
  verifyAccessToken,
  contractController.getAllContractsByUser,
]);

// POST contract
router.post("/", [
  verifyAccessToken,
  isAdmin,
  contractController.createContract,
]);

// UPDATE contract
router.patch("/", [verifyAccessToken, contractController.updateContract]);

// DELETE contract
router.delete("/", [contractController.deleteAll]);

module.exports = router;
