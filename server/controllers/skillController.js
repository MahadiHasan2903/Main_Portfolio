const Skill = require("../models/skill");

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Skills fetched successfully",
      data: skills,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: err.message,
    });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    res.json({
      success: true,
      message: "Skill fetched successfully",
      data: skill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
      error: err.message,
    });
  }
};

const createSkill = async (req, res) => {
  const { name, imgPath } = req.body;
  const skill = new Skill({ name, imgPath });

  try {
    const newSkill = await skill.save();
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: newSkill,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Failed to create skill",
      error: err.message,
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    res.json({
      success: true,
      message: "Skill deleted successfully",
      data: deletedSkill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: err.message,
    });
  }
};

const updateSkill = async (req, res) => {
  const { name, imgPath } = req.body;
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name, imgPath },
      { new: true }
    );
    if (!updatedSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    res.json({
      success: true,
      message: "Skill updated successfully",
      data: updatedSkill,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: err.message,
    });
  }
};

module.exports = {
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillById,
  getAllSkills,
};
