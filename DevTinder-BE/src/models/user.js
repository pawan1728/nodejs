const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength:3,
      maxLength:50
    },
    lastName: {
      type: String,
      maxLength:50
    },
    emailId: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require:true
    },
    age: {
      type: Number,
      min:18
    },
    gender: {
      type: String,
      validate(value){
        if(!["male","female","other"].includes(value)){
          throw new Error("Gender is not valid")
        }
      }
    },
    skills:{
      type:[String],
      default: ["Javascript"]
    }
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = { User };
