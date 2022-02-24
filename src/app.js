require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const initDb = require("./helpers/db-init");

// mongodb connection
initDb();

// Instance of express
const app = express();

// Basic config of an express APP
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/api/v1/greed", (req, res) => {
  res.status(200).send({ message: "Welcome to the app" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
