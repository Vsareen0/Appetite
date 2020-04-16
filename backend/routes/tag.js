const express = require('express');
const router = express.Router();
const { requireSignIn, adminMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/tag');

// Validators
const { runValidation } = require('../validators/index');
const { tagValidator } = require('../validators/tag');

router.post("/tag", tagValidator, runValidation, requireSignIn, adminMiddleware, create ); 
router.get("/tags", list ); 
router.get("/tag/:slug", read ); 
router.delete("/tag/:slug", requireSignIn, adminMiddleware, remove ); 

module.exports = router;