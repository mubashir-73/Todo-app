const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT;

connectDb();
app.use(cors());
app.use(express.json());
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
