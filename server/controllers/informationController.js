const Information = require("../models/information");

const createInformation = async (req, res) => {
  try {
    const existingInfo = await Information.findOne();
    if (existingInfo) {
      return res.status(400).json({ message: "Information already exists" });
    }

    const newInformation = new Information(req.body);

    await newInformation.save();
    res.status(201).json({
      message: "Information created successfully",
      information: newInformation,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating information", error: err.message });
  }
};

const updateInformation = async (req, res) => {
  try {
    let existingInfo = await Information.findOne();
    console.log(existingInfo);
    if (!existingInfo) {
      return res.status(404).json({ message: "No information found" });
    }

    existingInfo = Object.assign(existingInfo, req.body);

    await existingInfo.save();
    res.json({
      success: true,
      message: "Information updated successfully",
      information: existingInfo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating information",
      error: err.message,
    });
  }
};

const deleteInformation = async (req, res) => {
  try {
    await Information.deleteMany();
    res.json({
      success: true,
      message: "Information deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting information",
      error: err.message,
    });
  }
};

const getInformation = async (req, res) => {
  try {
    const existingInfo = await Information.findOne();
    if (!existingInfo) {
      return res.status(404).json({
        success: false,
        message: "No information found",
      });
    }

    res.json({
      success: true,
      message: "Get information successfully",
      information: existingInfo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching information",
      error: err.message,
    });
  }
};

module.exports = {
  createInformation,
  updateInformation,
  deleteInformation,
  getInformation,
};
