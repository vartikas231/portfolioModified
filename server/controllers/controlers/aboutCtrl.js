const aboutSchema = require("../models/aboutModel");

// ...........get about user.............
exports.getAbout = async (req, res) => {
  const about = await aboutSchema.find();
  res.json(about);
};

// ...........add about user.............
exports.addAbout = async (req, res) => {
  const { about } = req.body;

  // first way
  try {
    const newAbout = new aboutSchema({
      about: req.body.about,
    });

    await newAbout.save();
    res.json(newAbout);
  } catch (error) {
    res.status(500).json({ msg: `server problem` });
  }
};

// ...........get about specific user.............
exports.getAboutId = async (req, res) => {
  // one way

  try {
    const about = await aboutSchema.findById(req.params.id);
    res.json(about);
  } catch (error) {
    res.status(500).json({ msg: `server issue` });
  }
}

// ...........update about specific user.............
exports.updateAbout = async (req, res) => {
  // oneway
  const { about } = req.body;
  try {
    
    const newAbout = await aboutSchema.findByIdAndUpdate(req.params.id, {
      about
    });
    let results = await newAbout.save();
    await results;
    res.json({ msg: "item updated" });
  } catch (error) {
    res.status(500).json({ msg: `server issue` });
  }
};

// ...........delete specific user.............
exports.delAbout = async (req, res) => {
  const about = await aboutSchema.findByIdAndDelete(req.params.id)

  about;
  res.json({ msg: "Item deleted" });
};
