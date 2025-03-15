require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// const PORT = process.env.PORT || 2000;
const PORT = 2000;

const fileUpload = require("express-fileupload");
const path =require('path')



const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

// connect to mongodb
const URI = process.env.MONGO_URL;
mongoose.set("strictQuery", true);
mongoose
  .connect(
    URI,
    {}
  )
  .then(() => {
    console.log("Successfully connected ");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });

// routes
app.use('/contact', require("./routes/contactRoute"));
app.use('/user', require("./routes/userRoute"));
app.use('/', require("./routes/aboutRoute"));
app.use('/', require("./routes/educRoute"));
app.use('/', require("./routes/experienceRoute"));
app.use('/', require("./routes/projectRoute"));
app.use('/', require("./routes/upload"));



// static assets

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}




app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
