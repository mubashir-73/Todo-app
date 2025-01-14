const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      require: [true, "Please add the task"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Task", taskSchema);
