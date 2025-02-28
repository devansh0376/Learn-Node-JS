const { Router } = require("express");
const router = Router();

const User = require("../models/user");
const {handleUserSignup,handleUserLogin,handleUserLogout} =require('../controllers/user')

router.get("/signin", (req, res) => {
     res.render("signin");
});

router.get("/signup", (req, res) => {
     res.render("signup");
});



router.post("/signin",handleUserLogin);
  
router.post("/signup", handleUserSignup);

router.get("/logout", handleUserLogout);
  

module.exports = router;