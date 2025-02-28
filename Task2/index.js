const express = require('express');
const path=require('path')
const app = express();
const PORT = 8000;
const multer  = require('multer')
const FileUpload = require("./routes/FileUpload");
// const getAllFiles = require("./routes/FileUpload");
const staticRoute = require('./routes/staticRouter')
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/fileUploadDB')
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.log("MongoDB Connection Error:", err));

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use('/uploads', express.static('uploads'));

app.use("/api", FileUpload);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
