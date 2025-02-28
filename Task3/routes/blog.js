const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const router = Router();
const {handelBlog,getBlogByID,handelComment}= require('../controllers/blog')



router.get('/add-new', (req, res) => {
    return res.render('addBlog', { user: req.user });
});

// Router for handling file upload
router.post('/',handelBlog);

// Router for handling Get files
router.get('/:id',getBlogByID)

//Router to create new comment 
router.post('/comment/:blogId',handelComment )

module.exports = router;
