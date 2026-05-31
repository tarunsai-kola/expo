const express = require("express");
const router = express.Router();
const CareerAssessment = require("../models/CareerAssessment");
const { sendCareerAssessmentWelcomeEmail } = require("../utils/emailService");

// Submit Assessment
router.post("/careerassessment", async (req, res) => {
  try {
    const assessment = new CareerAssessment(req.body);
    const savedAssessment = await assessment.save();

    // Send the welcome email asynchronously
    sendCareerAssessmentWelcomeEmail(savedAssessment.email, savedAssessment.fullName).catch(err => {
      console.error("Failed to send career assessment email:", err);
    });

    res.status(201).json({ message: "Assessment submitted successfully", data: savedAssessment });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    res.status(500).json({ error: "Failed to submit assessment" });
  }
});

// Fetch all assessments (Admin)
router.get("/careerassessment", async (req, res) => {
  try {
    const assessments = await CareerAssessment.find().sort({ createdAt: -1 });
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({ error: "Failed to fetch assessments" });
  }
});

module.exports = router;
