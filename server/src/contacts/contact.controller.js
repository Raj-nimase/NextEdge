import { Membership, Volunteer } from "./contact.model.js";

// CREATE MEMBERSHIP APPLICATION
export const createMembership = async (req, res) => {
  try {
    const { name, email, year, interests } = req.body;

    if (!name || !email || !year) {
      return res.status(400).json({
        success: false,
        message: "Name, email and year are required",
      });
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one interest",
      });
    }

    const membership = await Membership.create(req.body);
    res.status(201).json({
      success: true,
      message: "Membership application submitted successfully",
      membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE VOLUNTEER APPLICATION
export const createVolunteer = async (req, res) => {
  try {
    const { name, email, year, interestArea } = req.body;

    if (!name || !email || !year || !interestArea) {
      return res.status(400).json({
        success: false,
        message: "Name, email, year and interest area are required",
      });
    }

    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({
      success: true,
      message: "Volunteer application submitted successfully",
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MEMBERSHIP APPLICATIONS (Admin only)
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      count: memberships.length,
      memberships 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET ALL VOLUNTEER APPLICATIONS (Admin only)
export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      count: volunteers.length,
      volunteers 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE MEMBERSHIP APPLICATION (Admin only)
export const deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ 
        success: false,
        message: "Membership application not found" 
      });
    }
    await membership.deleteOne();
    res.json({ 
      success: true, 
      message: "Membership application deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE VOLUNTEER APPLICATION (Admin only)
export const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ 
        success: false,
        message: "Volunteer application not found" 
      });
    }
    await volunteer.deleteOne();
    res.json({ 
      success: true, 
      message: "Volunteer application deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
