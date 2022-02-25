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

// POST contrac
router.post("/", [
  verifyAccessToken,
  isAdmin,
  contractController.createContract,
]);

module.exports = router;
