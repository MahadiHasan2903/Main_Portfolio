const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: { type: String },
    github: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
