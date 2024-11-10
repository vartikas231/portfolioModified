const experienceSchema = require("../middlewares/models/experienceModel");

// Get all experiences
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await experienceSchema.find();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ msg: `Server issue: ${error.message}` });
  }
};

// Add a new experience
exports.addExperience = async (req, res) => {
  const { role, company, duration, description, skillsUsed, achievements } = req.body;

  try {
    const newExperience = new experienceSchema({
      role,
      company,
      duration,
      description,
      skillsUsed,
      achievements
    });

    await newExperience.save();
    res.json(newExperience);
  } catch (error) {
    res.status(500).json({ msg: `Server problem: ${error.message}` });
  }
};

// Get a specific experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await experienceSchema.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ msg: `Server issue: ${error.message}` });
  }
};

// Update a specific experience
exports.updateExperience = async (req, res) => {
  const { role, company, duration, description, skillsUsed, achievements } = req.body;
  try {
    const updatedExperience = await experienceSchema.findByIdAndUpdate(
      req.params.id,
      {
        role,
        company,
        duration,
        description,
        skillsUsed,
        achievements
      },
      { new: true }
    );

    if (!updatedExperience) {
      return res.status(404).json({ msg: "Experience not found" });
    }

    res.json({ msg: "Experience updated", experience: updatedExperience });
  } catch (error) {
    res.status(500).json({ msg: `Server issue: ${error.message}` });
  }
};

// Delete a specific experience
exports.deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await experienceSchema.findByIdAndDelete(req.params.id);
    
    if (!deletedExperience) {
      return res.status(404).json({ msg: "Experience not found" });
    }

    res.json({ msg: "Experience deleted", experience: deletedExperience });
  } catch (error) {
    res.status(500).json({ msg: `Server issue: ${error.message}` });
  }
};