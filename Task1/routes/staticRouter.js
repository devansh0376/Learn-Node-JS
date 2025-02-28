const express = require("express");
const router = express.Router();
const {handelData,handelDataAdmin} =require("../controllers/url");
const {restrictTo}=require('../middlewares/auth');
const { route } = require("./url");

router.get('/signup',(req,res)=>{
    return res.render('signup')
})

router.get('/login',(req,res)=>{
    return res.render('login')
})

router.get('/admin/urls',restrictTo(['ADMIN']),handelDataAdmin)

router.get('/',restrictTo(['NORMAL','ADMIN']),handelData)

module.exports = router;  // ✅ Export the router 