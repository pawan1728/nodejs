const express = require("express");
const { adminAuth, userAuth } = require("./moddleware/auth");
const { connectDB } = require("../src/config/database");
const { User } = require("./models/user");
const app = express();

app.get("/user", (req, res) => {
  res.send("user  get successfully");
});

app.use(express.json())

app.post("/signup", async (req, res) => {
    console.log(req.body)
//   let user = {
   
//     lastName: "Mishra",
//     age: 32,
//     emailId: "emailId",
//     password: "12345678",
//     gender: "male",
//   };
  const newUser = new User(req.body);
  
  try {
    let msg = await newUser.save();
  res.send(`User ${msg.firstName} added successfully`);
  } catch (error) {
    console.log(error,error.message)
    res.status(400).send(`error is ${error._message} `)
  }
});

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(7777);
  })
  .catch((err) => console.log("error occure"));
