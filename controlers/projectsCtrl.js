const projectSchema = require("../middlewares/models/projectModel");

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await projectSchema.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ msg: "Server problem", error: error.message });
  }
};

// Add a new project
exports.addProject = async (req, res) => {
  const { title, product_id, description, images } = req.body;

  try {
    const newProject = new projectSchema({
      title,
      product_id,
      description,
      images
    });

    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ msg: "Server problem", error: error.message });
  }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await projectSchema.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "Server issue", error: error.message });
  }
};

// Update a specific project
exports.updateProject = async (req, res) => {
  const { title, product_id, description, images } = req.body;
  try {
    const updatedProject = await projectSchema.findByIdAndUpdate(
      req.params.id,
      { title, product_id, description, images },
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.json({ msg: "Project updated", project: updatedProject });
  } catch (error) {
    res.status(500).json({ msg: "Server issue", error: error.message });
  }
};

// Delete a specific project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await projectSchema.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }
    res.json({ msg: "Project deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server issue", error: error.message });
  }
};