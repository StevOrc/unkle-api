const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "active", "finished"],
    default: "pending",
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
  },
  options: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Option", required: true },
  ],
  users: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
