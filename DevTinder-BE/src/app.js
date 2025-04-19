const express = require("express");
const { userAuth } = require("./moddleware/auth");
const { connectDB } = require("../src/config/database");
const { User } = require("./models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, gender, age, skills } =
      req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: encryptedPassword,
      skills,
      gender,
      age,
    });
    let msg = await newUser.save();
    res.send(`User ${msg.firstName} added successfully`);
  } catch (error) {
    res.status(400).send(`ERROR : ${error.message}`);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      //creating token using jwt
      const token = jwt.sign({ _id: user._id }, "Dev@Tinder2025");

      //add token to cookies and send back to user
      res.cookie("token", token);

      res.send("Login Succussfully!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).send(`ERROR : ${error.message}`);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("user details" + user);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
app.post("/user", async (req, res) => {
  let newData = await User.create(req.body);
  newData.save();
  res.send("user added successfully");
});
app.patch("/user", async (req, res) => {
  let data = req.body;
  try {
    const ALLOW_UPDATES = ["password", "age", "skills", "gender", "_id"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOW_UPDATES.includes(k)
    );
    console.log("🚀 ~ isAllowedField ~ isAllowedField:", isUpdateAllowed, data);
    if (!isUpdateAllowed) {
      throw new Error("Field not allowed");
    }
    await User.findByIdAndUpdate({ _id: data._id }, data, {
      runValidators: true,
    });

    res.send("UPDATE SUCESSFULLY");
  } catch (error) {
    res.status(400).send("Something went wrong " + error.message);
  }
});

app.delete("/user", async (req, res) => {
  let newData = await User.findOneAndDelete({ _id: req.body });
  res.send("user deleted successfully");
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR :" + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(1234);
  })
  .catch((err) => console.log("error occure", err.message));
