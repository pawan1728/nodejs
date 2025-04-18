const express = require("express");
const { adminAuth, userAuth } = require("./moddleware/auth");
const { connectDB } = require("../src/config/database");
const { User } = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);

  try {
    let msg = await newUser.save();
    res.send(`User ${msg.firstName} added successfully`);
  } catch (error) {
    console.log(error, error.message);
    res.status(400).send(`error is ${error._message} `);
  }
});

app.post("/user", async (req, res) => {
  let newData = await User.create(req.body);
  newData.save();
  res.send("user added successfully");
});
app.patch("/user", async (req, res) => {
  let data = req.body;
  console.log("🚀 ~ app.patch ~ data:", data)
  try {
    let user = await User.findByIdAndUpdate({_id :data._id}, data, {
      runValidators: true,
    });

    res.send("UPDATE SUCESSFULLY");
  } catch (error) {
    res.status(400).send("Something went wrong" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  let newData = await User.findOneAndDelete({ _id: req.body });
  res.send("user deleted successfully");
});

app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  const user = await User.find({ emailId: userEmail });
  res.send(`user  get successfully ${user}`);
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(7777);
  })
  .catch((err) => console.log("error occure", err.message));
