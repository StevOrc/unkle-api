require("dotenv").config();
const bcrypt = require("bcrypt");
const {
  optionsContract: optionsContractData,
  users: usersData,
} = require("./data/data");
const OptionsContrat = require("./models/optionContract.model");
const User = require("./models/user.model");
const Contract = require("./models/contract.model");
const connectDb = require("./helpers/db-init");

connectDb();

const importData = async () => {
  try {
    await OptionsContrat.deleteMany({});
    await OptionsContrat.insertMany(optionsContractData);
    await Contract.deleteMany({});
    await User.deleteMany({});
    const dataToSave = await Promise.all(
      usersData.map(async (el) => {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(el.password, salt);
        el.password = hashPassword;
        return el;
      })
    );
    await User.insertMany(dataToSave);
    console.log("Data Imported and save with Success");
    process.exit();
  } catch (error) {
    console.log("Error with data import");
    process.exit(1);
  }
};

importData();
