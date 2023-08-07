const express = require("express");
const Router = require("./Routes/main");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", Router);

const PORT = process.env.PORT || 5000;

const StartServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://veeruraghuwanshi:1234@cluster10.bknygtd.mongodb.net/img",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Server is Connected to Database and running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

StartServer();
