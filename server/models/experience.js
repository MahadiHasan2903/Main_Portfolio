const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    organization: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    years: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
