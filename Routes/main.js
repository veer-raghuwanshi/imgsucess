const express = require("express");
const Router = express.Router();

// database
const User = require("../models/user");

// dotenv
require("dotenv").config();

// multer and path
const multer = require("multer");
const path = require("path");

// cloud
const cloudinary = require("cloudinary");

// cloud config
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

cloudinary.config({ 
  cloud_name: 'dswgbx3nn', 
  api_key: '624238566144382', 
  api_secret: 'M8Qum0g95qAHT-6p_8D82rYtcYI' 
});

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"), // cb -> callback
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// handler
const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image");

Router.route("/user").post(async (req, res) => {
  handleMultipartData(req, res, async (err) => {
    if (err) {
      res.json({ msgs: err.message });
    }

    const filePath = req.file.path;

    if (!filePath) {
      return;
    }

    let cloud_FileLink;

    cloudinary.v2.uploader.upload(filePath, async (error, result) => {
      if (result.secure_url) {
        const { name, email,password } = req.body;

        let document;
        try {
          document = await User.create({
            name,
            email,
            password,
            image: result.secure_url,
          });
        } catch (error) {
          res.send(error.message);
        }

        res.status(201).send(document);
      } else {
        res.send(error.message);
      }
    });
  });
});
Router.route("/user").get(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Router.route("/user").get(async (req, res) => {
//   res.send("--- Get All User ---");
// });

module.exports = Router;