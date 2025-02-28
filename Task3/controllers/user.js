
const User = require("../models/user");

async function handleUserSignup(req,res) 
{

    const newUser=new User({
        fullName : req.body.fullName,
        email : req.body.email,
        password : req.body.password
    })
    await newUser.save();
    return res.redirect("/");
    
}

async function handleUserLogin(req,res)
{
    const { email, password } = req.body;
    try{
        const token=await User.matchpasswordAndGenerateToken(email,password)
        return res.cookie('token' ,token).redirect('/')
    }
    catch(error){
        return res.render('signin',{error: "Incorrect Email or Password" })
    }
}
async function handleUserLogout(req,res)
{
    res.clearCookie("token").redirect("/");
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
  };