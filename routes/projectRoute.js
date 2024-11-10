  const router = require("express").Router();


const projectSchema = require("../middlewares/models/projectModel");

// .......................project..........................

// get project
router.get('/project', async (req, res) => {
  try {
    const project = await projectSchema.find(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: err });
  }
});



// add /post about project
router.post('/project', async (req, res) => {
  try {
    const { title, product_id, description, images } = req.body;
    const project = new projectSchema({
      title,
      product_id,
      description,
      images
    })

    await project.save();
    res.json({ msg: "Product added" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
})




// get specific project by id
router.get('/project/:id', async (req, res) => {
  try {
    let project = await projectSchema.findById(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});




// update specific project by id
router.put('/project/update/:id', async (req, res) => {
  try {
    const { title, product_id, description, images } = req.body;
    const project = await projectSchema.findByIdAndUpdate(req.params.id, {
      title,
      product_id,
      description,
      images,
    });
    await project.save();
    res.json({ msg: "Item updated" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});




// delete specific project by id
router.delete('/project/:id', async (req, res) => {
     try {
       let project = await projectSchema.findByIdAndDelete(req.params.id);

       await project;
       res.json({ msg: "project deleted" });

     } catch (error) {
       res.status(500).json({ msg: error });
     }
})
module.exports = router;
