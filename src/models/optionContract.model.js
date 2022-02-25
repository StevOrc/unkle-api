const mongoose = require("mongoose");

const optionContractSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
});

const OptionContract = mongoose.model("OptionContract", optionContractSchema);

module.exports = OptionContract;
