const express=require('express')
const { Router } = require("express");
const router = Router();
const Blog=require('../models/blog')

router.get("/", async (req, res) => {

    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
    res.render("home", {
      user: req.user,
      blogs:allBlogs
    });
});

 module.exports=router