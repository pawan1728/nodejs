const mongoose = require("mongoose");
const validator = require("validator")

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
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid Email Address: "+ value)
        }
      }
    },
    password: {
      type: String,
      require:true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("Enter a strong Password: "+ value)
        }
      }
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
