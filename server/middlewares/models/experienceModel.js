const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skillsUsed: {
    type: [String],
    default: [],
  },
  achievements: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("experience", experienceSchema);