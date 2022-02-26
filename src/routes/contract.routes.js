const express = require("express");
const contractController = require("../controllers/contract.controller");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyAccessToken } = require("../middlewares/verifyToken");

const router = express.Router();

// GET ALL
router.get("/", [
  verifyAccessToken,
  isAdmin,
  contractController.getAllContracts,
]);

// POST contract
router.post("/", [
  verifyAccessToken,
  isAdmin,
  contractController.createContract,
]);

// UPDATE contract
router.patch("/", [verifyAccessToken, contractController.updateContract]);

// UPDATE contract
router.patch("/date", [contractController.testDate]);

// DELETE contract
router.delete("/", [contractController.deleteAll]);

module.exports = router;
