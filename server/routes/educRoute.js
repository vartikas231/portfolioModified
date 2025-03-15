// const { appendFile } = require('fs');

const router = require("express").Router();
 require("../controllers/educationCtrl");


const {
  getEducation,
  getEducationId,
  addEducation,
  updateEducation,
  delEducation,
} = require("../controllers/educationCtrl");


const educationSchema = require("../middlewares/models/educationModel");
// .......................education..........................

// get education
router.get("/education", getEducation);

// add /post about education
router.post("/education", addEducation);

// get specific education by id
router.get("/education/:id", getEducationId);

// update specific education by id
router.put("/education/update/:id", updateEducation);

// delete specific education by id
router.delete("/education/:id", delEducation);

module.exports = router;
