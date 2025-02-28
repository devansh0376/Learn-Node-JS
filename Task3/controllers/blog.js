const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comment');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/')); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        // Replace spaces with underscores (_) in filenames
        const safeFilename = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${safeFilename}`);
    }
});


// Initialize Multer Multer middleware to handle file upload
const upload = multer({ storage }).single('coverImage');

async function handelBlog(req, res) 
{
    upload(req, res, async() => {

        if (!req.file) return res.status(400).json({ message: 'Please upload a file' });

        // Save blog details in MongoDB
        const newBlog = new Blog({
            title: req.body.title,
            body: req.body.body,
            createdBy: req.user._id, // Ensure user is authenticated
            coverImageURL: `/uploads/${req.file.filename}`,
        });

        await newBlog.save();
        return res.redirect('/');
    });
}
    
async function getBlogByID(req, res) 
{
    try 
    {
        const blog = await Blog.findById(req.params.id).populate('createdBy')
        const comments = await Comment.find({ blogId: req.params.id }).populate( "createdBy");
        //console.log(blog)
        return  res.render("blog", { user: req.user,blog:blog ,comments:comments });
    } 
    catch (err) 
    {
        res.status(500).json({ message: 'Error fetching files', error: err });
    }
}

async function handelComment(req, res) 
{
    const newComment=new Comment({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id, // Ensure user is authenticated
    })
    await newComment.save();
    console.log(newComment)

    return res.redirect(`/blog/${req.params.blogId}`)
}


module.exports ={handelBlog,getBlogByID,handelComment}