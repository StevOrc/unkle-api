require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const initDb = require("./helpers/db-init");
const authRouter = require("./routes/auth.routes");
const { errorHandling } = require("./middlewares/errorHandling");
const createError = require("http-errors");

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

// Routes configuration
app.use("/api/v1/auth", authRouter);

// Not found Route
app.use("/", () => {
  throw createError.NotFound("Route not found...");
});

// Error handling middleware
app.use(errorHandling);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
