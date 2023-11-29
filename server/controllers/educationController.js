const Education = require("../models/education");

// Get all educations

const getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Educations fetched successfully",
      data: educations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch educations",
      error: err.message,
    });
  }
};

// Get an education by ID
const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }
    res.json({
      success: true,
      message: "Education fetched successfully",
      data: education,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch education",
      error: err.message,
    });
  }
};

// Create an education
const createEducation = async (req, res) => {
  const education = new Education({
    institution: req.body.institution,
    degree: req.body.degree,
    session: req.body.session,
  });

  try {
    const newEducation = await education.save();
    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: newEducation,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to create education",
      error: err.message,
    });
  }
};

// Update an education by ID
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }

    education.institution = req.body.institution;
    education.degree = req.body.degree;
    education.session = req.body.session;

    const updatedEducation = await education.save();
    res.json({
      success: true,
      message: "Education updated successfully",
      data: updatedEducation,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to update education",
      error: err.message,
    });
  }
};

// Delete an education by ID
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res
        .status(404)
        .json({ success: false, message: "Education not found" });
    }

    await education.deleteOne();
    res.json({ success: true, message: "Education deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete education",
      error: err.message,
    });
  }
};

module.exports = {
  getAllEducations,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
};
