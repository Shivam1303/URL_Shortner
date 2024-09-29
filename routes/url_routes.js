const express = require("express");
const router = express.Router();
const urlController = require("../controller/url_shortner");
// router.get("/", urlController.url_shortener);
router.get("/", urlController.getUrls);
router.post("/shorten", urlController.url_shortener);
router.get("/:shortUrl", urlController.redirect_url);
module.exports = router;
