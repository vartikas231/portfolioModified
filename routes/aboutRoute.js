// const { appendFile } = require('fs');

const router=require('express').Router();

const {
  getAbout,
  getAboutId,
  addAbout,
  updateAbout,
  delAbout
} = require("../controlers/aboutCtrl");

// const aboutSchema=require('../middlewares/models/aboutModel');
// .......................about..........................

// get about 
router.get('/about',getAbout);

// add /post about user
router.post('/about',addAbout);

// get specific user by id
router.get('/about/:id',getAboutId);

// update specific user by id
router.put('/about/update/:id',updateAbout);


// delete specific user by id
router.delete('/about/:id',delAbout);


module.exports=router;

