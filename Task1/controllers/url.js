const { nanoid } = require("nanoid"); // Import nanoid
const URL = require("../models/url");

async function handelDataAdmin(req,res) {
    const allurls = await URL.find({}); // ✅ Shows only logged-in user's URLs
    res.render('home', { urls: allurls });
}


async function handelData(req,res) {
    // if(!req.user)
    //   return res.redirect('login')
    const allurls = await URL.find({ createdBy: req.user._id }); // ✅ Shows only logged-in user's URLs
    res.render('home', { urls: allurls });
}


async function handelgenerateNewShortUrl(req, res) {
    if (!req.body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid();  // ✅ Corrected naming
    const originalUrl = req.body.url;  

    console.log("Generated shortId:", shortId);

    await URL.create({
        shortId: shortId,  
        redirectURL: originalUrl,
        visitHistory: [],
        createdBy: req.user._id // ✅ Corrected
    });
    return res.redirect('/')
    //return  res.render('home', { id: shortId, originalUrl: originalUrl });  // ✅ Now it works!
}


//we made short id for url now if we enter this short id to url we shoud redirect to its original url and also we need to update our visitHistory array
async function handleRedirect(req, res) {
    const shortId = req.params.shortId; // Extract short ID


    const entry = await URL.findOneAndUpdate(
        { shortId: shortId }, // ✅ Ensure field name matches database
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true } // ✅ Return the updated document
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL); // ✅ Redirect to original URL
}

//to get total click and historyt
async function handleGetAnalytics(req,res) 
{
    const shortId=req.params.shortId
    const result= await URL.findOne({shortId})
    return res.json({
        totalclicks : result.visitHistory.length,
        analytics : result.visitHistory
    })
}


module.exports = { handelgenerateNewShortUrl ,handleRedirect,handleGetAnalytics ,handelData,handelDataAdmin};
