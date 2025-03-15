const router = require("express").Router();
const projectSchema = require("../middlewares/models/projectModel");

// .......................project..........................

// Get all projects
router.get('/project', async (req, res) => {
  try {
    const projects = await projectSchema.find(); // Fetch all projects
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Add /post about project
router.post('/project', async (req, res) => {
  try {
    const { title, product_id, description, hostedlink, images } = req.body; // Added hostedlink
    const project = new projectSchema({
      title,
      product_id,
      description,
      hostedlink, // Added hostedlink
      images
    });

    await project.save();
    res.json({ success: true, msg: "Product added" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Get specific project by id
router.get('/project/:id', async (req, res) => {
  try {
    const project = await projectSchema.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, msg: "Project not found" });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Update specific project by id
router.put('/project/update/:id', async (req, res) => {
  try {
    const { title, product_id, description, hostedlink, images } = req.body; // Added hostedlink
    const project = await projectSchema.findByIdAndUpdate(req.params.id, {
      title,
      product_id,
      description,
      hostedlink, // Added hostedlink
      images,
    }, { new: true }); // Return the updated document

    if (!project) {
      return res.status(404).json({ success: false, msg: "Project not found" });
    }

    res.json({ success: true, msg: "Item updated", data: project });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Delete specific project by id
router.delete('/project/:id', async (req, res) => {
  try {
    const project = await projectSchema.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, msg: "Project not found" });
    }

    res.json({ success: true, msg: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

module.exports = router;