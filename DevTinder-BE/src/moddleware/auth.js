const adminAuth = (req,res,next)=>{
    const token = 'xyz';
    const isUserAuthorized = token === 'xyz'
    if(!isUserAuthorized){
        res.status(401).send("unAuthorized user")
    }else{
        next()
        console.log("this is checked")
    }
}
const userAuth =  (req,res,next)=>{
    const token = 'xyz';
    const isUserAuthorized = token === 'xyz'
    if(!isUserAuthorized){
        res.status(401).send("unAuthorized user")
    }else{
        next()
        console.log("this is checked")
    }
}
module.exports = {
    adminAuth,userAuth
}