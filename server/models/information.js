const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    primaryImage: {
      type: String,
      required: true,
    },
    secondaryImage: {
      type: String,
      required: true,
    },
    totalExperience: {
      type: Number,
      required: true,
    },
    totalProjects: {
      type: Number,
      required: true,
    },
    totalClients: {
      type: Number,
      required: true,
    },
    languages: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Information = mongoose.model("Information", informationSchema);

module.exports = Information;
