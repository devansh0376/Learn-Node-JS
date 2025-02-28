const multer = require('multer');
const path = require('path');
const File = require('../models/file');

const storage = multer.diskStorage({
    destination: './uploads', // Folder where files will be saved
    filename: (req, file, cb) => {
        // Replace spaces with underscores (_) in filenames
         const safeFilename = file.originalname.replace(/\s+/g, '_');
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
         cb(null, `${Date.now()}-${safeFilename}`);
    }
});

// Initialize Multer
const upload = multer({ storage }).single('profileImage');

async function handelFile(req, res) 
{
    upload(req, res,async() => {

        if (!req.file) return res.status(400).json({ message: 'Please upload a file' });
        // Save file details in MongoDB
        const newFile = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        });
        await newFile.save();

        return res.render('home')

        // res.json({
        //     message: 'File uploaded successfully!',
        //     file: newFile
        // });

        // Redirect to the /api/files page after uploading
        //res.redirect('/api/files');


        // Fetch all files after saving the new file
        //const files = await File.find();
        // Render the 'files' view and pass the list of files to the view
        //res.render('files', { files }); 


        // Call the getAllFiles function to render the files page
        //getAllFiles(req, res);
    });
}
    
async function getAllFiles(req, res) {
    try 
    {
        const files = await File.find(); // Fetch all files from MongoDB
        // res.json(files);
        return res.render('files', { files }); // Render files.ejs and pass the files data
    } 
    catch (err) 
    {
        res.status(500).json({ message: 'Error fetching files', error: err });
    }
}



module.exports ={handelFile,getAllFiles}