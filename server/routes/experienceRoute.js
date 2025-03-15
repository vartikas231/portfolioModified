const router = require("express").Router();
const {
  getExperiences,
  getExperienceById,
  addExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceCtrl");

// Get all experiences
router.get("/experience", getExperiences);

// Add a new experience
router.post("/experience", addExperience);

// Get a specific experience by id
router.get("/experience/:id", getExperienceById);

// Update a specific experience by id
router.put("/experience/:id", updateExperience);

// Delete a specific experience by id
router.delete("/experience/:id", deleteExperience);

module.exports = router;