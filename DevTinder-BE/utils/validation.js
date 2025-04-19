const validator = require('validator')

const validateSignUpData = (req)=>{
    let {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong Password")
    }
}
module.exports = {
    validateSignUpData
}