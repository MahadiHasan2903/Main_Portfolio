const Experience = require("../models/experience");

// Controller function to create an experience
const createExperience = async (req, res) => {
  try {
    const { organization, designation, years } = req.body;
    const newExperience = new Experience({ organization, designation, years });
    const savedExperience = await newExperience.save();
    res.status(201).json({
      success: true,
      message: "Experience created",
      data: savedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create experience",
      error: error.message,
    });
  }
};

// Controller function to get all experiences
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Experiences retrieved",
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get experiences",
      error: error.message,
    });
  }
};

// Controller function to get a single experience by ID
const getSingleExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience retrieved",
      data: experience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get experience",
      error: error.message,
    });
  }
};

// Controller function to update an experience by ID
const updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience updated",
      data: updatedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update experience",
      error: error.message,
    });
  }
};

// Controller function to delete an experience by ID
const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({
      success: true,
      message: "Experience deleted",
      data: deletedExperience,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
      error: error.message,
    });
  }
};

module.exports = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};
