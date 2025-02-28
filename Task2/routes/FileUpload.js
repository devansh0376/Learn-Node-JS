const express=require('express')
const router=express.Router()
const {handelFile,getAllFiles}=require('../constrollers/file')

router.post('/upload',handelFile)
router.get('/files', getAllFiles); // New route to fetch all files

module.exports=router