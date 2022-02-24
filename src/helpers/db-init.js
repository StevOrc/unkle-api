const mongoose = require("mongoose");

const initDb = async () => {
  try {
    const url = process.env.MONGO_URI;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log("Error db connection...", error);
  }
};

module.exports = initDb;
