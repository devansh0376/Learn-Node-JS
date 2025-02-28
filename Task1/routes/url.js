const express = require("express");
const router = express.Router();
const { handelgenerateNewShortUrl,handleRedirect,handleGetAnalytics } = require("../controllers/url");  // ✅ Import correctly

router.post("/", handelgenerateNewShortUrl); // ✅ Define route
router.get("/:shortId", handleRedirect); // ✅ This should match `req.params.shortId`
router.get("/analytics/:shortId",handleGetAnalytics)

module.exports = router;  // ✅ Export the router
 