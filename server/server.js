const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT;

connectDb();
app.use(
  cors({
    origin: [
      "http://todo-app-xi-ochre-81.vercel.app",
      "http://todo-app-git-main-mubashir-73s-projects.vercel.app",
      "http://todo-20brutkry-mubashir-73s-projects.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
